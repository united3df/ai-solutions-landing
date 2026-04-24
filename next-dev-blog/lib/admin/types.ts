export interface AdminPostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  status: string;
  score: number | null;
}

export interface AdminPostFull {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  content: string;
  metaTitle: string;
  metaDesc: string;
  keyword: string | null;
  status?: string;
  score?: number | null;
}
