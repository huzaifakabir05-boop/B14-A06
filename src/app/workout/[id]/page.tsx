import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutDetailActions from "@/components/workout-detail-actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  const specs: { label: string; value: string }[] = [
    { label: "Equipment", value: workout.equipment || "—" },
    { label: "Difficulty", value: workout.difficulty || "—" },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps || "—" },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.calories} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left — visual/media */}
        <div className="overflow-hidden rounded-3xl border border-border-subtle bg-surface">
          {workout.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center text-sm text-muted">
              No image
            </div>
          )}
        </div>

        {/* Right — details */}
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground"
              >
                {cat}
              </span>
            ))}
          </div>

          <dl className="mt-6 divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-5 py-3 text-sm"
              >
                <dt className="uppercase tracking-wide text-muted">
                  {spec.label}
                </dt>
                <dd className="font-medium text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-muted">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-display font-bold text-accent">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutDetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}