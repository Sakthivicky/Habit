"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    return;
  }

  if (!data.user) {
    router.push("/login");
    return;
  }

  setUser(data.user);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.error(profileError);
    setIsAdmin(false);
    return;
  }

  setIsAdmin(profile?.is_admin || false);
};



    const fetchRooms = async () => {
      const { data } = await supabase.from("rooms").select("*");
      setRooms(data || []);
    };
    fetchUser();
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (!roomName) return alert("Enter room name");
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ name: roomName, created_by: user.id }])
      .select()
      .single();
    if (error) return alert(error.message);

    // Add creator as member
    await supabase.from("room_members").insert([{ room_id: data.id, user_id: user.id }]);

    setRooms([...rooms, data]);
    setRoomName("");
    router.push(`/room/${data.id}`);
  };

  const handleJoinRoom = async (roomId: string) => {
    await supabase.from("room_members").upsert({ room_id: roomId, user_id: user.id });
    router.push(`/room/${roomId}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>


               <div className="flex gap-2">
          {isAdmin && (
            <button
              onClick={() => router.push("/admin")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Admin Page
            </button>
          )}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create Room */}
      <div className="mb-6 flex gap-2">
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="New Room Name"
          className="border p-2 rounded mr-2 text-black"
        />
        <button
          onClick={handleCreateRoom}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
        >
          Create Room
        </button>
      </div>

      {/* Available Rooms */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-black">Available Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id} className="mb-2 p-2 border rounded flex justify-between items-center text-black">
              {room.name}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleJoinRoom(room.id)}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
