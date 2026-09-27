import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-sm font-semibold tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
      >
        Back to home
      </Link>
    </div>
  );
}