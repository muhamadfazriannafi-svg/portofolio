"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setMessage("");

    const supabase = createBrowserSupabase();
    if (!supabase) {
      setStatus("error");
      setMessage(
        "Form kontak belum aktif. Silakan kirim email langsung ke alamat di atas.",
      );
      return;
    }

    try {
      const { error } = await supabase.from("messages").insert({
        name: String(data.name ?? "").trim(),
        email: String(data.email ?? "").trim(),
        subject: String(data.subject ?? "").trim(),
        message: String(data.message ?? "").trim(),
      });

      if (error) {
        throw new Error(error.message);
      }

      setStatus("success");
      setMessage("Terima kasih! Pesanmu sudah terkirim.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Gagal mengirim pesan. Coba lagi nanti.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Nama
          <input
            name="name"
            required
            placeholder="Nama kamu"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="nama@email.com"
            className={inputClass}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        Subjek
        <input
          name="subject"
          required
          placeholder="Ada yang bisa saya bantu?"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Pesan
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tulis pesanmu di sini..."
          className={`${inputClass} resize-y`}
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
      </button>
      {message ? (
        <p
          role="status"
          className={`text-sm ${
            status === "success" ? "text-accent" : "text-red-500"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
