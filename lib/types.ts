export interface Event {
  slug: string;
  title: string;
  date: Date;
  year: string;
  description?: string;
  coverImage: string;
  contentFile: string;
  content: string;
}
