/**
 * KOUSHIK DAS - CYBERSECURITY PORTFOLIO
 * MAIN CORE ENGINE & DYNAMIC GITHUB SYNC
 */

// 1. Web Audio API Cyber Synthesizer
const CyberSound = {
    enabled: false,
    ctx: null,

    init() {
        const toggleBtn = document.getElementById('audio-toggle-btn');
        const icon = document.getElementById('audio-icon');

        toggleBtn?.addEventListener('click', () => {
            this.enabled = !this.enabled;
            if (this.enabled) {
                if (!this.ctx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                }
                toggleBtn.classList.add('active');
                if (icon) icon.className = 'fa-solid fa-volume-high';
                this.play('success');
            } else {
                toggleBtn.classList.remove('active');
                if (icon) icon.className = 'fa-solid fa-volume-xmark';
            }
        });
    },

    play(type = 'beep') {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            if (type === 'beep') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'keystroke') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(450, now);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            } else if (type === 'alert') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        } catch (e) {
            console.error('Audio synthesizer error', e);
        }
    }
};

// 2. Dynamic Matrix Rain Canvas Engine
function initMatrixCanvas() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Katakana, numbers, and cyber hex chars
    const chars = '0123456789ABCDEF01010101XYZΩλπµ<>!@#$%^&*+-=/{}[]';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    let speedMultiplier = 1;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
    });

    function draw() {
        ctx.fillStyle = 'rgba(7, 10, 15, 0.08)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff9d';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Occasional bright highlight character
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#ffffff';
            } else if (Math.random() > 0.85) {
                ctx.fillStyle = '#00e5ff';
            } else {
                ctx.fillStyle = '#00ff9d';
            }

            ctx.fillText(text, x, y);

            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += speedMultiplier;
        }
    }

    let interval = setInterval(draw, 35);

    // Expose boost function for terminal command
    window.boostMatrixRain = () => {
        speedMultiplier = 2.5;
        canvas.style.opacity = '0.35';
        setTimeout(() => {
            speedMultiplier = 1;
            canvas.style.opacity = '0.18';
        }, 8000);
    };
}

// 3. Typewriter Effect in Hero Section
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const phrases = [
        "Ethical Hacker & Pentester Aspirant",
        "Network Defense & SOC Analyst",
        "OWASP Top 10 Web Vulnerability Hunter",
        "Python Security Automation & Scripting",
        "Exploring Cryptography & Memory Forensics",
        "Target: Securing Critical Digital Infrastructures"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// 4. Live Telemetry Clock & Uptime
function initTelemetry() {
    const clockEl = document.getElementById('hud-clock');
    const uptimeEl = document.getElementById('uptime-counter');
    const startTime = Date.now();

    function updateHUD() {
        const now = new Date();
        if (clockEl) {
            clockEl.textContent = now.toUTCString().split(' ')[4] + ' UTC';
        }

        if (uptimeEl) {
            const diff = Math.floor((Date.now() - startTime) / 1000);
            const hrs = Math.floor(diff / 3600);
            const mins = Math.floor((diff % 3600) / 60);
            const secs = diff % 60;
            uptimeEl.textContent = `0d ${hrs}h ${mins}m ${secs}s`;
        }
    }

    setInterval(updateHUD, 1000);
    updateHUD();

    // Scanline CRT button
    const scanlineBtn = document.getElementById('scanline-toggle-btn');
    scanlineBtn?.addEventListener('click', () => {
        document.body.classList.toggle('scanline-effect');
        scanlineBtn.classList.toggle('active');
        CyberSound.play('beep');
    });

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    mobileBtn?.addEventListener('click', () => {
        navMenu?.classList.toggle('show');
    });

    // Close menu when clicking nav link
    navMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
}

// 5. Dynamic GitHub API Sync Engine for 2koushikdas5
const GitHubSyncEngine = {
    username: '2koushikdas5',

    async fetchRepositories() {
        const container = document.getElementById('github-repos-container');
        const repoStat = document.getElementById('stat-repos');
        const refreshBtn = document.getElementById('refresh-repos-btn');

        if (refreshBtn) {
            refreshBtn.querySelector('i').classList.add('fa-spin');
        }

        try {
            const response = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API HTTP ${response.status}`);
            }

            const repos = await response.json();

            if (repoStat) {
                repoStat.textContent = repos.length.toString();
            }

            this.renderRepositories(repos, container);
        } catch (error) {
            console.warn('GitHub API fetch failed or rate limited:', error);
            if (repoStat) {
                repoStat.textContent = 'AUTO-SYNC';
            }
            this.renderFallback(container);
        } finally {
            if (refreshBtn) {
                setTimeout(() => {
                    refreshBtn.querySelector('i').classList.remove('fa-spin');
                }, 500);
            }
        }
    },

    renderRepositories(repos, container) {
        if (!container) return;

        if (!repos || repos.length === 0) {
            container.innerHTML = `
                <div class="repo-loading-card" style="border-color: rgba(0, 229, 255, 0.4);">
                    <i class="fa-brands fa-github" style="font-size: 2.8rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i>
                    <h3 style="color: #fff; font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">
                        GitHub Profile Connected: <span class="text-cyan">@${this.username}</span>
                    </h3>
                    <p style="color: var(--text-secondary); max-width: 650px; margin: 0 auto 1.5rem; font-size: 0.9rem; line-height: 1.6;">
                        The Live GitHub Sync Engine is actively listening to your account. As soon as you push your first repository to GitHub, it will instantly render here in real time!
                    </p>
                    <a href="https://github.com/${this.username}?tab=repositories" target="_blank" class="cyber-btn cyber-btn-primary" style="display: inline-flex;">
                        <i class="fa-solid fa-plus"></i> View / Create Repositories on GitHub
                    </a>
                </div>
            `;
            return;
        }

        container.innerHTML = '';

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const stars = repo.stargazers_count || 0;
            const forks = repo.forks_count || 0;
            const lang = repo.language || 'CyberSec / Code';
            const desc = repo.description || 'Cybersecurity repository research and source code implementation.';
            const updated = new Date(repo.updated_at).toLocaleDateString();

            card.innerHTML = `
                <div class="project-banner banner-green">
                    <span class="sec-badge"><i class="fa-brands fa-github"></i> GITHUB REPO</span>
                    <span class="vuln-severity low">SYNCED: ${updated}</span>
                </div>
                <div class="project-body">
                    <h3 class="project-title">${this.escapeHTML(repo.name)}</h3>
                    <p class="project-desc">${this.escapeHTML(desc)}</p>
                    <div class="project-tags">
                        <span><i class="fa-solid fa-code"></i> ${lang}</span>
                        <span><i class="fa-solid fa-star text-amber"></i> ${stars}</span>
                        <span><i class="fa-solid fa-code-fork"></i> ${forks}</span>
                    </div>
                    <div class="project-footer">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="proj-link">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> Inspect Code
                        </a>
                        <button class="proj-action-btn" onclick="CyberTerminal.quickExec('whoami')">
                            <i class="fa-solid fa-terminal"></i> Terminal
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    renderFallback(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="repo-loading-card">
                <i class="fa-brands fa-github" style="font-size: 2.5rem; color: var(--accent-green); margin-bottom: 1rem;"></i>
                <h3 style="color: #fff; font-family: var(--font-heading); margin-bottom: 0.5rem;">
                    Target GitHub Account: @${this.username}
                </h3>
                <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 1.2rem; font-size: 0.88rem;">
                    Sync active. Check out curated cybersecurity operations below or visit GitHub directly.
                </p>
                <a href="https://github.com/${this.username}" target="_blank" class="cyber-btn cyber-btn-secondary" style="display: inline-flex;">
                    <i class="fa-brands fa-github"></i> Open GitHub Profile
                </a>
            </div>
        `;
    },

    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

// 6. Skill Category Filtering
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab-btn');
    const cards = document.querySelectorAll('.skill-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            CyberSound.play('beep');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Boot everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    CyberSound.init();
    initMatrixCanvas();
    initTypewriter();
    initTelemetry();
    initSkillTabs();

    // Initial GitHub Repository Fetch
    GitHubSyncEngine.fetchRepositories();

    // Refresh button event
    document.getElementById('refresh-repos-btn')?.addEventListener('click', () => {
        CyberSound.play('beep');
        GitHubSyncEngine.fetchRepositories();
    });
});
