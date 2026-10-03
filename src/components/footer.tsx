import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide"
        >
          <Image src={`${BASE_PATH}/logo.png`} alt="FitLog logo" width={20} height={20} className="h-5 w-5"/>
          FITLOG
        </Link>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}