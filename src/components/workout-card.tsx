import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";


export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-2">
        {workout.image ? (
          <img
            src={workout.image}
            alt={workout.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {workout.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-base font-bold uppercase tracking-tight">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}