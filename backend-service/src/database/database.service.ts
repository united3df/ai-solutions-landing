import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';

export interface TopicRow {
  id: number;
  title: string;
  keyword: string | null;
  intent: string | null;
  priority: number;
  used: boolean;
  created_at: Date;
}

export interface PostRow {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  meta_title: string;
  meta_desc: string;
  keyword: string | null;
  score: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface InsertPostParams {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  metaTitle: string;
  metaDesc: string;
  keyword: string | null;
  score: number | null;
}

export interface InsertTopicParams {
  title: string;
  keyword?: string | null;
  intent?: string | null;
  priority?: number;
}

export interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  unusedTopics: number;
}

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private sql: ReturnType<typeof neon>;

  constructor(private readonly config: ConfigService) {
    const url = this.config.getOrThrow<string>('NEON_DATABASE_URL');
    this.sql = neon(url);
  }

  onModuleInit(): void {
    this.logger.log('DatabaseService initialized');
  }

  async getNextTopic(): Promise<TopicRow | null> {
    const rows = await this.sql`
      SELECT id, title, keyword, intent, priority, used, created_at
      FROM topics
      WHERE used = false
      ORDER BY priority ASC
      LIMIT 1
    `;
    return (rows[0] as TopicRow) ?? null;
  }

  async markTopicUsed(id: number): Promise<void> {
    await this.sql`UPDATE topics SET used = true WHERE id = ${id}`;
  }

  async insertTopic(params: InsertTopicParams): Promise<number> {
    const rows = await this.sql`
      INSERT INTO topics (title, keyword, intent, priority)
      VALUES (
        ${params.title},
        ${params.keyword ?? null},
        ${params.intent ?? null},
        ${params.priority ?? 5}
      )
      RETURNING id
    `;
    return (rows[0] as { id: number }).id;
  }

  async insertPost(params: InsertPostParams): Promise<number> {
    const rows = await this.sql`
      INSERT INTO posts (title, slug, content, excerpt, status, meta_title, meta_desc, keyword, score)
      VALUES (
        ${params.title},
        ${params.slug},
        ${params.content},
        ${params.excerpt},
        ${params.status},
        ${params.metaTitle},
        ${params.metaDesc},
        ${params.keyword},
        ${params.score}
      )
      RETURNING id
    `;
    return (rows[0] as { id: number }).id;
  }

  async getPostById(id: number): Promise<PostRow | null> {
    const rows = await this.sql`
      SELECT id, title, slug, content, excerpt, status, meta_title, meta_desc, keyword, score, created_at, updated_at
      FROM posts
      WHERE id = ${id}
    `;
    return (rows[0] as PostRow) ?? null;
  }

  async getPostBySlug(slug: string): Promise<PostRow | null> {
    const rows = await this.sql`
      SELECT id, title, slug, content, excerpt, status, meta_title, meta_desc, keyword, score, created_at, updated_at
      FROM posts
      WHERE slug = ${slug}
    `;
    return (rows[0] as PostRow) ?? null;
  }

  async updatePost(
    id: number,
    params: Partial<{
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      status: string;
      meta_title: string;
      meta_desc: string;
    }>,
  ): Promise<void> {
    const updates: string[] = [];
    const values: (string | number)[] = [];
    let idx = 1;

    if (params.title !== undefined) {
      updates.push(`title = $${idx++}`);
      values.push(params.title);
    }
    if (params.slug !== undefined) {
      updates.push(`slug = $${idx++}`);
      values.push(params.slug);
    }
    if (params.content !== undefined) {
      updates.push(`content = $${idx++}`);
      values.push(params.content);
    }
    if (params.excerpt !== undefined) {
      updates.push(`excerpt = $${idx++}`);
      values.push(params.excerpt);
    }
    if (params.status !== undefined) {
      updates.push(`status = $${idx++}`);
      values.push(params.status);
    }
    if (params.meta_title !== undefined) {
      updates.push(`meta_title = $${idx++}`);
      values.push(params.meta_title);
    }
    if (params.meta_desc !== undefined) {
      updates.push(`meta_desc = $${idx++}`);
      values.push(params.meta_desc);
    }

    if (updates.length === 0) return;

    updates.push('updated_at = NOW()');
    values.push(id);

    await this.sql.query(
      `UPDATE posts SET ${updates.join(', ')} WHERE id = $${idx}`,
      values,
    );
  }

  async deletePost(id: number): Promise<void> {
    await this.sql`DELETE FROM posts WHERE id = ${id}`;
  }

  async listPosts(): Promise<PostRow[]> {
    const rows = await this.sql`
      SELECT id, title, slug, content, excerpt, status, meta_title, meta_desc, keyword, score, created_at, updated_at
      FROM posts
      ORDER BY created_at DESC
    `;
    return rows as PostRow[];
  }

  async listPublishedPosts(): Promise<PostRow[]> {
    const rows = await this.sql`
      SELECT id, title, slug, content, excerpt, status, meta_title, meta_desc, keyword, score, created_at, updated_at
      FROM posts
      WHERE status = 'published'
      ORDER BY created_at DESC
    `;
    return rows as PostRow[];
  }

  async getPublishedPostBySlug(slug: string): Promise<PostRow | null> {
    const rows = await this.sql`
      SELECT id, title, slug, content, excerpt, status, meta_title, meta_desc, keyword, score, created_at, updated_at
      FROM posts
      WHERE slug = ${slug} AND status = 'published'
    `;
    return (rows[0] as PostRow) ?? null;
  }

  async listTopics(): Promise<TopicRow[]> {
    const rows = await this.sql`
      SELECT id, title, keyword, intent, priority, used, created_at
      FROM topics
      ORDER BY priority ASC, created_at ASC
    `;
    return rows as TopicRow[];
  }

  async deleteTopic(id: number): Promise<void> {
    await this.sql`DELETE FROM topics WHERE id = ${id}`;
  }

  async slugExists(slug: string): Promise<boolean> {
    const rows = await this.sql`
      SELECT 1 FROM posts WHERE slug = ${slug} LIMIT 1
    `;
    return Array.isArray(rows) && rows.length > 0;
  }

  async getStats(): Promise<Stats> {
    const [total, published, draft, unused] = await Promise.all([
      this.sql`SELECT COUNT(*)::int as c FROM posts`.then((r) => (r[0] as { c: number }).c ?? 0),
      this.sql`SELECT COUNT(*)::int as c FROM posts WHERE status = 'published'`.then((r) => (r[0] as { c: number }).c ?? 0),
      this.sql`SELECT COUNT(*)::int as c FROM posts WHERE status = 'draft'`.then((r) => (r[0] as { c: number }).c ?? 0),
      this.sql`SELECT COUNT(*)::int as c FROM topics WHERE used = false`.then((r) => (r[0] as { c: number }).c ?? 0),
    ]);
    return { totalPosts: total, publishedPosts: published, draftPosts: draft, unusedTopics: unused };
  }
}
