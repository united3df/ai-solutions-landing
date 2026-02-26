import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogPublicController } from './blog-public.controller';
import { BlogService } from './blog.service';
import { GeminiModule } from '../gemini/gemini.module';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [GeminiModule, TopicsModule],
  controllers: [BlogController, BlogPublicController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
