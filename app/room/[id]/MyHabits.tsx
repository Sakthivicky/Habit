"use client";

import { MyHabitsProps } from "@/app/types/habit";
import HabitCalendar, { HabitLog } from "./habitcalendar";
import { supabase } from "@/lib/supabaseClient";

export default function MyHabits({ habits, deleteHabit, calculateStreak }: MyHabitsProps) {
  const markTodayInDB = async (habitId: number, date: string, status: boolean) => {
    try {
      await supabase
        .from("habit_logs")
        .upsert(
          [{ habit_id: habitId, date, status }],
          { onConflict: "habit_id,date" }
        );
    } catch (err) {
      console.error("Error marking habit:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {habits.map((habit) => (
        <div key={habit.id} className="p-3 border rounded shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">{habit.habit_name}</h2>
            <div className="flex items-center gap-1">
              <span>🔥</span>
              <span>{calculateStreak(habit.habit_logs)}</span>
            </div>
          </div>

          <HabitCalendar
            habitId={habit.id}
            logs={habit.habit_logs as HabitLog[]}
            markTodayInDB={markTodayInDB} // interactive
          />

          <button
            className="mt-2 text-red-600 hover:underline"
            onClick={() => deleteHabit(habit.id)}
          >
            Delete Habit
          </button>
        </div>
      ))}
    </div>
  );
}
