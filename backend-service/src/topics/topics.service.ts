import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService, TopicRow } from '../database/database.service';
import { GeminiService } from '../gemini/gemini.service';
import { buildTopicGenerationPrompt } from '../blog/prompts/topic-generation.prompt';

@Injectable()
export class TopicsService {
  private readonly logger = new Logger(TopicsService.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly gemini: GeminiService,
    private readonly config: ConfigService,
  ) {}

  async getNextTopic(): Promise<TopicRow> {
    let topic = await this.database.getNextTopic();

    if (!topic) {
      this.logger.log('No unused topics, generating new one via Gemini');
      topic = await this.generateAndSaveTopic();
    }

    return topic;
  }

  async markUsed(id: number): Promise<void> {
    await this.database.markTopicUsed(id);
  }

  async generateAndSaveTopic(): Promise<TopicRow> {
    const siteTopic = this.config.get<string>('SITE_TOPIC') ?? 'General blog';
    const prompt = buildTopicGenerationPrompt(siteTopic);

    const result = await this.gemini.callWithRetry(
      () => this.gemini.generateTopic(prompt),
      'topic generation',
    );

    const id = await this.database.insertTopic({
      title: result.title,
      keyword: result.keyword ?? null,
      intent: result.intent ?? null,
      priority: 5,
    });

    const topic: TopicRow = {
      id,
      title: result.title,
      keyword: result.keyword ?? null,
      intent: result.intent ?? null,
      priority: 5,
      used: false,
      created_at: new Date(),
    };
    return topic;
  }
}
