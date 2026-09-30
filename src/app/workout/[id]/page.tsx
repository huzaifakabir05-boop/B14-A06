import { notFound } from "next/navigation";
import Image from "next/image";
import { getWorkoutById, getWorkouts } from "@/lib/api";
import WorkoutDetailActions from "@/components/workout-detail-actions";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const workouts = await getWorkouts();
    return workouts.map((workout) => ({ id: workout.id }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

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
    <div className="mx-auto max-w-350 px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border-subtle bg-surface lg:aspect-auto">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              No image
            </div>
          )}
        </div>

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