-- Menambah dukungan galeri gambar pada profil dan project.
-- Jalankan di Supabase Dashboard > SQL Editor. Aman diulang.
-- Tidak menghapus atau mengubah data yang sudah ada.

alter table profile
  add column if not exists gallery jsonb not null default '[]'::jsonb;

alter table projects
  add column if not exists gallery jsonb not null default '[]'::jsonb,
  add column if not exists highlights text[] not null default '{}';

-- Contoh isi gallery (jalankan bila ingin melihat tampilan langsung):
-- update profile set gallery = '[
--   {"src":"https://picsum.photos/seed/portofolio-1/1200/800","alt":"Tampilan awal"},
--   {"src":"https://picsum.photos/seed/portofolio-2/1200/800","alt":"Halaman project"}
-- ]'::jsonb where id = 1;
--
-- update projects set
--   highlights = array['Arsitektur App Router','RLS per workspace','Realtime sinkron'],
--   gallery = '[{"src":"https://picsum.photos/seed/kanban-1/1200/800","alt":"Board utama"}]'::jsonb
-- where id = 'p1';