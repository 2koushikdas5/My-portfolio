/**
 * KOUSHIK DAS - CYBERSECURITY PORTFOLIO
 * INTERACTIVE CLI TERMINAL ENGINE
 */

const CyberTerminal = {
    history: [],
    historyIndex: -1,
    commands: [
        'help', 'whoami', 'bio', 'skills', 'projects', 'project',
        'nmap', 'hash', 'b64', 'cat flag.txt', 'matrix', 'clear',
        'sudo', 'contact', 'github', 'status'
    ],

    init() {
        this.inputEl = document.getElementById('terminal-input');
        this.outputEl = document.getElementById('terminal-output');
        this.clearBtn = document.getElementById('terminal-clear-btn');
        this.helpBtn = document.getElementById('terminal-help-btn');

        if (!this.inputEl || !this.outputEl) return;

        this.inputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.clearBtn?.addEventListener('click', () => this.clear());
        this.helpBtn?.addEventListener('click', () => this.executeCommand('help'));
    },

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            const rawCmd = this.inputEl.value.trim();
            if (rawCmd) {
                this.history.push(rawCmd);
                this.historyIndex = this.history.length;
                this.executeCommand(rawCmd);
            }
            this.inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.inputEl.value = this.history[this.historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.inputEl.value = this.history[this.historyIndex] || '';
            } else {
                this.historyIndex = this.history.length;
                this.inputEl.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.handleTabComplete();
        }
    },

    handleTabComplete() {
        const val = this.inputEl.value.trim().toLowerCase();
        if (!val) return;
        const match = this.commands.find(c => c.startsWith(val));
        if (match) {
            this.inputEl.value = match;
        }
    },

    quickExec(cmd) {
        const termSection = document.getElementById('terminal-section');
        if (termSection) {
            termSection.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
            this.executeCommand(cmd);
            if (this.inputEl) this.inputEl.focus();
        }, 300);
    },

    printLine(text, className = 'terminal-line') {
        const line = document.createElement('div');
        line.className = className;
        line.innerHTML = text;
        this.outputEl.appendChild(line);
        this.outputEl.scrollTop = this.outputEl.scrollHeight;
    },

    clear() {
        this.outputEl.innerHTML = `
            <div class="terminal-banner">
                <p class="terminal-welcome">Terminal cleared. Ready for input. Type <span class="cmd-highlight">help</span> for commands.</p>
            </div>
        `;
    },

    async executeCommand(rawInput) {
        CyberSound.play('keystroke');
        const clean = rawInput.trim();
        const parts = clean.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        // Echo the entered command
        this.printLine(`<span class="prompt-user">koushik@sec-node</span>:<span class="prompt-path">~</span>$ <span class="terminal-cmd-echo">${clean}</span>`);

        switch (cmd) {
            case 'help':
                this.printLine(`
<span class="cmd-highlight">AVAILABLE SECURITY PROTOCOLS & COMMANDS:</span>
  <span class="text-green">whoami</span>       - Display operator identity & security clearance
  <span class="text-green">bio</span>          - Personnel dossier and background summary
  <span class="text-green">skills</span>       - List offensive, defensive, and scripting competencies
  <span class="text-green">projects</span>     - Display security operations & active repositories
  <span class="text-green">project &lt;id&gt;</span> - Deep-dive into a specific project (netsentry, vulnhunter, cryptovault)
  <span class="text-green">nmap [host]</span>  - Run simulated network vulnerability port scan
  <span class="text-green">hash &lt;str&gt;</span>   - Generate live SHA-256 hash
  <span class="text-green">b64 &lt;str&gt;</span>    - Encode string into Base64 format
  <span class="text-green">cat flag.txt</span> - Probe for CTF challenge flag
  <span class="text-green">matrix</span>       - Toggle matrix cyber rain stream speed
  <span class="text-green">contact</span>      - Communication channels & public PGP key
  <span class="text-green">github</span>       - Open GitHub profile [2koushikdas5]
  <span class="text-green">status</span>       - Check node telemetry and DEFCON state
  <span class="text-green">clear</span>        - Flush terminal buffer
                `);
                break;

            case 'whoami':
                this.printLine(`
[+] OPERATOR: <strong>Koushik Das</strong>
[+] DESIGNATION: Cybersecurity Student / Security Researcher
[+] CLEARANCE: Level 4 Cyber Defense Specialist
[+] GITHUB: <a href="https://github.com/2koushikdas5" target="_blank" class="text-cyan">@2koushikdas5</a>
[+] SPECIALIZATION: Web Application Security, Network PenTesting, SOC Analysis
                `);
                break;

            case 'bio':
            case 'about':
                this.printLine(`
[+] DOSSIER BRIEFING:
    Koushik Das is a cybersecurity enthusiast and student dedicated to
    identifying vulnerabilities, understanding attack lifecycles, and hardening
    modern network environments. Focused on both Red Team methodologies
    (OWASP, reconnaissance, exploit scripting) and Blue Team posture
    (SIEM telemetry, incident response, packet capture forensics).
                `);
                break;

            case 'skills':
                this.printLine(`
<span class="text-green">[ OFFENSIVE SECURITY ]</span>
  - Web Pentesting (OWASP Top 10, SQLi, XSS, CSRF, IDOR)
  - Reconnaissance, Service Enumeration, Port Exploitation
  - Burp Suite, Nmap, Metasploit, Gobuster, SQLMap

<span class="text-cyan">[ DEFENSIVE & SOC ]</span>
  - Packet Inspection (Wireshark, TCPDump, PCAP triage)
  - Linux Hardening, iptables, UFW, PAM, SSH security
  - SIEM Log Aggregation & Incident Detection (Splunk, Wazuh)

<span class="text-amber">[ SCRIPTING & DEV ]</span>
  - Python (Network sockets, Scapy, automation scripts)
  - Bash / Shell scripting, PowerShell automation
  - Cryptography: AES-256, RSA, SHA-256, PKI
                `);
                break;

            case 'projects':
                this.printLine(`
[+] CURRENT SECURITY REPOSITORIES & LABS:
  1. <span class="text-cyan">NetSentry</span>     - Python-based Automated Network IDS & Packet Sniffer
  2. <span class="text-cyan">VulnHunter</span>    - OWASP Top 10 Automated CLI Web Vulnerability Scanner
  3. <span class="text-cyan">CryptoVault</span>   - Multi-Layer File Encryption Suite using AES-256-GCM
  4. <span class="text-cyan">Forensics Lab</span> - Sandbox Malware Behavior & Memory Dump Analysis

Tip: Type <span class="cmd-highlight">project netsentry</span> or <span class="cmd-highlight">project vulnhunter</span> for details!
                `);
                break;

            case 'project':
                const targetProj = args.toLowerCase();
                if (targetProj.includes('netsentry')) {
                    this.printLine(`
<span class="text-green">[ PROJECT INTEL: NETSENTRY ]</span>
Type: Network Intrusion Detection System
Stack: Python, Scapy, Raw Sockets, PCAP
Summary: Real-time network monitor capturing promiscuous packets, detecting SYN floods, ARP cache poisoning, and ICMP flood attacks.
Repository: <a href="https://github.com/2koushikdas5" target="_blank" class="text-cyan">github.com/2koushikdas5</a>
                    `);
                } else if (targetProj.includes('vulnhunter')) {
                    this.printLine(`
<span class="text-green">[ PROJECT INTEL: VULNHUNTER ]</span>
Type: Web Application Security Scanner
Stack: Python, Requests, BeautifulSoup, AsyncIO
Summary: Crawls web targets to detect SQL injections, XSS payloads, missing security headers (HSTS, CSP), and sensitive exposed files (.git, .env).
Repository: <a href="https://github.com/2koushikdas5" target="_blank" class="text-cyan">github.com/2koushikdas5</a>
                    `);
                } else if (targetProj.includes('cryptovault')) {
                    this.printLine(`
<span class="text-green">[ PROJECT INTEL: CRYPTOVAULT ]</span>
Type: Zero-Knowledge File Encryption Utility
Stack: Python, Cryptography, PBKDF2, SHA-256
Summary: Military-grade file encryption tool implementing authenticated AES-256-GCM mode with password stretching and tamper detection.
                    `);
                } else {
                    this.printLine(`[!] Unknown project specifier. Available: netsentry, vulnhunter, cryptovault, forensics`);
                }
                break;

            case 'nmap':
                const host = args || '127.0.0.1';
                this.printLine(`Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().slice(0, 19)} UTC`);
                this.printLine(`Nmap scan report for target <span class="text-cyan">${host}</span>`);
                this.printLine(`Host is up (0.00042s latency).`);
                this.printLine(`Not shown: 996 closed ports`);
                this.printLine(`
<span class="cmd-highlight">PORT      STATE  SERVICE       VERSION</span>
22/tcp    open   ssh           OpenSSH 8.9p1 Ubuntu
80/tcp    open   http          nginx 1.24.0 (Portfolio Node)
443/tcp   open   ssl/https     nginx 1.24.0 (TLS 1.3 Strict)
8080/tcp  open   http-proxy    SecProxy v1.4
                `);
                this.printLine(`Nmap done: 1 IP address (1 host up) scanned in 0.88 seconds`);
                break;

            case 'hash':
                if (!args) {
                    this.printLine(`Usage: hash &lt;string_to_hash&gt;`);
                    return;
                }
                const hashed = await CyberCrypto.computeSHA256(args);
                this.printLine(`[+] INPUT: "${args}"`);
                this.printLine(`[+] SHA-256: <span class="text-green">${hashed}</span>`);
                break;

            case 'b64':
                if (!args) {
                    this.printLine(`Usage: b64 &lt;string&gt;`);
                    return;
                }
                try {
                    const encoded = btoa(unescape(encodeURIComponent(args)));
                    this.printLine(`[+] BASE64: <span class="text-cyan">${encoded}</span>`);
                } catch (e) {
                    this.printLine(`[!] Encoding error: ${e.message}`);
                }
                break;

            case 'cat':
                if (args === 'flag.txt' || args === 'flag') {
                    CyberSound.play('success');
                    this.printLine(`
<span class="text-green">=====================================================</span>
   FLAG FOUND! [CTF CHALLENGE ACCOMPLISHED]
   <strong class="text-cyan">CTF{k0ush1k_cYb3r_s3cur1ty_m4st3r_2026}</strong>
<span class="text-green">=====================================================</span>
Congratulations operator, you have inquisitive security intuition!
                    `);
                } else {
                    this.printLine(`cat: ${args}: No such file or directory`);
                }
                break;

            case 'matrix':
                window.boostMatrixRain?.();
                this.printLine(`[+] Matrix stream frequency boosted! Matrix rain cycle updated.`);
                break;

            case 'sudo':
                CyberSound.play('alert');
                this.printLine(`
<span class="text-red">[!] SECURITY ALERT:</span>
koushik is not in the sudoers file.
This incident has been logged and forwarded to root security daemon.
                `);
                break;

            case 'contact':
                this.printLine(`
[+] INITIATING COMM CHANNELS:
  Email: <a href="mailto:koushikdas.cybersec@gmail.com" class="text-cyan">koushikdas.cybersec@gmail.com</a>
  GitHub: <a href="https://github.com/2koushikdas5" target="_blank" class="text-green">github.com/2koushikdas5</a>
  PGP Key ID: 0x2K9D2026 (Fingerprint: 9B4F 3A21 C78E D012 449A 55BC 10F8 62A3 2K9D 2026)
                `);
                break;

            case 'github':
                this.printLine(`[+] Redirecting to GitHub target: <a href="https://github.com/2koushikdas5" target="_blank" class="text-green">https://github.com/2koushikdas5</a>`);
                window.open('https://github.com/2koushikdas5', '_blank');
                break;

            case 'status':
                this.printLine(`
[+] TELEMETRY REPORT:
  DEFCON STATE: <span class="text-green">DEFCON 3 (ALL SYSTEMS NORMAL)</span>
  FIREWALL: <span class="text-green">ACTIVE (UFW / IPTABLES STRICT)</span>
  ENCRYPTION CIPHER: <span class="text-cyan">TLS_AES_256_GCM_SHA384</span>
  REPOSITORIES: Auto-Sync Engine Active
                `);
                break;

            case 'clear':
                this.clear();
                break;

            default:
                this.printLine(`bash: command not found: <span class="text-red">${cmd}</span>. Type <span class="cmd-highlight">help</span> for valid operations.`);
                break;
        }
    },

    handleContactSubmit() {
        const name = document.getElementById('sender-name')?.value;
        const email = document.getElementById('sender-email')?.value;
        const subject = document.getElementById('sender-subject')?.value;
        const message = document.getElementById('sender-message')?.value;
        const encrypted = document.getElementById('encrypt-payload')?.checked;
        const feedback = document.getElementById('contact-feedback');

        if (!feedback) return;

        CyberSound.play('success');

        feedback.className = 'form-feedback success';
        feedback.innerHTML = `
            <i class="fa-solid fa-circle-check"></i> TRANSMISSION CONFIRMED!<br>
            Payload from <strong>${name}</strong> (${email}) encrypted with ${encrypted ? 'AES-256' : 'Standard Transport'}.<br>
            Preparing comm handshake with Koushik Das...
        `;

        // Also trigger mailto link as convenience fallback
        const mailtoLink = `mailto:koushikdas.cybersec@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1200);
    }
};

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => CyberTerminal.init());
