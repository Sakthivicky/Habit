"use client";
// app/admin/page.tsx
export const dynamic = "force-dynamic";




import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  username: string;
  email: string | null;
  phone_number: string | null;
  state: string | null;
  district: string | null;
  placement: string | null;
  study_time_per_day: string | null;
  linkedin_id: string | null;
  interest: string | null;
  hobbies: string | null;
  education: string | null;
  college_name: string | null;
  semester: string | null;
  year_of_passing: number | null;
  degree: string | null;
  current_arrear: boolean | null;
  accommodation: string | null;
  current_cgpa: number | null;
  certifications: string | null;
  other_skills: string | null;
  cybersecurity_domain: string | null;
  domain_reason: string | null;
  domain_knowledge: string | null;
  tools_known: string | null;
  is_admin: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // 1️⃣ Get current user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return router.push("/login");

      // 2️⃣ Check if user is admin (from admins table)
      const { data: profile } = await supabase
  .from("profiles")
  .select("is_admin")
  .eq("id", userData.user.id)
  .single();

if (!profile?.is_admin) {
  alert("Access denied — Admins only 🚫");
  return router.push("/dashboard");
}

      // 3️⃣ Fetch all profiles
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching profiles:", error);
      else setProfiles(data || []);

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-lg font-medium">
        Loading Admin Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 text-gray-900">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">👑 Admin Dashboard</h1>
          <button
      onClick={() => router.push("/dashboard")}
      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
    >
      Back to Dashboard
    </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[80vh] overflow-y-auto border rounded-lg shadow-sm">
          <table className="min-w-[1500px] border-collapse w-full text-sm">
            <thead className="bg-blue-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">State</th>
                <th className="p-2 border">District</th>
                <th className="p-2 border">Placement</th>
                <th className="p-2 border">Study Time</th>
                <th className="p-2 border">LinkedIn</th>
                <th className="p-2 border">Interest</th>
                <th className="p-2 border">Hobbies</th>
                <th className="p-2 border">Education</th>
                <th className="p-2 border">College</th>
                <th className="p-2 border">Semester</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Degree</th>
                <th className="p-2 border">Arrear</th>
                <th className="p-2 border">Accommodation</th>
                <th className="p-2 border">CGPA</th>
                <th className="p-2 border">Certifications</th>
                <th className="p-2 border">Skills</th>
                <th className="p-2 border">Cybersecurity Domain</th>
                <th className="p-2 border">Domain Reason</th>
                <th className="p-2 border">Domain Knowledge</th>
                <th className="p-2 border">Tools Known</th>
                <th className="p-2 border">Admin?</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 text-center border-t">
                  <td className="p-2 border">{p.username}</td>
                  <td className="p-2 border">{p.email}</td>
                  <td className="p-2 border">{p.phone_number || "-"}</td>
                  <td className="p-2 border">{p.state || "-"}</td>
                  <td className="p-2 border">{p.district || "-"}</td>
                  <td className="p-2 border">{p.placement || "-"}</td>
                  <td className="p-2 border">{p.study_time_per_day || "-"}</td>
                  <td className="p-2 border">{p.linkedin_id || "-"}</td>
                  <td className="p-2 border">{p.interest || "-"}</td>
                  <td className="p-2 border">{p.hobbies || "-"}</td>
                  <td className="p-2 border">{p.education || "-"}</td>
                  <td className="p-2 border">{p.college_name || "-"}</td>
                  <td className="p-2 border">{p.semester || "-"}</td>
                  <td className="p-2 border">{p.year_of_passing ?? "-"}</td>
                  <td className="p-2 border">{p.degree || "-"}</td>
                  <td className="p-2 border">{p.current_arrear ? "Yes" : "No"}</td>
                  <td className="p-2 border">{p.accommodation || "-"}</td>
                  <td className="p-2 border">{p.current_cgpa ?? "-"}</td>
                  <td className="p-2 border">{p.certifications || "-"}</td>
                  <td className="p-2 border">{p.other_skills || "-"}</td>
                  <td className="p-2 border">{p.cybersecurity_domain || "-"}</td>
                  <td className="p-2 border">{p.domain_reason || "-"}</td>
                  <td className="p-2 border">{p.domain_knowledge || "-"}</td>
                  <td className="p-2 border">{p.tools_known || "-"}</td>
                  <td className="p-2 border">{p.is_admin ? "✅" : "❌"}</td>
                  <td className="p-2 border">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
