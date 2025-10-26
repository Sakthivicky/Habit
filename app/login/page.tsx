"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) return alert("Please enter both fields");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data.session) router.push("/dashboard");
  const { data: profile } = await supabase
  .from("profiles")
  .select("is_admin")
  .eq("id", data.user?.id)
  .single();

if (profile?.is_admin) router.push("/admin");
else router.push("/profile"); // student fills profile first

    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Login to track your daily habits 🌱</p>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded w-full mb-3 focus:ring-2 focus:ring-green-400 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded w-full mb-4 focus:ring-2 focus:ring-green-400 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
