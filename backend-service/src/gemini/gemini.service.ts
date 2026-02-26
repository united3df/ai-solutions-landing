import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SkillsService } from '../skills/skills.service';

export interface TopicFilterResult {
  score: number;
  keyword: string;
  intent: string;
  reason: string;
  approved: boolean;
}

export interface PostGenerationResult {
  title: string;
  meta_title: string;
  meta_desc: string;
  excerpt: string;
  content: string;
}

export interface PostReviewResult {
  score: number;
  approved: boolean;
  issues: string[];
  fixed_content: string | null;
}

export interface TopicGenerationResult {
  title: string;
  keyword?: string;
  intent?: string;
}

const MAX_JSON_RETRIES = 2;
const RATE_LIMIT_RETRIES = 5;

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly genAI: GoogleGenerativeAI;

  constructor(
    private readonly config: ConfigService,
    private readonly skillsService: SkillsService,
  ) {
    const apiKey = this.config.getOrThrow<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private getModel(systemInstruction: string) {
    return this.genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      systemInstruction,
      generationConfig: { responseMimeType: 'application/json' },
    });
  }

  private parseJson<T>(text: string): T {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object in response');
    return JSON.parse(jsonMatch[0]) as T;
  }

  async filterTopic(prompt: string): Promise<TopicFilterResult> {
    const model = this.getModel(this.skillsService.getTopicSystemPrompt());
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return this.parseJson<TopicFilterResult>(text);
  }

  async generatePost(prompt: string): Promise<PostGenerationResult> {
    const model = this.getModel(this.skillsService.getContentSystemPrompt());
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return this.parseJson<PostGenerationResult>(text);
  }

  async reviewPost(prompt: string): Promise<PostReviewResult> {
    const model = this.getModel(this.skillsService.getSeoSystemPrompt());
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return this.parseJson<PostReviewResult>(text);
  }

  async generateTopic(prompt: string): Promise<TopicGenerationResult> {
    const model = this.getModel(this.skillsService.getTopicSystemPrompt());
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_JSON_RETRIES; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return this.parseJson<TopicGenerationResult>(text);
      } catch (error) {
        lastError = error as Error;
        const msg = (error as Error).message?.toLowerCase() ?? '';
        if (msg.includes('quota') || msg.includes('resource exhausted')) {
          throw error;
        }
        if (attempt < MAX_JSON_RETRIES) {
          this.logger.warn(
            `Invalid JSON from Gemini (topic generation), retrying (${attempt + 1}/${MAX_JSON_RETRIES})`,
          );
        }
      }
    }
    throw lastError ?? new Error('Failed to get valid response from Gemini');
  }

  async callWithRetry<T>(
    fn: () => Promise<T>,
    operation: string,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < RATE_LIMIT_RETRIES; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        const msg = (error as Error).message?.toLowerCase() ?? '';
        const status = (error as { status?: number })?.status;

        if (status === 429 || msg.includes('quota') || msg.includes('too many')) {
          const retrySec = 30;
          this.logger.warn(
            `Rate limit (429). Waiting ${retrySec}s before retry (${attempt + 1}/${RATE_LIMIT_RETRIES}) for ${operation}`,
          );
          await new Promise((r) => setTimeout(r, retrySec * 1000));
          continue;
        }
        if (msg.includes('resource exhausted')) throw error;
        if (status === 404 || msg.includes('not found')) throw error;
        throw error;
      }
    }
    throw lastError ?? new Error(`Failed to complete ${operation}`);
  }
}
