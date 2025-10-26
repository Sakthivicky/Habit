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

  // Get user's profile to retrieve name/email
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("username") // or "email" if you want email
    .eq("id", user.id)
    .single();

  if (profileError) return alert(profileError.message);

  const username = profileData?.username || "Unknown";

  // Insert room with username instead of UUID
  const { data, error } = await supabase
    .from("rooms")
    .insert([{ name: roomName, created_by: user.id ,  created_user: username  }])
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

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    // Delete room_members entries
    await supabase.from("room_members").delete().eq("room_id", roomId);

    // Delete room
    const { error } = await supabase.from("rooms").delete().eq("id", roomId);
    if (error) return alert(error.message);

    // Update UI
    setRooms(prev => prev.filter(r => r.id !== roomId));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
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
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create Room (Admins only) */}
      {isAdmin && (
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
      )}

      {/* Available Rooms */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-black">Available Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-xl transition cursor-pointer"
              onClick={() => handleJoinRoom(room.id)}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">{room.name}</h3>
              <p className="text-gray-500 text-sm">Created by: {room.created_user}</p>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinRoom(room.id);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Join Room
                </button>

                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRoom(room.id);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
