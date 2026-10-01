import Image from "next/image";
import type { Metadata } from "next";
import { getProfile, getSkills } from "@/lib/data";
import { Gallery } from "@/components/gallery";

export const metadata: Metadata = {
  title: "About",
  description: "Profil, pengalaman, dan keahlian.",
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([getProfile(), getSkills()]);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-8 text-muted">{profile.bio}</p>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Lokasi</span>
            <span>{profile.location}</span>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Email</span>
            <a
              href={`mailto:${profile.email}`}
              className="text-accent hover:underline"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          width={240}
          height={240}
          className="h-40 w-40 rounded-xl border border-border object-cover lg:justify-self-end"
        />
      </div>

      {profile.gallery.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Galeri</h2>
          <div className="mt-8">
            <Gallery images={profile.gallery} />
          </div>
        </section>
      ) : null}

      <section className="mt-16 border-t border-border pt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Keahlian</h2>
        <div className="mt-8 flex flex-col gap-10">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
                {category}
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <li key={skill.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted">{skill.level}/5</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
