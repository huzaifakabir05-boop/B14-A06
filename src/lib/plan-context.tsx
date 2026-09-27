"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { PlannedWorkout, Workout } from "@/types/workout";

const STORAGE_KEY = "fitlog:plan-state:v1";
export const PLAN_CAP = 5;

interface StoredState {
  plan: PlannedWorkout[];
  saved: Workout[];
}

interface PlanContextValue {
  plan: PlannedWorkout[];
  saved: Workout[];
  planCount: number;
  savedCount: number;
  isPlanFull: boolean;
  hydrated: boolean;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function readStorage(): StoredState {
  if (typeof window === "undefined") return { plan: [], saved: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plan: [], saved: [] };
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { plan: [], saved: [] };
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initial = readStorage();

    queueMicrotask(() => {
      setPlan(initial.plan);
      setSaved(initial.saved);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ plan, saved })
    );
  }, [plan, saved, hydrated]);

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      saved,
      planCount: plan.length,
      savedCount: saved.length,
      isPlanFull: plan.length >= PLAN_CAP,
      hydrated,
      isInPlan: (id) => plan.some((w) => w.id === id),
      isSaved: (id) => saved.some((w) => w.id === id),
      addToPlan: (workout) =>
        setPlan((prev) =>
          prev.length >= PLAN_CAP || prev.some((w) => w.id === workout.id)
            ? prev
            : [...prev, { ...workout, done: false }]
        ),
      addToSaved: (workout) =>
        setSaved((prev) =>
          prev.some((w) => w.id === workout.id) ? prev : [...prev, workout]
        ),
      removeFromPlan: (id) =>
        setPlan((prev) => prev.filter((w) => w.id !== id)),
      removeFromSaved: (id) =>
        setSaved((prev) => prev.filter((w) => w.id !== id)),
      toggleDone: (id) =>
        setPlan((prev) =>
          prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
        ),
    }),
    [plan, saved, hydrated]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}