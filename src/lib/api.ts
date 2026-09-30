import type { Workout } from "@/types/workout";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

type RawWorkout = Record<string, unknown>;

function pick<T>(raw: RawWorkout, keys: string[], fallback: T): T {
  for (const key of keys) {
    const value = raw[key];
    if (value !== undefined && value !== null) return value as T;
  }
  return fallback;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim().length > 0) return [value];
  return [];
}

export function normalizeWorkout(raw: RawWorkout): Workout {
  const id = String(pick<string | number>(raw, ["id", "_id", "workoutId"], ""));
  return {
    id,
    name: pick(raw, ["name", "title"], "Untitled Workout"),
    slug: pick(raw, ["slug"], id),
    image: pick(raw, ["image", "imageUrl", "img", "thumbnail"], ""),
    categories: toArray(
      pick(raw, ["muscleGroups", "categories", "tags", "category"], [])
    ),
    equipment: pick(raw, ["equipment"], ""),
    difficulty: pick(raw, ["difficulty", "level"], "Beginner"),
    sets: Number(pick(raw, ["sets"], 0)),
    reps: String(pick(raw, ["reps"], "")),
    duration: Number(pick(raw, ["duration", "durationMinutes", "time"], 0)),
    calories: Number(
      pick(raw, ["caloriesBurned", "calories", "kcal"], 0)
    ),
    rating: Number(pick(raw, ["rating"], 0)),
    description: pick(raw, ["description", "summary"], ""),
    instructions: toArray(pick(raw, ["instructions", "steps"], [])),
  };
}

function extractList(data: unknown): RawWorkout[] {
  if (Array.isArray(data)) return data as RawWorkout[];
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as RawWorkout[];
    if (Array.isArray(obj.workouts)) return obj.workouts as RawWorkout[];
    if (Array.isArray(obj.results)) return obj.results as RawWorkout[];
  }
  return [];
}

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to fetch workouts (${res.status})`);
  const data: unknown = await res.json();
  return extractList(data).map(normalizeWorkout);
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.id === String(id)) ?? null;
}