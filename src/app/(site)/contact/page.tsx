import type { Metadata } from "next";
import { getProfile } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi saya untuk kolaborasi atau pertanyaan.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 max-w-xl text-muted">
        Punya project, pertanyaan, atau sekadar ingin menyapa? Kirim pesan
        lewat form di bawah, atau email langsung ke{" "}
        <a
          href={`mailto:${profile.email}`}
          className="text-accent hover:underline"
        >
          {profile.email}
        </a>
        .
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
