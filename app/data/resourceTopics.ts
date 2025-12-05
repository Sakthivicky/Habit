export  const resourceTopics = [
  {
    id: "cybersecurity_basics",
    title: "CYBERSECURITY BASICS",
    subtopics: [
      {
        id: "what-is-a-computer",
        title: "What is a computer? (CPU, RAM, Storage, OS)",
        content: "computer is",
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
{
  id: "information-gathering",
  title: "Information Gathering",
  content: `
Information Gathering (Reconnaissance) is the first step in web application hacking. 
It means collecting as much information as possible about a target website before doing any attack or security testing.

-------------------------
📌 1. What is Information Gathering (Web Application)?
-------------------------

It is the process of discovering everything about a website, such as:
- Who owns the website
- IP address
- Server details
- Subdomains
- Technologies used (PHP, Node.js, React, WordPress)
- Open ports and services
- Public data about employees or the company
- API endpoints
- Login pages, admin panels, hidden pages
- DNS information

👀 Simple example:
Like checking the outside of a house (doors, windows, cameras) before trying to enter.
You are not attacking — only observing.

Image placeholder:
![Information Gathering Meme](/memes/info_gathering.png)

-------------------------
📌 2. Why do hackers need this information?
-------------------------

Hackers gather information because:
- They need to understand how the web app works.
- They want to find weak points.
- They use public information to plan attacks.
- They identify technologies and versions that may have known vulnerabilities.
- They want entry points like:
  • Login pages  
  • API endpoints  
  • Upload pages  
  • Admin panels  
  • Old forgotten subdomains  

The better the information gathered, the easier the attack becomes.

Image placeholder:
![Hacker Recon Meme](/memes/recon_meme.png)

-------------------------
📌 3. Impact of Information Gathering
-------------------------

If a hacker gathers good information, they can:
- Discover weak technologies (old PHP/WordPress versions)
- Find hidden pages or admin panels
- Identify open ports that should not be public
- Collect employee emails for phishing
- Learn about cloud services used (AWS, Azure)
- Find misconfigured DNS records
- Track internal IP leaks in JavaScript files
- Map the entire attack surface

In real attacks, most damage happens because:
"Hackers know more about your system than you do."

Image placeholder:
![Impact Meme](/memes/impact.png)

-------------------------
📌 4. How to reduce risks (Solutions)
-------------------------

Organizations can protect themselves by limiting public information:

1. Hide unnecessary information  
   - Remove unused subdomains  
   - Hide sensitive directories  
   - Do not expose development endpoints  

2. Update technologies  
   - Use latest versions of server software, frameworks, CMS  
   - Remove old backup files like /backup.zip, /test.php  

3. Secure DNS and server configurations  
   - Remove old DNS records  
   - Do not expose internal IPs or debug information  

4. Remove sensitive data from public files  
   - Avoid pushing API keys or secrets to GitHub  
   - Clean comments in HTML/JavaScript  

5. Rate-limit and monitor  
   - Use WAF (Web Application Firewall)  
   - Track suspicious scanning or crawling  

6. Employee awareness  
   - Do not post too much technical detail on LinkedIn  
   - Avoid leaking configuration screenshots  

Image placeholder:
![Solution Meme](/memes/solution.png)

-------------------------
In simple words:
Information Gathering allows hackers to understand your system.
Reducing public information helps you stay secure before attacks begin.
`,
},

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