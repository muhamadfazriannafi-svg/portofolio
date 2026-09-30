import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/data";
import { Badge } from "@/components/badge";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Tulisan tidak ditemukan" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16">
      <Link
        href="/blog"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        &larr; Semua tulisan
      </Link>

      <header className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.publishedAt}>{date}</time>
          <span aria-hidden>&middot;</span>
          <span>{post.readingMinutes} menit baca</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-lg text-muted">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </header>

      <div className="mt-10 flex flex-col gap-4 leading-8 text-muted">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
