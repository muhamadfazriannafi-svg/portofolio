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
| `/about`           | Profil, galeri, dan daftar keahlian   |
| `/projects`        | Daftar project                        |
| `/projects/[slug]` | Detail project                        |
| `/blog`            | Daftar tulisan                        |
| `/blog/[slug]`     | Detail tulisan                        |
| `/contact`         | Form kontak (kirim langsung ke Supabase) |

## Menggunakan Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Buka SQL Editor, jalankan isi `supabase/schema.sql`. Bila tabelnya sudah
   ada tapi kolom galeri belum, jalankan `supabase/migrate-gallery.sql` —
   keduanya aman diulang dan tidak menghapus data.
3. Salin `.env.example` menjadi `.env.local` dan isi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. (Opsional) Isi awal data contoh: jalankan `supabase/seed.sql`, atau isi
   tabel `profile`, `skills`, `projects`, `posts` lewat Table Editor. Nama
   kolom mengikuti `supabase/schema.sql` (snake_case).

Tanpa `.env.local`, `npm run dev` dan `npm run build` tetap jalan memakai
`src/lib/placeholder-data.ts`. File itu tidak pernah ikut commit
(`.gitignore` mengabaikan semua `.env*` kecuali `.env.example`).

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

### Galeri gambar

`profile.gallery` dan `projects.gallery` berisi array JSON dengan bentuk
`{ "src": "https://...", "alt": "keterangan" }`. `projects.highlights` berisi
array teks untuk daftar poin utama.

```sql
update projects set
  highlights = array['Poin satu','Poin dua'],
  gallery = '[{"src":"https://.../a.png","alt":"Tampilan awal"},
              {"src":"https://.../b.png","alt":"Halaman detail"}]'::jsonb
where id = 'p1';
```

Komponen `src/components/gallery.tsx` menampilkannya sebagai carousel scroll
murni CSS (`snap-x` + `overflow-x-auto`) — tanpa library, tanpa JavaScript
tambahan. Satu gambar otomatis tampil penuh tanpa scroll. Galeri kosong
disembunyikan, dan `projects/[slug]` jatuh kembali ke `image_url` tunggal.

Hostname gambar eksternal harus terdaftar di `remotePatterns`
(`next.config.ts`). Untuk Supabase Storage, bucket **private** menghasilkan URL
bertanda pada path `/storage/v1/object/sign/`; tokennya ikut ter-*bake* ke HTML
publik, jadi jangan pernah menaruh file sensitif di bucket yang dipakai untuk
galeri. Kalau butuh file privat, sediakan proxy server — bukan static export.

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

Menu **Settings → Pages** dibuat otomatis oleh workflow, jadi langkah ini bisa
dilewati kalau pembuatan Pages sudah pernah dijalankan.

### Kalau deploy gagal

`Multiple artifacts named "github-pages"` muncul bila sebuah run di-*re-run*:
build kedua mengunggah artifact dengan nama yang sama tanpa menghapus yang
lama, sehingga `deploy-pages` menolak. Pemecahnya bukan re-run, tapi picu
build baru:

```bash
gh workflow run deploy.yml
```

Perubahan isi `out/` tidak selalu terlihat lokal setelah `next.config.ts`
diubah. Bersihkan cache bila hasil build terasa basi:

```bash
rm -rf .next out   # PowerShell: Remove-Item -Recurse -Force .next, out
```

Cache browser GitHub Pages bertahan 10 menit (`max-age=600`), jadi setelah
deploy cek lewat Incognito.

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

`npm run dev` membaca Supabase di setiap request, sedangkan `npm run build`
menyalin data ke HTML sekali lalu berhenti. Itu sebabnya konten di live tidak
ikut berubah sampai ada build baru.
