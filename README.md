# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built for the B14-A6 assignment: browse a library of workouts, lock lifts into today's plan, and watch the week's work add up. Built with Next.js (App Router) and TypeScript.

**Live Link: https://huzaifakabir05-boop.github.io/B14-A06/
**GitHub Repository: https://github.com/huzaifakabir05-boop/B14-A06.git

## Technologies Used

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** for styling and responsive layout
- **lucide-react** for icons
- **React Context API** for global Plan / Saved state
- **Browser `localStorage`** for persisting the plan across reloads
- **FitLog Alternative API** (`https://api.api-store.workers.dev/api/fitlog`) as the data source

## Features

1. **Responsive workout library** — a 3-column grid (mobile/tablet/desktop responsive) of 12 workouts pulled live from the API, each with an image, category tags, equipment, and a stats row (duration, calories, rating).
2. **Search and sort** — filter the library or My Plan list by workout name/tag, and sort by Duration, Calories, or Rating via a dropdown (defaults to Duration).
3. **Workout detail pages** — a dynamic route (`/workout/[id]`) with a two-column layout: media on the left, specs table and step-by-step instructions on the right.
4. **Today's Plan & Saved workflow** — "Add to today's plan" and "Save for later" buttons update a shared context, show toast notifications, live-update the Navbar's Plan/Saved badge counts, and are capped at 5 lifts per day.
5. **My Plan page** — tabbed view (Today's Plan / Saved) with live metrics (exercises, minutes, calories), Mark as Done, Remove, and an empty state guiding users back to the library.
6. **Persisted state** — the plan and saved lists survive a page reload via `localStorage`.
7. **Polished UX details** — loading states while fetching, a custom 404 page, and toast notifications for every plan/saved action.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/              # Routes (home, /workout/[id], /my-plan, 404, loading states)
├── components/        # Navbar, Hero, Footer, Library, WorkoutCard, SortDropdown, etc.
├── lib/               # API client + normalizer, Plan/Saved context, Toast context
└── types/             # Shared TypeScript types
\`\`\`
