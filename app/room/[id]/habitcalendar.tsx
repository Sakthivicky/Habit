"use client";

import React, { useState, useEffect } from "react";

export interface HabitLog {
  date: string;
  status: boolean | null;
}

interface HabitCalendarProps {
  habitId: number;
  logs: HabitLog[];
  markTodayInDB?: (habitId: number, date: string, status: boolean) => void; // optional
}

export default function HabitCalendar({ habitId, logs, markTodayInDB }: HabitCalendarProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const todayStr = now.toISOString().split("T")[0];

  const [calendarLogs, setCalendarLogs] = useState<HabitLog[]>([]);

  // Initialize calendar logs for the month
  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthLogs: HabitLog[] = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const log = logs.find(l => l.date === dateStr);
      return { date: dateStr, status: log ? log.status : null };
    });

    // Auto mark past days that are null as false
    const updatedLogs = monthLogs.map(l =>
      l.date < todayStr && l.status === null ? { ...l, status: false } : l
    );

    setCalendarLogs(updatedLogs);
  }, [logs, month, year, todayStr]);

  // Toggle today's status safely
  const handleToggleToday = (status: boolean) => {
    setCalendarLogs(prev =>
      prev.map(l =>
        l.date === todayStr ? { ...l, status } : l
      )
    );
    markTodayInDB?.(habitId, todayStr, status); // optional call
  };

  // Calculate current streak
  const streak = calendarLogs.reduce((acc, curr) => (curr.status ? acc + 1 : 0), 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {now.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥 {streak}</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarLogs.map((d, idx) => {
          const isToday = d.date === todayStr;
          const bgColor =
            d.status === true ? "bg-green-200" :
            d.status === false ? "bg-red-200" :
            "bg-gray-50";
          const borderStyle = isToday ? "ring-2 ring-blue-500" : "border border-gray-200";

          return (
            <div
              key={idx}
              className={`p-3 flex flex-col items-center justify-center rounded-lg ${bgColor} ${borderStyle}`}
            >
              <span className="font-medium text-gray-700">{d.date.split("-")[2]}</span>
              {d.status !== null && <span className="text-sm mt-1">{d.status ? "✅" : "❌"}</span>}

              {/* Show buttons only for today and if markTodayInDB exists */}
              {isToday && markTodayInDB && (
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => handleToggleToday(true)}
                    className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => handleToggleToday(false)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
