import Image from "next/image";
import { BASE_PATH } from "@/lib/site";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-10">
      <div className="grid items-center gap-10 rounded-3xl border border-border-subtle bg-surface px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            Browse Workouts
          </a>
        </div>

        <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:ml-auto lg:mr-0">
          <Image
            src={`${BASE_PATH}/banner.png`}
            alt="FitLog workout banner"
            fill
            priority
            sizes="(min-width: 1024px) 320px, 256px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}