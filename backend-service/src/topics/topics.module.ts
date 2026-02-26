import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';
import { TopicsService } from './topics.service';

@Module({
  imports: [GeminiModule],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
