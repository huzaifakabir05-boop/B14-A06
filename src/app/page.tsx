import Hero from "@/components/hero";
import Library from "@/components/library";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

export default async function Home() {
  let workouts: Workout[] = [];
  let loadError = false;

  try {
    workouts = await getWorkouts();
  } catch {
    loadError = true;
  }

  return (
    <>
      <Hero />
      {loadError ? (
        <section
          id="library"
         className="mx-auto max-w-7xl px-6 py-16 text-center text-sm text-muted"
        >
          Couldn&apos;t load the workout library right now. Please refresh the
          page.
        </section>
      ) : (
        <Library workouts={workouts} />
      )}
    </>
  );
}