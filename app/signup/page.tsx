"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mask first 5 characters of password
  const maskPassword = (pwd: string) => {
    if (pwd.length <= 5) return "*".repeat(pwd.length);
    return "*****" + pwd.slice(5);
  };

  const handleSignup = async () => {
    try {
      if (!username || !email || !password || !confirmPassword) {
        return alert("Please fill all fields");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      setLoading(true);

      // 1️⃣ Create user in Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      const userId = signUpData.user?.id;

      // 2️⃣ Insert username into profiles table
      await supabase.from("profiles").insert([
        { id: userId, username },
      ]);

      // 3️⃣ Insert masked password into masked_passwords table
      const masked = maskPassword(password);

      await supabase.from("masked_passwords").insert([
        {
          user_id: userId,
          masked_password: masked,
        },
      ]);

      alert("✅ Account created! Check your email for confirmation.");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Create Account</h1>
        <p className="text-gray-500 mb-6">Start tracking your habit today 🚀</p>

        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded w-full mb-3 focus:ring-2 focus:ring-blue-400 text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded w-full mb-3 focus:ring-2 focus:ring-blue-400 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded w-full mb-3 focus:ring-2 focus:ring-blue-400 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded w-full mb-4 focus:ring-2 focus:ring-blue-400 text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
