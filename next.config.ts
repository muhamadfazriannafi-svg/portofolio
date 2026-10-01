import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH || undefined,
  trailingSlash: true,
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "hzhabhhyzskbpyodoacg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // ponytail: token signed URL ikut ter-bake ke HTML publik, jadi bucket ini
        // hanya untuk gambar yang memang boleh dilihat siapa saja. Kalau butuh
        // file privat, pindahkan bucket ke public=false dan pakai proxy server.
        protocol: "https",
        hostname: "hzhabhhyzskbpyodoacg.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
};

export default nextConfig;
