import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { Badge } from "@/components/badge";
import { Gallery } from "@/components/gallery";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project tidak ditemukan" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16">
      <Link
        href="/projects"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        &larr; Semua project
      </Link>

      <header className="mt-6 flex flex-col gap-4">
        <span className="text-sm text-accent">{project.year}</span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Lihat Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-accent"
            >
              Kode Sumber
            </a>
          ) : null}
        </div>
      </header>

      <div className="mt-10">
        <Gallery
          images={
            project.gallery.length > 0
              ? project.gallery
              : [
                  {
                    src: project.imageUrl,
                    alt: project.title,
                  },
                ]
          }
          priority
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 leading-7 text-muted">
        {project.description.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {project.highlights.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Poin Utama</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 leading-7 text-muted">
                <span aria-hidden="true" className="text-accent">
                  &rsaquo;
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
