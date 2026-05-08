export interface SocialLink {
  _key?: string;
  platform: string;
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  headline: string;
  bio: string;
  profileImageUrl?: string;
  location?: string;
  availability?: string;
  skills: string[];
}

export interface Project {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  coverImageUrl?: string;
  techStack: string[];
  projectUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  orderRank?: number;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  summary: string;
  highlights?: string[];
  orderRank?: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  contactFormEndpoint?: string;
  socialLinks: SocialLink[];
}
