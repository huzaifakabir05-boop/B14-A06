"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/plan-context";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-350 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide"
        >
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} priority />
          FITLOG
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLinkActive(link.href)
                  ? "rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition-colors"
                  : "px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-muted transition-colors hover:text-foreground"
          >
            Plan
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-semibold text-accent-foreground">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-muted transition-colors hover:text-foreground"
          >
            Saved
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-border-subtle px-2 text-xs font-semibold text-foreground">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-2 border-t border-border-subtle px-4 py-2 sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              isLinkActive(link.href)
                ? "rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                : "rounded-full px-3 py-1 text-xs font-medium text-muted"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}