"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  // Use EXACT SAME supabase client style as login page
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    // EXACT Supabase signup method (same as login method family)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    // Redirect after successful signup
    router.push("/login");
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-sm text-slate-400 mb-4 text-center">
          Signup to access Web VAPT resources & labs.
        </p>

        <form
          onSubmit={handleSignup}
          className="space-y-4 bg-slate-900/70 border border-slate-700 p-6 rounded-xl shadow-lg"
        >
          {/* Email */}
          <div className="space-y-1 text-sm">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-1 text-sm">
            <label>Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 text-sm">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-emerald-400"
            />
          </div>

          {/* Error */}
          {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium text-sm py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>
      </div>
    </main>
  );
}
