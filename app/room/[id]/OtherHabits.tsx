"use client";

import HabitCalendar from "./habitcalendar";
import { OtherHabitsProps, Habit } from "@/app/types/habit";

// Define the grouped type
interface HabitGrouped {
  [email: string]: Habit[];
}

export default function OtherHabits({ habits, calculateStreak }: OtherHabitsProps) {
  // Group habits by user email
  const grouped: HabitGrouped = habits.reduce<HabitGrouped>((acc, habit) => {
    const email = habit.users?.email || "Unknown User";
    if (!acc[email]) acc[email] = [];
    acc[email].push(habit);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
      {Object.entries(grouped).map(([email, userHabits]) => (
        <div key={email} className="p-4 border rounded shadow-md bg-gray-50">
          <h2 className="font-semibold text-blue-600 mb-3">{email}</h2>

          {userHabits.map((habit) => (
            <div key={habit.id} className="mb-3 p-3 border rounded bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{habit.habit_name}</h3>
                <div className="flex items-center gap-1">
                  <span>🔥</span>
                  <span>{calculateStreak(habit.habit_logs)}</span>
                </div>
              </div>

              <HabitCalendar
                habitId={habit.id}
                logs={habit.habit_logs}
                markToday={() => {}} // leave empty or pass function if you allow marking others
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
