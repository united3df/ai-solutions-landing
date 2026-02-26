export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

export interface PostFull extends PostListItem {
  content: string;
  metaTitle: string;
  metaDesc: string;
  keyword: string | null;
}
