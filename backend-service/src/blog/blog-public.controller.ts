import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DatabaseService, PostRow } from '../database/database.service';

function toListItem(row: PostRow) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    createdAt: row.created_at.toISOString(),
  };
}

function toFull(row: PostRow) {
  return {
    ...toListItem(row),
    content: row.content,
    metaTitle: row.meta_title,
    metaDesc: row.meta_desc,
    keyword: row.keyword,
  };
}

@ApiTags('blog')
@Controller('blog')
export class BlogPublicController {
  constructor(private readonly database: DatabaseService) {}

  @Get('posts')
  @ApiOperation({ summary: 'List published posts' })
  async listPublished() {
    const rows = await this.database.listPublishedPosts();
    return rows.map(toListItem);
  }

  @Get('posts/:slug')
  @ApiOperation({ summary: 'Get published post by slug' })
  async getBySlug(@Param('slug') slug: string) {
    const row = await this.database.getPublishedPostBySlug(slug);
    if (!row) throw new NotFoundException(`Post not found`);
    return toFull(row);
  }
}
