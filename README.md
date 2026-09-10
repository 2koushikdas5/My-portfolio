# 🛡️ Koushik Das — Cybersecurity & Ethical Hacking Portfolio

> **High-Performance, Futuristic Cyber Defense & Offensive Security Portfolio with Dynamic GitHub Auto-Sync & Automation.**

Designed specifically for **Koushik Das** (`github.com/2koushikdas5`), featuring a dark cyber terminal aesthetic, live HUD telemetry, interactive cryptographic tools, embedded command shell, and automated GitHub CI/CD workflows.

---

## ⚡ Live Features & Highlights

1. **Cyber HUD & Telemetry Status Bar**:
   - Live DEFCON status, TLS 1.3 protocol indicator, real-time UTC clock, and continuous session uptime counter.
   - Built-in **Web Audio API Cyber Synthesizer** (toggleable futuristic sound feedback on clicks and commands).
   - **CRT Scanline & Flicker Effect Toggle** for authentic retro hacker terminal aesthetics.

2. **Hero Section with Dynamic Typewriter**:
   - Glitch title effect and simulated terminal prompt cycling through cybersecurity domains.
   - Live GitHub repository counter synced directly with the GitHub REST API.
   - Radar HUD target visual with clearance level badges.

3. **Security Dossier (About Me)**:
   - Bio data archive showcasing offensive assessment, defensive hardening, and security automation pillars.
   - Direct links to GitHub alias `2koushikdas5` and specialization domains.

4. **Interactive Security Arsenal (Skills Matrix)**:
   - Categorized and filterable stack: **Offensive / PenTesting**, **Defensive / SOC**, **Security Tools (Nmap, Burp Suite, Metasploit, Wireshark, Splunk)**, and **Scripting (Python, Bash, JavaScript, Cryptography)**.

5. **Dynamic Live GitHub Sync Engine & Curated Labs**:
   - **Zero-Manual-Code Updates**: The site actively queries `https://api.github.com/users/2koushikdas5/repos` live in the browser. Any new repository pushed to your GitHub account instantly appears as an interactive project card with stars, language, description, and link!
   - Features four starter cybersecurity showcase operations:
     - **NetSentry**: Python-based Network Intrusion Detection System & Packet Sniffer.
     - **VulnHunter**: OWASP Top 10 Web Application Vulnerability Scanner.
     - **CryptoVault**: AES-256-GCM Multi-Layer File Encryption Suite.
     - **Forensic Lab**: Malware Memory Dump Analysis & YARA Rule Engine.

6. **Interactive Cyber Terminal (Bash CLI)**:
   - A fully functional embedded terminal simulator with history navigation (`↑`/`↓`), Tab autocomplete, and realistic commands:
     - `help`, `whoami`, `bio`, `skills`, `projects`, `project netsentry`, `nmap 192.168.1.1`, `hash <text>`, `b64 <text>`, `cat flag.txt` (secret CTF flag!), `matrix`, `status`, and `clear`.

7. **In-Browser Security & Cryptography Playground**:
   - **Base64 / Hex Transformer**: Instant encode/decode operations.
   - **Web Crypto API SHA-256 Engine**: Computes real cryptographic hashes in your browser.
   - **Password Entropy & Strength Analyzer**: Real-time entropy bit estimation.

8. **Certifications & CTF Tracker**:
   - CompTIA Security+, CEH, Google Cybersecurity Professional, and TryHackMe / Hack The Box trackers.

9. **Encrypted Transmission Contact Form**:
   - PGP public key fingerprint, encrypted transmission simulation, and direct email dispatch.

---

## 🚀 How Auto-Commit & Instant Project Publishing Works

You asked: *"make a file for this if any project further I push into the website that auto commit by github"*.

This portfolio includes a **triple-layer automated sync system**:

### Layer 1: Real-Time Client-Side GitHub API Sync (Instant, No Re-deploy Needed)
- Whenever you create or push any new repository to your GitHub profile [`2koushikdas5`](https://github.com/2koushikdas5), the portfolio fetches it live from GitHub's REST API.
- **You do NOT even need to edit the website code!** Your new projects automatically show up on the website cards!

### Layer 2: One-Command Local Push Script (`push_project.ps1` & `push_project.sh`)
When you make local changes, add writeups, or edit files on your computer:
- **On Windows (PowerShell)**:
  ```powershell
  # Simply run:
  .\scripts\push_project.ps1 "Added new malware analysis lab"
  ```
  *(If you omit the message, it automatically creates a timestamped commit!)*
- **On Linux / macOS / WSL (Bash)**:
  ```bash
  chmod +x ./scripts/push_project.sh
  ./scripts/push_project.sh "Added new writeup"
  ```
This script automatically:
1. Runs `git add -A`
2. Creates an automated commit
3. Pushes cleanly to your GitHub branch (`main`)

### Layer 3: GitHub Actions CI/CD Auto-Deploy (`.github/workflows/deploy.yml`)
- Every time a push occurs to `main`, GitHub Actions automatically builds and deploys your website to **GitHub Pages** within seconds!

### Layer 4: Scheduled Auto-Commit Sync (`.github/workflows/auto-commit-projects.yml`)
- A background GitHub Actions bot runs periodically (or via manual trigger in the Actions tab) to query your repositories and commit the metadata cache (`data/projects.json`), keeping the repository active and auto-committing project updates on GitHub!

---

## 🌐 Deploying to GitHub Pages (Step-by-Step)

Follow these quick steps to host your portfolio on `https://2koushikdas5.github.io/My-portfolio`:

### Step 1: Initialize Git and Link to GitHub
Open PowerShell inside `C:\Users\KOUSHIK\Desktop\My_Portfolio` and run:

```powershell
# 1. Initialize git
git init
git branch -M main

# 2. Add all portfolio files
git add .
git commit -m "feat: initial release of cybersecurity portfolio"

# 3. Create a repository named "My_Portfolio" on your GitHub account (https://github.com/new)
# Then link it:
git remote add origin https://github.com/2koushikdas5/My-portfolio.git

# 4. Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/2koushikdas5/My-portfolio`
2. Click **Settings** (top navigation).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment > Source**, select **GitHub Actions**.
5. The `.github/workflows/deploy.yml` workflow will automatically run and publish your site!
6. Your live portfolio will be accessible at:
   👉 **`https://2koushikdas5.github.io/My-portfolio`**

---

## 📁 Project Directory Structure

```text
My_Portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml                 # Auto-deploys site to GitHub Pages on every push
│       └── auto-commit-projects.yml   # Auto-syncs repos and commits updates on GitHub
├── css/
│   └── style.css                      # Full cyber-defense cyberpunk stylesheet & animations
├── js/
│   ├── crypto-tools.js                # Base64, Hex, SHA-256 Web Crypto API, Entropy tool
│   ├── terminal.js                    # Interactive bash terminal CLI simulation
│   └── main.js                        # Matrix rain canvas, GitHub sync, sound synth, typewriter
├── scripts/
│   ├── push_project.ps1               # Windows PowerShell 1-command auto-commit & push script
│   └── push_project.sh                # Linux/macOS Bash 1-command auto-commit script
├── index.html                         # Semantic, accessible HTML5 portfolio
└── README.md                          # Complete documentation & setup instructions
```

---

## 🛡️ Customizing Your Information

- **Contact Email**: Search for `koushikdas.cybersec@gmail.com` in `index.html` and replace with your preferred email.
- **Social Handles**: Update LinkedIn and social links in the contact and footer sections of `index.html`.
- **Add New Project Manually**: You can push directly to GitHub (it auto-appears!), or add a static card under the `.curated-projects` container in `index.html`.

---
*Created with security-first architecture for **Koushik Das**.*
