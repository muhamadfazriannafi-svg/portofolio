import type { Profile } from "@/lib/types";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. Dibangun dengan
          Next.js &amp; Supabase.
        </p>
        <ul className="flex flex-wrap gap-4">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
