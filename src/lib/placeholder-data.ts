import type { Post, Profile, Project, Skill } from "./types";

export const profile: Profile = {
  name: "Nama Kamu",
  role: "Full-Stack Web Developer",
  tagline: "Membangun produk web yang cepat, rapi, dan enak dipakai.",
  bio: "Halo! Saya seorang developer yang fokus di ekosistem JavaScript/TypeScript. Saya senang mengubah ide menjadi produk nyata: mulai dari desain antarmuka, API, sampai deploy. Beberapa tahun terakhir saya banyak mengerjakan aplikasi web dengan Next.js, React, dan PostgreSQL/Supabase. Di luar coding, saya suka menulis catatan teknis dan mengulik tool produktivitas.",
  location: "Jakarta, Indonesia",
  email: "halo@namakamu.dev",
  avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Nama%20Kamu&backgroundColor=6366f1",
  resumeUrl: "/cv.pdf",
  socials: [
    { label: "GitHub", url: "https://github.com/username" },
    { label: "LinkedIn", url: "https://linkedin.com/in/username" },
    { label: "X", url: "https://x.com/username" },
    { label: "Email", url: "mailto:halo@namakamu.dev" },
  ],
};

export const skills: Skill[] = [
  { id: "s1", name: "TypeScript", category: "Bahasa", level: 5 },
  { id: "s2", name: "JavaScript", category: "Bahasa", level: 5 },
  { id: "s3", name: "React", category: "Frontend", level: 5 },
  { id: "s4", name: "Next.js", category: "Frontend", level: 4 },
  { id: "s5", name: "Tailwind CSS", category: "Frontend", level: 5 },
  { id: "s6", name: "Node.js", category: "Backend", level: 4 },
  { id: "s7", name: "PostgreSQL", category: "Backend", level: 4 },
  { id: "s8", name: "Supabase", category: "Backend", level: 4 },
  { id: "s9", name: "Docker", category: "DevOps", level: 3 },
  { id: "s10", name: "Git", category: "DevOps", level: 5 },
];

export const projects: Project[] = [
  {
    id: "p1",
    slug: "portofolio-dinamis",
    title: "Portofolio Dinamis",
    summary: "Situs portofolio dengan konten yang dikelola lewat database Supabase.",
    description:
      "Situs ini sendiri adalah salah satu project saya. Datanya bisa berasal dari Supabase (tabel projects, posts, skills) dan otomatis memakai data contoh saat environment variable belum diisi. Dibangun dengan Next.js App Router, React Server Components, dan Tailwind CSS, lengkap dengan dark mode.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    imageUrl: "https://picsum.photos/seed/portfolio/1200/800",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/portfolio",
    year: 2026,
    featured: true,
  },
  {
    id: "p2",
    slug: "manajemen-tugas",
    title: "Manajemen Tugas Tim",
    summary: "Kanban board real-time untuk kolaborasi tim kecil.",
    description:
      "Aplikasi kanban dengan drag-and-drop, komentar, dan notifikasi real-time. Backend memakai Supabase Realtime dan PostgreSQL dengan Row Level Security untuk memisahkan data antar workspace.",
    tags: ["React", "Supabase", "Realtime", "PostgreSQL"],
    imageUrl: "https://picsum.photos/seed/kanban/1200/800",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/kanban",
    year: 2025,
    featured: true,
  },
  {
    id: "p3",
    slug: "api-analitik",
    title: "API Analitik Ringan",
    summary: "Layanan pencatat event dengan dashboard agregasi.",
    description:
      "API untuk mengumpulkan event dari aplikasi klien, menyimpannya di PostgreSQL, lalu menampilkan agregat harian/mingguan pada dashboard. Fokus pada payload kecil dan query yang efisien.",
    tags: ["Node.js", "REST", "PostgreSQL", "Docker"],
    imageUrl: "https://picsum.photos/seed/analytics/1200/800",
    demoUrl: null,
    repoUrl: "https://github.com/username/analytics-api",
    year: 2025,
    featured: false,
  },
  {
    id: "p4",
    slug: "komponen-ui",
    title: "Pustaka Komponen UI",
    summary: "Kumpulan komponen React yang aksesibel dan bisa di-copy paste.",
    description:
      "Pustaka komponen headless dengan fokus aksesibilitas (fokus, keyboard, ARIA) dan dukungan dark mode. Dibuat untuk dipakai ulang antar project pribadi.",
    tags: ["React", "TypeScript", "A11y", "Tailwind"],
    imageUrl: "https://picsum.photos/seed/ui-kit/1200/800",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/username/ui-kit",
    year: 2024,
    featured: false,
  },
];

export const posts: Post[] = [
  {
    id: "b1",
    slug: "mulai-nextjs-16",
    title: "Mulai dengan Next.js 16: yang Berubah dan Kenapa Penting",
    excerpt:
      "Turbopack jadi default, params kini Promise, dan middleware berganti nama jadi proxy. Ini rangkuman hal yang wajib kamu tahu.",
    content:
      "Next.js 16 membawa sejumlah perubahan besar. Pertama, Turbopack kini aktif secara default untuk dev maupun build, jadi kamu bisa hapus flag --turbopack dari script. Kedua, akses sinkron ke params, searchParams, cookies(), dan headers() benar-benar dihapus — semuanya sekarang Promise dan harus di-await. Ketiga, konvensi middleware berganti nama menjadi proxy. Terakhir, perintah next lint dihapus, jadi linting dijalankan lewat ESLint langsung. Bagi yang baru mulai, alur App Router tetap sama: halaman dan layout adalah Server Component secara default, dan kamu menandai Client Component dengan 'use client'.",
    tags: ["Next.js", "React", "Tutorial"],
    coverImage: "https://picsum.photos/seed/nextjs16/1200/600",
    publishedAt: "2026-08-12",
    readingMinutes: 6,
  },
  {
    id: "b2",
    slug: "pola-data-supabase",
    title: "Pola Data Praktis di Supabase untuk Aplikasi Kecil",
    excerpt:
      "Bagaimana menyusun tabel, memakai Row Level Security, dan menghindari query yang boros.",
    content:
      "Supabase memberi kita PostgreSQL plus sederet layanan siap pakai. Untuk aplikasi kecil, mulailah dari tabel yang sederhana dan aktifkan Row Level Security sejak awal. Gunakan kolom slug yang unik untuk URL yang enak dibaca, dan simpan daftar tag sebagai array teks agar mudah difilter dengan operator contains. Hindari select('*') bila tidak perlu; pilih kolom yang benar-benar dipakai agar payload tetap kecil dan cepat.",
    tags: ["Supabase", "PostgreSQL", "Backend"],
    coverImage: "https://picsum.photos/seed/supabase/1200/600",
    publishedAt: "2026-07-03",
    readingMinutes: 5,
  },
  {
    id: "b3",
    slug: "server-component-vs-client",
    title: "Kapan Pakai Server Component, Kapan Client Component",
    excerpt:
      "Aturan praktis memutuskan batas server dan client tanpa bikin bundle membengkak.",
    content:
      "Aturan praktisnya: taruh sebanyak mungkin logika di Server Component, dan dorong batas 'use client' serendah mungkin di pohon komponen. Server Component cocok untuk mengambil data langsung dari database, sementara Client Component dipakai untuk interaktivitas seperti state, event handler, dan API browser. Pola yang sering saya pakai adalah membuat komponen kecil bertanda 'use client' (misalnya tombol dark mode), lalu merangkainya di dalam Server Component.",
    tags: ["React", "Next.js", "Arsitektur"],
    coverImage: "https://picsum.photos/seed/rsc/1200/600",
    publishedAt: "2026-05-21",
    readingMinutes: 4,
  },
];
