import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { GeminiService } from '../gemini/gemini.service';
import { TopicsService } from '../topics/topics.service';
import { TopicRow } from '../database/database.service';
import { generateSlug } from '../common/utils/slug.util';
import {
  buildTopicFilterPrompt,
  buildPostGenerationPrompt,
  buildPostReviewPrompt,
} from './prompts';

export interface GeneratePostResult {
  slug: string;
  id: number;
  score: number | null;
}

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly gemini: GeminiService,
    private readonly topics: TopicsService,
    private readonly config: ConfigService,
  ) {}

  async generatePost(): Promise<GeneratePostResult> {
    const topicThreshold = this.config.get<number>('TOPIC_FILTER_THRESHOLD') ?? 6;
    const postThreshold = this.config.get<number>('POST_REVIEW_THRESHOLD') ?? 7;
    const maxTopicRetries = this.config.get<number>('MAX_TOPIC_RETRIES') ?? 3;
    const maxPostRetries = this.config.get<number>('MAX_POST_RETRIES') ?? 2;
    const siteTopic = this.config.get<string>('SITE_TOPIC') ?? 'General blog';
    const siteLanguage = this.config.get<string>('SITE_LANGUAGE') ?? 'ru';

    let topic: TopicRow | null = null;
    let topicAttempts = 0;

    while (topicAttempts < maxTopicRetries) {
      topicAttempts++;
      topic = await this.topics.getNextTopic();

      try {
        const filterPrompt = buildTopicFilterPrompt(topic.title, siteTopic);
        const filterResult = await this.gemini.callWithRetry(
          () => this.gemini.filterTopic(filterPrompt),
          'topic filter',
        );

        this.logger.log(
          `Topic filter: score=${filterResult.score} approved=${filterResult.approved} - ${topic.title}`,
        );

        if (
          filterResult.approved &&
          filterResult.score >= topicThreshold
        ) {
          const keyword = filterResult.keyword ?? topic.keyword ?? topic.title;

          let content = '';
          let metaTitle = '';
          let metaDesc = '';
          let excerpt = '';
          let title = '';
          let finalScore: number | null = null;
          let status = 'published';

          const genPrompt = buildPostGenerationPrompt(
            topic.title,
            keyword,
            siteLanguage,
            siteTopic,
          );

          for (let postAttempt = 0; postAttempt <= maxPostRetries; postAttempt++) {
            try {
              const genResult = await this.gemini.callWithRetry(
                () => this.gemini.generatePost(genPrompt),
                'post generation',
              );

              title = genResult.title;
              metaTitle = genResult.meta_title;
              metaDesc = genResult.meta_desc;
              excerpt = genResult.excerpt;
              content = genResult.content;

              const reviewPrompt = buildPostReviewPrompt(keyword, content);
              const reviewResult = await this.gemini.callWithRetry(
                () => this.gemini.reviewPost(reviewPrompt),
                'post review',
              );

              finalScore = reviewResult.score;
              this.logger.log(
                `Post review: score=${reviewResult.score} approved=${reviewResult.approved}`,
              );

              if (reviewResult.approved && reviewResult.score >= postThreshold) {
                break;
              }

              if (reviewResult.fixed_content) {
                content = reviewResult.fixed_content;
                if (reviewResult.score >= postThreshold) {
                  break;
                }
              }

              if (postAttempt === maxPostRetries && reviewResult.score < postThreshold) {
                status = 'draft';
                this.logger.warn(
                  `Post saved as draft (score ${reviewResult.score} < ${postThreshold})`,
                );
              }
            } catch (err) {
              this.logger.error('Post generation/review failed', err);
              if (postAttempt === maxPostRetries) throw err;
            }
          }

          const slug = await this.ensureUniqueSlug(title);
          const id = await this.database.insertPost({
            title,
            slug,
            content,
            excerpt,
            status,
            metaTitle,
            metaDesc,
            keyword,
            score: finalScore,
          });

          await this.topics.markUsed(topic.id);

          return { slug, id, score: finalScore };
        } else {
          await this.topics.markUsed(topic.id);
          this.logger.log(`Topic rejected, trying next`);
        }
      } catch (err) {
        this.logger.error(`Topic processing failed: ${topic.title}`, err);
        throw err;
      }
    }

    throw new Error(
      `Could not find approved topic after ${maxTopicRetries} attempts`,
    );
  }

  private async ensureUniqueSlug(baseTitle: string): Promise<string> {
    let slug = generateSlug(baseTitle);
    let suffix = 0;
    while (await this.database.slugExists(slug)) {
      suffix++;
      slug = `${generateSlug(baseTitle)}-${suffix}`;
    }
    return slug;
  }
}
