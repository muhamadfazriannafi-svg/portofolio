import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects, getPosts, getProfile, getSkills } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/badge";

export default async function Home() {
  const [profile, skills, featured, posts] = await Promise.all([
    getProfile(),
    getSkills(),
    getFeaturedProjects(),
    getPosts(),
  ]);

  const topSkills = skills.slice(0, 6);
  const latestPosts = posts.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <section className="flex flex-col gap-8 py-20 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm text-accent">{profile.role}</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-lg text-muted">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Lihat Project
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
              >
                Hubungi Saya
              </Link>
            </div>
          </div>
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={140}
            height={140}
            className="h-32 w-32 rounded-full border border-border object-cover sm:h-36 sm:w-36"
            priority
          />
        </div>
      </section>

      <section className="border-t border-border py-16">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
          Keahlian
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <Badge key={skill.id}>{skill.name}</Badge>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Project Pilihan
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Semua project &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Tulisan Terbaru
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Semua tulisan &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
