# Portofolio Dinamis

Situs portofolio pribadi yang datanya dikelola lewat Supabase (opsional). Tanpa
konfigurasi apa pun, situs tetap berjalan memakai data contoh di
`src/lib/placeholder-data.ts`.

Dibangun dengan **Next.js 16** (App Router, React Server Components),
**Tailwind CSS v4**, dan **Supabase**. Situs di-*build* menjadi file statis
sehingga bisa di-host gratis di **GitHub Pages**.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Halaman

| Rute               | Isi                                   |
| ------------------ | ------------------------------------- |
| `/`                | Hero, keahlian, project pilihan, blog |
| `/about`           | Profil dan daftar keahlian            |
| `/projects`        | Daftar project                        |
| `/projects/[slug]` | Detail project                        |
| `/blog`            | Daftar tulisan                        |
| `/blog/[slug]`     | Detail tulisan                        |
| `/contact`         | Form kontak (kirim langsung ke Supabase) |

## Menggunakan Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Buka SQL Editor, jalankan isi `supabase/schema.sql`.
3. Salin `.env.example` menjadi `.env.local` dan isi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. (Opsional) Isi awal data contoh: jalankan `supabase/seed.sql`, atau isi
   tabel `profile`, `skills`, `projects`, `posts` lewat Table Editor. Nama
   kolom mengikuti `supabase/schema.sql` (snake_case).

Lapisan data di `src/lib/data.ts` otomatis memakai Supabase bila env tersedia,
dan jatuh kembali ke data contoh bila tidak. Semua data dibaca memakai anon key
yang dilindungi Row Level Security (hanya boleh baca).

## Konten

Kamu cukup mengubah data di Supabase, tidak perlu menyentuh kode:

- **Profile** → tabel `profile` (1 baris)
- **Keahlian** → tabel `skills`
- **Project** → tabel `projects`
- **Tulisan blog** → tabel `posts`
- **Pesan masuk** → tabel `messages` (terisi otomatis dari form kontak)

Setelah data berubah, jalankan ulang deployment (lihat bagian GitHub Pages).

## Deploy ke GitHub Pages

Situs ini memakai `output: "export"`, jadi hanya halaman statis yang didukung.
Konsekuensinya: **tidak ada** panel admin atau server — semua konten diubah
langsung di Supabase.

Langkah deploy:

1. Push project ini ke repository GitHub.
2. **Settings → Secrets and variables → Actions** → tambahkan dua secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Settings → Pages** → pada **Build and deployment → Source**, pilih
   **GitHub Actions**.
4. Push ke branch `main`. Workflow `.github/workflows/deploy.yml` akan build
   dan menerbitkan situs secara otomatis.

### Memicu rebuild saat data berubah

Karena halaman detail di-*generate* saat build, menambah project/tulisan baru
di Supabase baru muncul setelah build ulang. Ada tiga cara memicunya:

1. **Terjadwal** — workflow berjalan tiap 6 jam (ubah `cron` di
   `.github/workflows/deploy.yml` bila perlu).
2. **Manual** — buka tab **Actions** → pilih workflow → **Run workflow**.
3. **Webhook dari Supabase** (paling cepat) — di Supabase buat
   **Database Webhook** pada tabel `projects` dan `posts`, arahkan ke GitHub
   `repository_dispatch` API:

   ```
   POST https://api.github.com/repos/<user>/<repo>/dispatches
   Authorization: Bearer <personal-access-token>
   Accept: application/vnd.github+json
   Body: { "event_type": "content-updated" }
   ```

   Workflow sudah menangani event `content-updated`.

## Skrip

```bash
npm run dev     # jalankan server pengembangan
npm run build   # build statis ke folder out/
npm run lint    # jalankan ESLint
```
