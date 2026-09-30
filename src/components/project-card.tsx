import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Badge } from "./badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/10">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium">{project.title}</h3>
          <span className="text-xs text-muted">{project.year}</span>
        </div>
        <p className="flex-1 text-sm text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
