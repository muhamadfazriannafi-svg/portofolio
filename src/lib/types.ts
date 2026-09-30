export type SocialLink = {
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: SocialLink[];
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string | null;
  repoUrl: string | null;
  year: number;
  featured: boolean;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readingMinutes: number;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
