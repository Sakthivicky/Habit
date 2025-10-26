"use client";

import { MyHabitsProps } from "@/app/types/habit";
import HabitCalendar, { HabitLog } from "./habitcalendar";
import { supabase } from "@/lib/supabaseClient";

export default function MyHabits({ habits, deleteHabit, calculateStreak }: MyHabitsProps) {
  // Updated: status can be true, false, or null
  const markTodayInDB = async (habitId: number, date: string, status: boolean | null) => {
    try {
      if (status === null) {
        // Optionally, remove entry from DB if null
        await supabase
          .from("habit_logs")
          .delete()
          .eq("habit_id", habitId)
          .eq("date", date);
      } else {
        await supabase
          .from("habit_logs")
          .upsert(
            [{ habit_id: habitId, date, status }],
            { onConflict: "habit_id,date" }
          );
      }
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {habits.map((habit) => (
        <div key={habit.id} className="p-4 border rounded shadow-md">
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
            markTodayInDB={markTodayInDB}
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
