"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState<"resources" | "labs" | "checklist">("resources");
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      else setUser(data.user);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  // ---------------- RESOURCE TOPICS + SUBTOPICS ----------------
 const resourceTopics = [
  {
    id: "cybersecurity_basics",
    title: "CYBERSECURITY BASICS",
    subtopics: [
      {
        id: "what-is-a-computer",
        title: "What is a computer? (CPU, RAM, Storage, OS)",
        content: "",
      },
      { id: "basic-files-folders", title: "Basic files/folders", content: "" },
      { id: "how-apps-run", title: "How apps run", content: "" },
      { id: "what-is-a-website", title: "What is a website?", content: "" },
      { id: "what-is-a-server", title: "What is a server?", content: "" },
      { id: "what-is-a-browser", title: "What is a browser?", content: "" },
      { id: "what-is-a-url", title: "What is a URL?", content: "" },
      { id: "what-is-an-ip-address", title: "What is an IP address?", content: "" },
      { id: "what-is-dns", title: "What is DNS?", content: "" },
      { id: "what-is-network", title: "What is a network?", content: "" },
      { id: "what-is-router", title: "What is a router?", content: "" },
      { id: "lan-vs-wan", title: "LAN vs WAN", content: "" },
      { id: "http-vs-https", title: "HTTP vs HTTPS", content: "" },
      { id: "public-ip-vs-private-ip", title: "Public IP vs Private IP", content: "" },
      { id: "what-is-threat", title: "What is a threat?", content: "" },
      { id: "what-is-vulnerability", title: "What is a vulnerability?", content: "" },
      { id: "what-is-attack", title: "What is an attack?", content: "" },
      { id: "what-is-data-breach", title: "What is a data breach?", content: "" },
      { id: "phishing", title: "Phishing", content: "" },
      { id: "malware", title: "Malware", content: "" },
      { id: "password-hygiene", title: "Password hygiene", content: "" },
      { id: "mfa", title: "MFA", content: "" },
      { id: "why-hacking-works", title: "Why hacking works", content: "" },
      { id: "virustotal", title: "VirusTotal", content: "" },
      { id: "haveibeenpwned", title: "HaveIBeenPwned", content: "" },
      { id: "browser-devtools", title: "Browser DevTools (viewing only)", content: "" },
    ],
  },

  {
    id: "tech_foundations",
    title: "TECH FOUNDATIONS",
    subtopics: [
      { id: "ip-ports-tcp-udp", title: "IP, Ports, TCP/UDP", content: "" },
      { id: "http-methods", title: "HTTP methods", content: "" },
      { id: "request-response", title: "Request–response", content: "" },
      { id: "cookies", title: "Cookies", content: "" },
      { id: "sessions", title: "Sessions", content: "" },
      { id: "dns-lookup", title: "DNS lookup", content: "" },
      { id: "subnet-basics", title: "Subnet basics", content: "" },
      { id: "linux-terminal", title: "Linux Terminal", content: "" },
      { id: "linux-commands", title: "Basic Linux Commands", content: "" },
      { id: "file-permissions", title: "File permissions", content: "" },
      { id: "installing-packages", title: "Installing packages", content: "" },
      {
        id: "programming-basics",
        title: "Programming basics (Variables, Loops, Conditions)",
        content: "",
      },
      { id: "python-basics", title: "Python basics", content: "" },
    ],
  },

  {
    id: "web_application_basics",
    title: "WEB APPLICATION BASICS",
    subtopics: [
      { id: "frontend", title: "Frontend (HTML, CSS, JS)", content: "" },
      { id: "backend", title: "Backend (API, DB)", content: "" },
      { id: "databases", title: "Databases (SQL, NoSQL)", content: "" },
      { id: "authentication", title: "Authentication", content: "" },
      { id: "cookies-sessions", title: "Cookies & sessions", content: "" },
      { id: "forms-input", title: "Forms & input fields", content: "" },
      { id: "build-login-form", title: "Build simple login form", content: "" },
      { id: "understanding-user-flow", title: "Understanding user flow", content: "" },
    ],
  },

  {
    id: "intro_to_ethical_hacking",
    title: "INTRO TO ETHICAL HACKING",
    subtopics: [
      { id: "burp-suite", title: "Burp Suite", content: "" },
      { id: "nmap", title: "Nmap", content: "" },
      { id: "dirsearch-ffuf", title: "Dirsearch / ffuf", content: "" },
      { id: "whatwaf", title: "WhatWaf", content: "" },
      { id: "wappalyzer", title: "Wappalyzer", content: "" },
      { id: "dvwa", title: "DVWA", content: "" },
      { id: "bwapp", title: "bWAPP", content: "" },
      { id: "juice-shop", title: "OWASP Juice Shop", content: "" },
    ],
  },

  {
    id: "web_vapt_foundations",
    title: "WEB VAPT FOUNDATIONS",
    subtopics: [
      { id: "information-gathering", title: "Information Gathering", content: "" },
      { id: "scanning", title: "Scanning", content: "" },
      { id: "auth-testing", title: "Authentication testing", content: "" },
      { id: "session-testing", title: "Session testing", content: "" },
      { id: "authorization-testing", title: "Authorization testing (IDOR)", content: "" },
      { id: "sql-injection", title: "SQL Injection", content: "" },
      { id: "xss", title: "XSS", content: "" },
      { id: "command-injection", title: "Command Injection", content: "" },
      { id: "csrf", title: "CSRF", content: "" },
      { id: "file-upload", title: "File Upload attacks", content: "" },
      { id: "ssrf", title: "SSRF", content: "" },
      { id: "checklist-learning", title: "Checklist-based learning", content: "" },
      { id: "attack-workflow", title: "Step-by-step attack workflow", content: "" },
      { id: "fixing-vulnerabilities", title: "How to fix vulnerabilities", content: "" },
    ],
  },

  {
    id: "advanced_web_vapt",
    title: "ADVANCED WEB VAPT",
    subtopics: [
      { id: "advanced-idor", title: "Advanced IDOR", content: "" },
      { id: "bola", title: "BOLA", content: "" },
      { id: "role-bypass", title: "Role bypass", content: "" },
      { id: "force-browsing", title: "Force browsing", content: "" },
      {
        id: "api-hacking",
        title: "API Hacking: Broken auth, Mass assignment, EDE",
        content: "",
      },
      { id: "ssti", title: "SSTI", content: "" },
      { id: "advanced-ssrf", title: "Advanced SSRF", content: "" },
      { id: "race-conditions", title: "Race conditions", content: "" },
      { id: "jwt-attacks", title: "JWT attacks", content: "" },
      { id: "oauth-vulnerabilities", title: "OAuth vulnerabilities", content: "" },
      { id: "host-header-injection", title: "Host header injection", content: "" },
      { id: "cache-poisoning", title: "Cache poisoning", content: "" },
    ],
  },
];



  // ---------------- LABS ----------------
  const labs = [
    { name: "PortSwigger Academy", info: "Beginner ➝ Advanced practical labs" },
    { name: "DVWA", info: "Beginner-level vulnerable web app" },
    { name: "bWAPP", info: "Hundreds of OWASP vulnerability labs" },
    { name: "OWASP Juice Shop", info: "Realistic e-commerce security testing" },
    { name: "TryHackMe Web Path", info: "Guided learning for web hacking" },
  ];

  // ---------------- CHECKLIST ----------------
  const checklist = {
    beginner: [
      "Understand HTTP Basics",
      "Know GET/POST methods",
      "Use browser DevTools",
      "Basic Linux usage",
    ],
    intermediate: [
      "Find basic XSS",
      "SQL Injection in DVWA",
      "Understand sessions & cookies",
      "Simple recon tools",
    ],
    advanced: [
      "IDOR exploitation",
      "CSRF basics",
      "JWT hacking basics",
      "SSRF introduction",
    ],
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside className="w-60 bg-slate-900 border-r border-slate-700 p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Web VAPT</h2>

        <button
          onClick={() => {
            setActive("resources");
            setSelectedTopic(null);
          }}
          className={`text-left px-3 py-2 mb-2 rounded ${
            active === "resources" ? "bg-emerald-500 text-black" : "hover:bg-slate-800"
          }`}
        >
          Resources
        </button>

        <button
          onClick={() => {
            setActive("labs");
            setSelectedTopic(null);
          }}
          className={`text-left px-3 py-2 mb-2 rounded ${
            active === "labs" ? "bg-emerald-500 text-black" : "hover:bg-slate-800"
          }`}
        >
          Labs
        </button>

        <button
          onClick={() => {
            setActive("checklist");
            setSelectedTopic(null);
          }}
          className={`text-left px-3 py-2 mb-2 rounded ${
            active === "checklist" ? "bg-emerald-500 text-black" : "hover:bg-slate-800"
          }`}
        >
          Checklist
        </button>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="bg-red-500 w-full py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ---------------- RIGHT CONTENT ---------------- */}
      <main className="flex-1 p-8">

        {/* ---------------- RESOURCES SECTION ---------------- */}
        {active === "resources" && (
          <div>
            {!selectedTopic && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Resources</h2>
                <p className="text-slate-400 mb-6">Select a topic to begin learning.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {resourceTopics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className="bg-slate-900 p-5 rounded-lg border border-slate-700 hover:border-emerald-400 transition cursor-pointer"
                    >
                      <h3 className="text-lg font-bold">{topic.title}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTopic && (
              <>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="mb-4 text-emerald-400 underline"
                >
                  ← Back to Resources
                </button>

                <h2 className="text-2xl font-semibold mb-4">{selectedTopic.title}</h2>

                <div className="grid sm:grid-cols-2 gap-4">
  {selectedTopic.subtopics.map((sub: any) => (
    <div
      key={sub.id}
      onClick={() => router.push(`/resources/${selectedTopic.id}/${sub.id}`)}
      className="bg-slate-900 p-4 rounded-lg border border-slate-700 cursor-pointer hover:border-emerald-400"
    >
      <p className="text-sm text-slate-300">{sub.title}</p>
    </div>
  ))}
</div>

              </>
            )}
          </div>
        )}

        {/* ---------------- LABS SECTION ---------------- */}
        {active === "labs" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Practice Labs</h2>
            <p className="text-slate-400 mb-6">
              Do these labs to build strong practical skills.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {labs.map((lab) => (
                <div
                  key={lab.name}
                  className="bg-slate-900 p-5 rounded-lg border border-slate-700"
                >
                  <h3 className="text-lg font-bold">{lab.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{lab.info}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- CHECKLIST SECTION ---------------- */}
        {active === "checklist" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Skill Checklist</h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-5 rounded-lg border border-blue-500">
                <h3 className="text-lg font-bold mb-2">Beginner</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  {checklist.beginner.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 p-5 rounded-lg border border-yellow-400">
                <h3 className="text-lg font-bold mb-2">Intermediate</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  {checklist.intermediate.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 p-5 rounded-lg border border-green-500">
                <h3 className="text-lg font-bold mb-2">Advanced</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  {checklist.advanced.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
