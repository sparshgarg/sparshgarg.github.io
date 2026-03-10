import Link from "next/link";
import type { Route } from "next";

const links: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/practice", label: "Practice Studio" },
  { href: "/history", label: "History" }
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-20 mb-8 mt-4 rounded-xl border border-border/80 bg-panel/70 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Product<span className="text-indigo-400">Guru</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
