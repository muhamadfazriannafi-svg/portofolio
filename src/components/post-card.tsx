import Link from "next/link";
import type { Post } from "@/lib/types";
import { Badge } from "./badge";

export function PostCard({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-center gap-3 text-xs text-muted">
        <time dateTime={post.publishedAt}>{date}</time>
        <span aria-hidden>&middot;</span>
        <span>{post.readingMinutes} menit baca</span>
      </div>
      <h3 className="text-lg font-medium group-hover:text-accent">
        {post.title}
      </h3>
      <p className="text-sm text-muted">{post.excerpt}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
