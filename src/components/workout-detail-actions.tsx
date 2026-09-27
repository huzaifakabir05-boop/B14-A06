"use client";

import { Bookmark, BookmarkCheck, CalendarPlus, Check } from "lucide-react";
import type { Workout } from "@/types/workout";
import { usePlan } from "@/lib/plan-context";
import { useToast } from "@/lib/toast-context";

export default function WorkoutDetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();

  const alreadyPlanned = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  function handleAddToPlan() {
    if (alreadyPlanned || isPlanFull) return;
    addToPlan(workout);
    showToast("Added to today's plan");
  }

  function handleSave() {
    if (alreadySaved) return;
    addToSaved(workout);
    showToast("Saved for later");
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={alreadyPlanned || isPlanFull}
        className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadyPlanned ? (
          <Check className="h-4 w-4" />
        ) : (
          <CalendarPlus className="h-4 w-4" />
        )}
        {alreadyPlanned
          ? "In today's plan"
          : isPlanFull
            ? "Plan is full"
            : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={alreadySaved}
        className="flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold text-foreground transition-colors enabled:hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadySaved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}