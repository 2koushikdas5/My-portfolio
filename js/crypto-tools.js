/**
 * KOUSHIK DAS - CYBERSECURITY PORTFOLIO
 * CRYPTOGRAPHY & UTILITY LAB ENGINE
 */

const CyberCrypto = {
    // Initialize event listeners
    init() {
        this.bindEvents();
        this.computeDefaultHash();
    },

    bindEvents() {
        const rawInput = document.getElementById('tool-input-text');
        const outputBox = document.getElementById('tool-output-text');
        const hashInput = document.getElementById('hash-input-text');

        // Base64 Encode
        document.getElementById('btn-b64-encode')?.addEventListener('click', () => {
            if (!rawInput.value) return;
            try {
                outputBox.value = btoa(unescape(encodeURIComponent(rawInput.value)));
                CyberSound.play('beep');
            } catch (err) {
                outputBox.value = `[!] Encoding Error: ${err.message}`;
            }
        });

        // Base64 Decode
        document.getElementById('btn-b64-decode')?.addEventListener('click', () => {
            if (!rawInput.value) return;
            try {
                outputBox.value = decodeURIComponent(escape(atob(rawInput.value.trim())));
                CyberSound.play('beep');
            } catch (err) {
                outputBox.value = `[!] Base64 Decode Error: Invalid base64 sequence`;
            }
        });

        // To Hex
        document.getElementById('btn-hex-encode')?.addEventListener('click', () => {
            if (!rawInput.value) return;
            const str = rawInput.value;
            let hex = '';
            for (let i = 0; i < str.length; i++) {
                hex += str.charCodeAt(i).toString(16).padStart(2, '0') + ' ';
            }
            outputBox.value = hex.trim().toUpperCase();
            CyberSound.play('beep');
        });

        // From Hex
        document.getElementById('btn-hex-decode')?.addEventListener('click', () => {
            if (!rawInput.value) return;
            try {
                const cleanHex = rawInput.value.replace(/\s+/g, '');
                let str = '';
                for (let i = 0; i < cleanHex.length; i += 2) {
                    str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
                }
                outputBox.value = str;
                CyberSound.play('beep');
            } catch (err) {
                outputBox.value = `[!] Hex Decode Error: Invalid hexadecimal sequence`;
            }
        });

        // Copy Transformed Output
        document.getElementById('btn-copy-transform')?.addEventListener('click', () => {
            if (!outputBox.value) return;
            navigator.clipboard.writeText(outputBox.value).then(() => {
                const btn = document.getElementById('btn-copy-transform');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied to Clipboard!';
                CyberSound.play('success');
                setTimeout(() => btn.innerHTML = originalText, 2000);
            });
        });

        // Real-time SHA-256 Hash & Entropy calculation
        if (hashInput) {
            hashInput.addEventListener('input', () => {
                this.updateHashAndEntropy(hashInput.value);
            });
        }

        // Copy Hash
        document.getElementById('btn-copy-hash')?.addEventListener('click', () => {
            const hashBox = document.getElementById('hash-result');
            if (!hashBox) return;
            navigator.clipboard.writeText(hashBox.innerText.trim()).then(() => {
                const btn = document.getElementById('btn-copy-hash');
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Hash Copied!';
                CyberSound.play('success');
                setTimeout(() => btn.innerHTML = original, 2000);
            });
        });
    },

    async computeSHA256(message) {
        if (!message) return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    calculateEntropy(str) {
        if (!str) return { score: 0, label: 'EMPTY', color: '#ff3366', percent: 0 };
        let poolSize = 0;
        if (/[a-z]/.test(str)) poolSize += 26;
        if (/[A-Z]/.test(str)) poolSize += 26;
        if (/[0-9]/.test(str)) poolSize += 10;
        if (/[^a-zA-Z0-9]/.test(str)) poolSize += 33;

        const entropy = str.length * (poolSize > 0 ? Math.log2(poolSize) : 0);

        if (entropy < 30) {
            return { score: entropy, label: 'VERY WEAK', color: '#ff3366', percent: 20 };
        } else if (entropy < 50) {
            return { score: entropy, label: 'MODERATE', color: '#ffb800', percent: 50 };
        } else if (entropy < 75) {
            return { score: entropy, label: 'STRONG', color: '#00e5ff', percent: 80 };
        } else {
            return { score: entropy, label: 'VERY HIGH / SECURE', color: '#00ff9d', percent: 100 };
        }
    },

    async updateHashAndEntropy(val) {
        const hashBox = document.getElementById('hash-result');
        const entropyScore = document.getElementById('entropy-score');
        const entropyFill = document.getElementById('entropy-fill');

        if (hashBox) {
            const hash = await this.computeSHA256(val);
            hashBox.innerText = hash;
        }

        if (entropyScore && entropyFill) {
            const result = this.calculateEntropy(val);
            entropyScore.innerText = result.label;
            entropyScore.style.color = result.color;
            entropyFill.style.width = `${result.percent}%`;
            entropyFill.style.background = result.color;
        }
    },

    computeDefaultHash() {
        const hashInput = document.getElementById('hash-input-text');
        if (hashInput) {
            this.updateHashAndEntropy(hashInput.value);
        }
    }
};

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => CyberCrypto.init());
