"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"personal" | "education" | "skills" | "cybersecurity">("personal");
  const router = useRouter();

  const handleChange = (field: string, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (error && error.code !== "PGRST116") console.error(error.message);
      if (data) {
        if (data.is_admin) router.push("/admin/dashboard");
        else setProfile(data);
      } else {
        setProfile({ id: userData.user.id });
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.from("profiles").upsert([profile]);
    setLoading(false);
    if (error) return alert(error.message);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">Complete Your Profile</h1>

      {/* Section Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["personal", "education", "skills", "cybersecurity"].map((sec) => (
          <button
            key={sec}
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              activeSection === sec
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-green-100"
            }`}
            onClick={() => setActiveSection(sec as any)}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        {activeSection === "personal" && (
          <div className="bg-white shadow-md rounded-xl p-6 text-black">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  text-black">
              <input
                type="text"
                placeholder="Full Name"
                value={profile.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={profile.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={profile.phone_number || ""}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="State"
                value={profile.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="District"
                value={profile.district || ""}
                onChange={(e) => handleChange("district", e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        {/* Education & Placement */}
        {activeSection === "education" && (
          <div className="bg-white shadow-md rounded-xl p-6  text-black">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Education & Placement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="College Name"
                value={profile.college_name || ""}
                onChange={(e) => handleChange("college_name", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Education"
                value={profile.education || ""}
                onChange={(e) => handleChange("education", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Semester"
                value={profile.semester || ""}
                onChange={(e) => handleChange("semester", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Year of Passing"
                value={profile.year_of_passing || ""}
                onChange={(e) => handleChange("year_of_passing", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Degree"
                value={profile.degree || ""}
                onChange={(e) => handleChange("degree", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <select
                value={profile.current_arrear ? "Yes" : "No"}
                onChange={(e) => handleChange("current_arrear", e.target.value === "Yes")}
                className="border p-2 rounded w-full"
              >
                <option value="No">Current Arrear: No</option>
                <option value="Yes">Current Arrear: Yes</option>
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="Current CGPA"
                value={profile.current_cgpa || ""}
                onChange={(e) => handleChange("current_cgpa", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <select
                value={profile.accommodation || ""}
                onChange={(e) => handleChange("accommodation", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Accommodation Mode</option>
                <option value="Hostel">Hostel</option>
                <option value="Day Scholar">Day Scholar</option>
              </select>
              <select
                value={profile.placement || ""}
                onChange={(e) => handleChange("placement", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Placement Status</option>
                <option value="Placed">Placed</option>
                <option value="Not Placed">Not Placed</option>
                <option value="Willing">Willing</option>
              </select>
              <input
                type="text"
                placeholder="Study Time per Day"
                value={profile.study_time_per_day || ""}
                onChange={(e) => handleChange("study_time_per_day", e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        {/* Interests & Skills */}
        {activeSection === "skills" && (
          <div className="bg-white shadow-md rounded-xl p-6  text-black">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Interests & Skills</h2>
            <div className="grid grid-cols-1 gap-4">
              <textarea
                placeholder="Hobbies"
                value={profile.hobbies || ""}
                onChange={(e) => handleChange("hobbies", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Interests"
                value={profile.interest || ""}
                onChange={(e) => handleChange("interest", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Certifications"
                value={profile.certifications || ""}
                onChange={(e) => handleChange("certifications", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Other Skills"
                value={profile.other_skills || ""}
                onChange={(e) => handleChange("other_skills", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="LinkedIn ID"
                value={profile.linkedin_id || ""}
                onChange={(e) => handleChange("linkedin_id", e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        {/* Cybersecurity */}
        {activeSection === "cybersecurity" && (
          <div className="bg-white shadow-md rounded-xl p-6  text-black">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Cybersecurity</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Domain you want to pursue"
                value={profile.cybersecurity_domain || ""}
                onChange={(e) => handleChange("cybersecurity_domain", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Why did you choose this domain?"
                value={profile.domain_reason || ""}
                onChange={(e) => handleChange("domain_reason", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="What do you currently know about this domain?"
                value={profile.domain_knowledge || ""}
                onChange={(e) => handleChange("domain_knowledge", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Tools you know"
                value={profile.tools_known || ""}
                onChange={(e) => handleChange("tools_known", e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700 transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
