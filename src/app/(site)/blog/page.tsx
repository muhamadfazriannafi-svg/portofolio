import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Catatan dan tulisan seputar web development.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Catatan, tutorial, dan pemikiran seputar membangun produk web.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
