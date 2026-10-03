"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/workout-card";
import SortDropdown, { SortKey } from "@/components/sort-dropdown";

export default function Library({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.categories.some((c) => c.toLowerCase().includes(q))
        )
      : workouts;

    return [...base].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.calories - b.calories;
      return b.rating - a.rating;
    });
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            The Library
          </h2>
          <p className="mt-2 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workouts or tags…"
              className="w-full rounded-full border border-border-subtle bg-surface py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none sm:w-64"
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted">
          No workouts match &quot;{query}&quot;.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}