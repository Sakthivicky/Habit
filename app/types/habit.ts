// /types/habit.ts

import { User } from "@supabase/supabase-js";

// Single log entry
export interface HabitLog {
  date: string;
  status:  boolean | null;
}

// Habit object
export interface Habit {
  id: number;
  habit_name: string;
  habit_logs: HabitLog[];
    users?: User;
}

// Props for MyHabits component
export interface MyHabitsProps {
  habits: Habit[];
markToday: (habitId: number, date?: string) => void; 
  deleteHabit: (habitId: number) => void;
  calculateStreak: (logs: HabitLog[]) => number;
}

// Props for OtherHabits component
export interface OtherHabitsProps {
  habits: Habit[];
  calculateStreak: (logs: HabitLog[]) => number;
}

// Props for HabitCalendar component
export interface HabitCalendarProps {
  habitId: number;
  logs: HabitLog[];
  markToday: (habitId: number) => void;
}
