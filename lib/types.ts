export interface Event {
  slug: string;
  title: string;
  date: Date;
  year: string;
  description?: string;
  coverImage: string;
  directory: string;
  contentFile: string;
}
