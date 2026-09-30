import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Portofolio<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      <ul className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 sm:hidden">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
