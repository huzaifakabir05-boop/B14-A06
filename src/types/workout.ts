export interface Workout {
  id: string;
  name: string;
  slug: string;
  image: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number; // minutes
  calories: number;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlannedWorkout extends Workout {
  done: boolean;
}