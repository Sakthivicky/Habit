"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import MyHabits from "./MyHabits";
import OtherHabits from "./OtherHabits";
import { useRouter } from "next/navigation";


interface HabitLog {
  date: string;
  status: boolean | null; // allow null
}
interface Habit {
  id: number;
  habit_name: string;
  user_id: string;
   created_user?: string; 
  habit_logs: HabitLog[];
}

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;
    const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [roomName, setRoomName] = useState("");
  const [activeTab, setActiveTab] = useState<"mine" | "others">("mine");
  const [myHabits, setMyHabits] = useState<Habit[]>([]);
  const [otherHabits, setOtherHabits] = useState<Habit[]>([]);
  const [habitName, setHabitName] = useState("");

  // ✅ Fetch user, room and habits
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setUser(userData.user);

      // Room name
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("name")
        .eq("id", roomId)
        .single();

      if (roomError || !roomData) {
        console.error("Room fetch failed:", roomError?.message);
        setRoomName("Unknown Room");
        return;
      }

      setRoomName(roomData.name);

      // Habits
      const { data: habitsData, error: habitsError } = await supabase
        .from("habits")
        .select(`id, habit_name, user_id, habit_logs(*)`)
        .eq("room_id", roomId);

      if (habitsError) {
        console.error("Error fetching habits:", habitsError.message);
        return;
      }

      const my = habitsData?.filter((h) => h.user_id === userData.user.id) || [];
      const others = habitsData?.filter((h) => h.user_id !== userData.user.id) || [];

      setMyHabits(my);
      setOtherHabits(others);
    };

    fetchData();
  }, [roomId]);

  // ✅ Calculate streak count
  const calculateStreak = (logs: HabitLog[]) => {
  const today = new Date().toISOString().split("T")[0];
  const sorted = logs
    .filter((l) => l.status)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let streak = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    const date = sorted[i].date;
    const diff = (new Date(today).getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
    if (diff === streak) streak++;
    else break;
  }
  return streak;
};

  // ✅ Mark today's habit
  const markToday = async (habitId: number) => {
    const today = new Date().toISOString().split("T")[0];

 const { data: existingLog } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habitId)
    .eq("date", today)
    .single();
if (existingLog) {
    // Toggle off if already true
    const newStatus = !existingLog.status;
    await supabase
      .from("habit_logs")
      .update({ status: newStatus })
      .eq("habit_id", habitId)
      .eq("date", today);
  } else {
    await supabase.from("habit_logs").upsert({
      habit_id: habitId,
      date: today,
      status: true,
    });
  }
    // Refresh habits
    const { data } = await supabase
      .from("habits")
      .select(`id, habit_name, user_id,users(email), habit_logs(*)`)
      .eq("room_id", roomId);
    if (data) setMyHabits(data.filter((h) => h.user_id === user.id));
  };

  // ✅ Delete habit
  const deleteHabit = async (habitId: number) => {
    await supabase.from("habits").delete().eq("id", habitId);
    setMyHabits(myHabits.filter((h) => h.id !== habitId));
  };

  // ✅ Add habit
  const addHabit = async () => {
    if (!habitName.trim()) return alert("Enter habit name");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

 if (profileError) {
    console.error(profileError);
    alert("Error fetching profile name");
    return;
  }


    const { data, error } = await supabase
      .from("habits")
      .insert([{ habit_name: habitName, user_id: user.id, room_id: roomId,created_user: profile.username, }])
      .select("id, habit_name, created_user")
      .single();



      

    if (error) return alert(error.message);
     // Update local state for MyHabits
  setMyHabits([
    ...myHabits,
    {
      id: data.id,
      habit_name: data.habit_name,
      created_user: data.created_user,
      user_id: user.id,  // ✅ this fixes TypeScript error
      habit_logs: [],    // start with empty logs
    },
  ]);
    setHabitName("");
  };

  return (
  <div className="p-6 min-h-screen bg-white text-black">
    {/* Header with Back Button */}
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{roomName || "Loading..."}</h1>
      <button
        onClick={() => router.push("/dashboard")}
        className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>
    </div>

    {/* Add Habit */}
    <div className="mb-4 flex gap-2">
      <input
        placeholder="New Habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        className="border p-2 rounded w-60"
      />
      <button
        onClick={addHabit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Habit
      </button>
    </div>

    {/* Tabs */}
    <div className="flex gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded ${
          activeTab === "mine" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveTab("mine")}
      >
        My Habits
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeTab === "others" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveTab("others")}
      >
        Room Habits
      </button>
    </div>

    {/* Habits Section */}
    {activeTab === "mine" ? (
      <MyHabits
        habits={myHabits}
        markToday={markToday}
        deleteHabit={deleteHabit}
        calculateStreak={calculateStreak}
      />
    ) : (
      <OtherHabits habits={otherHabits} calculateStreak={calculateStreak} />
    )}
  </div>
);

}
