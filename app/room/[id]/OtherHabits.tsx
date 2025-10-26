"use client";

import { useEffect, useState } from "react";
import HabitCalendar, { HabitLog } from "./habitcalendar";
import { OtherHabitsProps, Habit } from "@/app/types/habit";
import { supabase } from "@/lib/supabaseClient";

interface HabitGrouped {
  [email: string]: Habit[];
}

export default function OtherHabits({ habits, calculateStreak }: OtherHabitsProps) {
  const [realtimeHabits, setRealtimeHabits] = useState(habits);

  // Subscribe to real-time updates
  useEffect(() => {
    const subscriptions: any[] = [];

    habits.forEach(habit => {
      const sub = supabase
        .channel(`habit_logs_habit_${habit.id}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "habit_logs",
            filter: `habit_id=eq.${habit.id}`,
          },
          (payload) => {
            setRealtimeHabits(prev => prev.map(h => {
              if (h.id === habit.id) {
                const updatedLogs = h.habit_logs.map(log =>
                  log.date === payload.new.date ? { ...log, status: payload.new.status } : log
                );
                return { ...h, habit_logs: updatedLogs };
              }
              return h;
            }));
          }
        )
        .subscribe();

      subscriptions.push(sub);
    });

    return () => subscriptions.forEach(sub => supabase.removeChannel(sub));
  }, [habits]);

  const grouped: HabitGrouped = realtimeHabits.reduce<HabitGrouped>((acc, habit) => {
    const email = habit.users?.email || "Unknown User";
    if (!acc[email]) acc[email] = [];
    acc[email].push(habit);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
      {Object.entries(grouped).map(([email, userHabits]) => (
        <div key={email} className="p-4 border rounded shadow-md bg-gray-50">
          <h2 className="font-semibold text-blue-600 mb-2">{email}</h2>

          {userHabits.map((habit) => (
            <div key={habit.id} className="mb-2 p-3 border rounded bg-white shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold">{habit.habit_name}</h3>
                <div className="flex items-center gap-1">
                  <span>🔥</span>
                  <span>{calculateStreak(habit.habit_logs)}</span>
                </div>
              </div>

              <HabitCalendar
                habitId={habit.id}
                logs={habit.habit_logs as HabitLog[]}
                // Do NOT pass markTodayInDB => read-only
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
