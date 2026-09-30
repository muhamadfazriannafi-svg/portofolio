import { cache } from "react";
import { getSupabase } from "./supabase";
import * as placeholder from "./placeholder-data";
import type { Post, Profile, Project, Skill } from "./types";

const PROFILE_COLUMNS =
  "name,role,tagline,bio,location,email,avatarUrl:avatar_url,resumeUrl:resume_url,socials";
const SKILL_COLUMNS = "id,name,category,level";
const PROJECT_COLUMNS =
  "id,slug,title,summary,description,tags,imageUrl:image_url,demoUrl:demo_url,repoUrl:repo_url,year,featured";
const POST_COLUMNS =
  "id,slug,title,excerpt,content,tags,coverImage:cover_image,publishedAt:published_at,readingMinutes:reading_minutes";

async function query<T>(
  table: string,
  columns: string,
  fallback: T[],
): Promise<T[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return fallback;
  }

  try {
    const { data, error } = await supabase.from(table).select(columns);
    if (error || !data || data.length === 0) {
      return fallback;
    }
    return data as T[];
  } catch {
    return fallback;
  }
}

export const getProfile = cache(async (): Promise<Profile> => {
  const supabase = getSupabase();
  if (!supabase) {
    return placeholder.profile;
  }

  try {
    const { data, error } = await supabase
      .from("profile")
      .select(PROFILE_COLUMNS)
      .limit(1)
      .maybeSingle();
    if (error || !data) {
      return placeholder.profile;
    }
    return data as Profile;
  } catch {
    return placeholder.profile;
  }
});

export const getSkills = cache(async (): Promise<Skill[]> => {
  const skills = await query<Skill>("skills", SKILL_COLUMNS, placeholder.skills);
  return skills.sort((a, b) => b.level - a.level);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const projects = await query<Project>(
    "projects",
    PROJECT_COLUMNS,
    placeholder.projects,
  );
  return projects.sort((a, b) => b.year - a.year);
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 2);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const projects = await getProjects();
    return projects.find((project) => project.slug === slug) ?? null;
  },
);

export const getPosts = cache(async (): Promise<Post[]> => {
  const posts = await query<Post>("posts", POST_COLUMNS, placeholder.posts);
  return posts.sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const posts = await getPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  },
);
