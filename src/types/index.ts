export type EventCategory = 'WORKSHOP' | 'HACKATHON' | 'COMMUNITY' | 'TALK' | 'MEETUP' | 'COMPETITION';
export type EventStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED';

export interface FosEvent {
  id: string;
  title: string;
  year: number;
  date: string;
  time?: string;
  description: string;
  category: EventCategory;
  coverImage: string;
  highlights: string[];
  status: EventStatus;
  location: string;
  registrationUrl?: string;
  registrationOpen?: boolean;
  maxSeats?: number;
  contactPerson?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AnnouncementCategory = 'GENERAL' | 'EVENT' | 'RECRUITMENT' | 'ALERT';
export type AnnouncementPriority = 'LOW' | 'NORMAL' | 'URGENT' | 'PINNED';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  isActive: boolean;
  actionUrl?: string;
  actionLabel?: string;
  date: string;
  createdAt?: string;
}

export interface ExecomMember {
  id?: string;
  name: string;
  role: string;
  tenure?: string;
  isCurrent?: boolean;
  department?: string;
  photo?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  order?: number;
}

export interface PostEventReport {
  id: string;
  eventId?: string;
  title: string;
  eventDate: string;
  coverImage?: string;
  summary: string;
  attendeeCount: number;
  speaker?: string;
  outcomes: string[];
  gallery: string[];
  driveFolderUrl?: string;
  reportDocUrl?: string;
  submittedBy?: string;
  createdAt?: string;
}

export interface ClubSettings {
  clubName: string;
  tagline: string;
  manifesto: string;
  email: string;
  github: string;
  instagram: string;
  discord: string;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}

export type ProjectStatus = 'ACTIVE' | 'MAINTAINED' | 'INCUBATING' | 'ARCHIVED';

export interface FossProject {
  id: string;
  name: string;
  repoName: string;
  description: string;
  language: string;
  license: string;
  stars: number;
  forks: number;
  url: string;
  status: ProjectStatus;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

