import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CronAuthGuard } from '../common/guards/cron-auth.guard';
import { CronPostDocs } from '../common/docs/api-docs';

@ApiTags('cron')
@Controller('api')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('cron')
  @CronPostDocs()
  @UseGuards(CronAuthGuard)
  async trigger(): Promise<{
    success: boolean;
    slug?: string;
    score?: number;
    error?: string;
  }> {
    try {
      const post = await this.blogService.generatePost();
      return { success: true, slug: post.slug, score: post.score ?? undefined };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error: message };
    }
  }
}
