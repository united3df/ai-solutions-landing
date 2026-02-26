import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SkillsService {
  private readonly cache = new Map<string, string>();
  private readonly skillsDir: string;

  constructor() {
    this.skillsDir = path.join(process.cwd(), 'skills');
  }

  load(name: string): string {
    const cached = this.cache.get(name);
    if (cached) return cached;

    const filePath = path.join(this.skillsDir, `${name}.md`);
    const content = fs.readFileSync(filePath, 'utf-8');
    this.cache.set(name, content);
    return content;
  }

  getContentSystemPrompt(): string {
    return [this.load('content-patterns'), this.load('ai-writing-detection')].join('\n\n---\n\n');
  }

  getSeoSystemPrompt(): string {
    return [this.load('ai-seo'), this.load('ai-writing-detection')].join('\n\n---\n\n');
  }

  getTopicSystemPrompt(): string {
    return this.load('ai-seo');
  }
}
