export interface Project {
  id: string;
  title: string;
  created_at: Date;
  commit_count: number;
  description: string;
  functionalities: string;
  good_practices: string;
  site_url: string;
  is_highlight?: boolean;
}