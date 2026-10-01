-- Data contoh untuk portofolio.
-- Jalankan di Supabase Dashboard > SQL Editor setelah schema.sql.
-- Aman dijalankan berulang (idempotent): baris dengan id sama akan diperbarui.

-- Profil (hanya boleh 1 baris, id = 1).
insert into profile (id, name, role, tagline, bio, location, email, avatar_url, resume_url, socials, gallery)
values (
  1,
  'Nama Kamu',
  'Full-Stack Web Developer',
  'Membangun produk web yang cepat, rapi, dan enak dipakai.',
  'Halo! Saya seorang developer yang fokus di ekosistem JavaScript/TypeScript. Saya senang mengubah ide menjadi produk nyata: mulai dari desain antarmuka, API, sampai deploy. Beberapa tahun terakhir saya banyak mengerjakan aplikasi web dengan Next.js, React, dan PostgreSQL/Supabase. Di luar coding, saya suka menulis catatan teknis dan mengulik tool produktivitas.',
  'Jakarta, Indonesia',
  'halo@namakamu.dev',
  'https://api.dicebear.com/9.x/initials/svg?seed=Nama%20Kamu&backgroundColor=6366f1',
  '/cv.pdf',
  '[{"label":"GitHub","url":"https://github.com/username"},{"label":"LinkedIn","url":"https://linkedin.com/in/username"},{"label":"X","url":"https://x.com/username"},{"label":"Email","url":"mailto:halo@namakayu.dev"}]'::jsonb,
  '[{"src":"https://picsum.photos/seed/profil-1/1200/800","alt":"Suasana kerja"},{"src":"https://picsum.photos/seed/profil-2/1200/800","alt":"Setup development"},{"src":"https://picsum.photos/seed/profil-3/1200/800","alt":"Kolaborasi tim"}]'::jsonb
)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  tagline = excluded.tagline,
  bio = excluded.bio,
  location = excluded.location,
  email = excluded.email,
  avatar_url = excluded.avatar_url,
  resume_url = excluded.resume_url,
  socials = excluded.socials,
  gallery = excluded.gallery;

-- Keahlian.
insert into skills (id, name, category, level) values
  ('s1',  'TypeScript',   'Bahasa',   5),
  ('s2',  'JavaScript',   'Bahasa',   5),
  ('s3',  'React',        'Frontend', 5),
  ('s4',  'Next.js',      'Frontend', 4),
  ('s5',  'Tailwind CSS', 'Frontend', 5),
  ('s6',  'Node.js',      'Backend',  4),
  ('s7',  'PostgreSQL',   'Backend',  4),
  ('s8',  'Supabase',     'Backend',  4),
  ('s9',  'Docker',       'DevOps',   3),
  ('s10', 'Git',          'DevOps',   5)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  level = excluded.level;

-- Project.
insert into projects (id, slug, title, summary, description, tags, image_url, demo_url, repo_url, year, featured, highlights, gallery) values
  (
    'p1', 'portofolio-dinamis', 'Portofolio Dinamis',
    'Situs portofolio dengan konten yang dikelola lewat database Supabase.',
    'Situs ini sendiri adalah salah satu project saya. Datanya bisa berasal dari Supabase (tabel projects, posts, skills) dan otomatis memakai data contoh saat environment variable belum diisi. Dibangun dengan Next.js App Router, React Server Components, dan Tailwind CSS, lengkap dengan dark mode.',
    array['Next.js','TypeScript','Tailwind','Supabase'],
    'https://picsum.photos/seed/portfolio/1200/800',
    'https://example.com', 'https://github.com/username/portfolio', 2026, true,
    array['Konten dikelola dari satu sumber: tabel Supabase','Static export, jadi hosting murah','Dark mode tanpa flash saat halaman dibuka'],
    '[{"src":"https://picsum.photos/seed/portfolio-1/1200/800","alt":"Beranda"},{"src":"https://picsum.photos/seed/portfolio-2/1200/800","alt":"Daftar project"},{"src":"https://picsum.photos/seed/portfolio-3/1200/800","alt":"Halaman detail"}]'::jsonb
  ),
  (
    'p2', 'manajemen-tugas', 'Manajemen Tugas Tim',
    'Kanban board real-time untuk kolaborasi tim kecil.',
    'Aplikasi kanban dengan drag-and-drop, komentar, dan notifikasi real-time. Backend memakai Supabase Realtime dan PostgreSQL dengan Row Level Security untuk memisahkan data antar workspace.',
    array['React','Supabase','Realtime','PostgreSQL'],
    'https://picsum.photos/seed/kanban/1200/800',
    'https://example.com', 'https://github.com/username/kanban', 2025, true,
    array['Perubahan kartu langsung tersinkron antar anggota tim','Akses workspace dipisah lewat Row Level Security'],
    '[{"src":"https://picsum.photos/seed/kanban-1/1200/800","alt":"Board utama"},{"src":"https://picsum.photos/seed/kanban-2/1200/800","alt":"Detail kartu"}]'::jsonb
  ),
  (
    'p3', 'api-analitik', 'API Analitik Ringan',
    'Layanan pencatat event dengan dashboard agregasi.',
    'API untuk mengumpulkan event dari aplikasi klien, menyimpannya di PostgreSQL, lalu menampilkan agregat harian/mingguan pada dashboard. Fokus pada payload kecil dan query yang efisien.',
    array['Node.js','REST','PostgreSQL','Docker'],
    'https://picsum.photos/seed/analytics/1200/800',
    null, 'https://github.com/username/analytics-api', 2025, false,
    array['Payload event kept small','Indeks PostgreSQL untuk query agregat harian','Dianalog dengan Docker Compose'],
    '[{"src":"https://picsum.photos/seed/analytics-1/1200/800","alt":"Dokumentasi endpoint"},{"src":"https://picsum.photos/seed/analytics-2/1200/800","alt":"Dashboard agregat"},{"src":"https://picsum.photos/seed/analytics-3/1200/800","alt":"Konfigurasi Docker"}]'::jsonb
  ),
  (
    'p4', 'komponen-ui', 'Pustaka Komponen UI',
    'Kumpulan komponen React yang aksesibel dan bisa di-copy paste.',
    'Pustaka komponen headless dengan fokus aksesibilitas (fokus, keyboard, ARIA) dan dukungan dark mode. Dibuat untuk dipakai ulang antar project pribadi.',
    array['React','TypeScript','A11y','Tailwind'],
    'https://picsum.photos/seed/ui-kit/1200/800',
    'https://example.com', 'https://github.com/username/ui-kit', 2024, false,
    array['Fokus keyboard penuh di setiap komponen','Dukungan dark mode tanpa flash','Dokumentasi contoh pemakaian per komponen'],
    '[{"src":"https://picsum.photos/seed/ui-kit-1/1200/800","alt":"Daftar komponen"},{"src":"https://picsum.photos/seed/ui-kit-2/1200/800","alt":"Contoh tombol"},{"src":"https://picsum.photos/seed/ui-kit-3/1200/800","alt":"Contoh dialog"}]'::jsonb
  )
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  description = excluded.description,
  tags = excluded.tags,
  image_url = excluded.image_url,
  demo_url = excluded.demo_url,
  repo_url = excluded.repo_url,
  year = excluded.year,
  featured = excluded.featured,
  highlights = excluded.highlights,
  gallery = excluded.gallery;

-- Tulisan blog.
insert into posts (id, slug, title, excerpt, content, tags, cover_image, published_at, reading_minutes) values
  (
    'b1', 'mulai-nextjs-16', 'Mulai dengan Next.js 16: yang Berubah dan Kenapa Penting',
    'Turbopack jadi default, params kini Promise, dan middleware berganti nama jadi proxy. Ini rangkuman hal yang wajib kamu tahu.',
    'Next.js 16 membawa sejumlah perubahan besar. Pertama, Turbopack kini aktif secara default untuk dev maupun build, jadi kamu bisa hapus flag --turbopack dari script. Kedua, akses sinkron ke params, searchParams, cookies(), dan headers() benar-benar dihapus — semuanya sekarang Promise dan harus di-await. Ketiga, konvensi middleware berganti nama menjadi proxy. Terakhir, perintah next lint dihapus, jadi linting dijalankan lewat ESLint langsung. Bagi yang baru mulai, alur App Router tetap sama: halaman dan layout adalah Server Component secara default, dan kamu menandai Client Component dengan ''use client''.',
    array['Next.js','React','Tutorial'],
    'https://picsum.photos/seed/nextjs16/1200/600',
    '2026-08-12', 6
  ),
  (
    'b2', 'pola-data-supabase', 'Pola Data Praktis di Supabase untuk Aplikasi Kecil',
    'Bagaimana menyusun tabel, memakai Row Level Security, dan menghindari query yang boros.',
    'Supabase memberi kita PostgreSQL plus sederet layanan siap pakai. Untuk aplikasi kecil, mulailah dari tabel yang sederhana dan aktifkan Row Level Security sejak awal. Gunakan kolom slug yang unik untuk URL yang enak dibaca, dan simpan daftar tag sebagai array teks agar mudah difilter dengan operator contains. Hindari select(*) bila tidak perlu; pilih kolom yang benar-benar dipakai agar payload tetap kecil dan cepat.',
    array['Supabase','PostgreSQL','Backend'],
    'https://picsum.photos/seed/supabase/1200/600',
    '2026-07-03', 5
  ),
  (
    'b3', 'server-component-vs-client', 'Kapan Pakai Server Component, Kapan Client Component',
    'Aturan praktis memutuskan batas server dan client tanpa bikin bundle membengkak.',
    'Aturan praktisnya: taruh sebanyak mungkin logika di Server Component, dan dorong batas ''use client'' serendah mungkin di pohon komponen. Server Component cocok untuk mengambil data langsung dari database, sementara Client Component dipakai untuk interaktivitas seperti state, event handler, dan API browser. Pola yang sering saya pakai adalah membuat komponen kecil bertanda ''use client'' (misalnya tombol dark mode), lalu merangkainya di dalam Server Component.',
    array['React','Next.js','Arsitektur'],
    'https://picsum.photos/seed/rsc/1200/600',
    '2026-05-21', 4
  )
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  tags = excluded.tags,
  cover_image = excluded.cover_image,
  published_at = excluded.published_at,
  reading_minutes = excluded.reading_minutes;
