"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import SortDropdown, { SortKey } from "@/components/sort-dropdown";
import { usePlan } from "@/lib/plan-context";
import { useToast } from "@/lib/toast-context";
import type { PlannedWorkout, Workout } from "@/types/workout";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, toggleDone } =
    usePlan();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const activeList: (PlannedWorkout | Workout)[] = tab === "plan" ? plan : saved;

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? activeList.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.categories.some((c) => c.toLowerCase().includes(q))
        )
      : activeList;

    return [...base].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.calories - b.calories;
      return b.rating - a.rating;
    });
  }, [activeList, sortBy, query]);

  const totals = useMemo(
    () =>
      plan.reduce(
        (acc, w) => ({
          minutes: acc.minutes + w.duration,
          calories: acc.calories + w.calories,
        }),
        { minutes: 0, calories: 0 }
      ),
    [plan]
  );

  function handleRemove(id: string) {
    if (tab === "plan") {
      removeFromPlan(id);
      showToast("Removed from today's plan");
    } else {
      removeFromSaved(id);
      showToast("Removed from saved");
    }
  }

  function handleMarkDone(id: string) {
    toggleDone(id);
    showToast("Marked as done");
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Exercises" value={plan.length} accent />
        <MetricCard label="Minutes" value={totals.minutes} />
        <MetricCard label="Calories" value={totals.calories} />
      </div>

      {/* Tabs + controls */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface p-1">
          <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
            Today&apos;s Plan
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Saved
          </TabButton>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag…"
            className="w-full rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none sm:w-56"
          />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* List */}
      <div className="mt-6">
        {!hydrated ? (
          <p className="py-16 text-center text-sm text-muted">
            Loading workouts…
          </p>
        ) : filteredList.length === 0 ? (
          <EmptyState hasQuery={query.trim().length > 0} />
        ) : (
          <ul className="space-y-3">
            {filteredList.map((workout) => (
              <li
                key={workout.id}
                className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-surface-2">
                    {workout.image && (
                      <div className="relative h-full w-full">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill sizes="64px"
                        className="object-cover"
                      />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-tight">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-muted">{workout.equipment}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5" /> {workout.calories} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />{" "}
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-border-subtle px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      type="button"
                      onClick={() => handleMarkDone(workout.id)}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                        (workout as PlannedWorkout).done
                          ? "bg-surface-2 text-accent"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                      {(workout as PlannedWorkout).done ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(workout.id)}
                    aria-label="Remove"
                    className="rounded-full border border-border-subtle p-2 text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p
        className={`mt-1 font-display text-3xl font-bold ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ hasQuery }: { hasQuery: boolean }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface px-6 py-16 text-center">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">
        {hasQuery ? "No matches" : "Nothing here yet"}
      </h3>
      <p className="mt-2 text-sm text-muted">
        {hasQuery
          ? "Try a different name or tag."
          : "Browse the library and add a lift to get today moving."}
      </p>
      {!hasQuery && (
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground"
        >
          Go to workouts
        </Link>
      )}
    </div>
  );
}