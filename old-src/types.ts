export interface TagCount {
  tag: string;
  count: number;
}

export interface FrontMatter {
  title?: string;
  data: string;
  excerpt?: string;
  slug: string;
  date: string;
  lastEdit?: string;
  draft?: boolean;
  tags?: string[];
}
