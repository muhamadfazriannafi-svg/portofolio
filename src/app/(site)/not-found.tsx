import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-4 py-32">
      <p className="text-sm text-accent">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Halaman tidak ditemukan
      </h1>
      <p className="text-muted">
        Sepertinya halaman yang kamu cari sudah dipindah atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Kembali ke Home
      </Link>
    </div>
  );
}
