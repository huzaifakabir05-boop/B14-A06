export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-subtle border-t-accent" />
      <p className="text-sm text-muted">Loading workouts…</p>
    </div>
  );
}