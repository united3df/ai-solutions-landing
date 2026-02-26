import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService, PostRow, TopicRow } from '../database/database.service';
import { BlogService } from '../blog/blog.service';
import { PostListItem, PostFull } from '../common/types/post.types';

@Injectable()
export class AdminService {
  constructor(
    private readonly database: DatabaseService,
    private readonly blogService: BlogService,
  ) {}

  private toListItem(row: PostRow): PostListItem {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      createdAt: row.created_at.toISOString(),
    };
  }

  private toFull(row: PostRow): PostFull {
    return {
      ...this.toListItem(row),
      content: row.content,
      metaTitle: row.meta_title,
      metaDesc: row.meta_desc,
      keyword: row.keyword,
    };
  }

  async listPosts(): Promise<(PostListItem & { status: string; score: number | null })[]> {
    const rows = await this.database.listPosts();
    return rows.map((r) => ({
      ...this.toListItem(r),
      status: r.status,
      score: r.score,
    }));
  }

  async getPost(id: number): Promise<PostFull | null> {
    const row = await this.database.getPostById(id);
    return row ? this.toFull(row) : null;
  }

  async getPostOrThrow(id: number): Promise<PostFull> {
    const post = await this.getPost(id);
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    return post;
  }

  async updatePost(
    id: number,
    params: Partial<{
      title: string;
      content: string;
      excerpt: string;
      status: string;
      meta_title: string;
      meta_desc: string;
      metaTitle: string;
      metaDesc: string;
    }>,
  ): Promise<void> {
    const existing = await this.database.getPostById(id);
    if (!existing) throw new NotFoundException(`Post ${id} not found`);
    const dbParams: Parameters<DatabaseService['updatePost']>[1] = {};
    if (params.title !== undefined) dbParams.title = params.title;
    if (params.content !== undefined) dbParams.content = params.content;
    if (params.excerpt !== undefined) dbParams.excerpt = params.excerpt;
    if (params.status !== undefined) dbParams.status = params.status;
    if (params.meta_title !== undefined) dbParams.meta_title = params.meta_title;
    if (params.meta_desc !== undefined) dbParams.meta_desc = params.meta_desc;
    if (params.metaTitle !== undefined) dbParams.meta_title = params.metaTitle;
    if (params.metaDesc !== undefined) dbParams.meta_desc = params.metaDesc;
    await this.database.updatePost(id, dbParams);
  }

  async deletePost(id: number): Promise<void> {
    const existing = await this.database.getPostById(id);
    if (!existing) throw new NotFoundException(`Post ${id} not found`);
    await this.database.deletePost(id);
  }

  async publishPost(id: number): Promise<void> {
    await this.updatePost(id, { status: 'published' });
  }

  async draftPost(id: number): Promise<void> {
    await this.updatePost(id, { status: 'draft' });
  }

  async listTopics(): Promise<TopicRow[]> {
    return this.database.listTopics();
  }

  async addTopic(params: {
    title: string;
    keyword?: string;
    priority?: number;
  }): Promise<number> {
    return this.database.insertTopic({
      title: params.title,
      keyword: params.keyword ?? null,
      priority: params.priority ?? 5,
    });
  }

  async deleteTopic(id: number): Promise<void> {
    await this.database.deleteTopic(id);
  }

  async generatePost(): Promise<{ slug: string; id: number; score: number | null }> {
    return this.blogService.generatePost();
  }

  async getStats() {
    return this.database.getStats();
  }
}
