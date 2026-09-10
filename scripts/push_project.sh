#!/usr/bin/env bash
# =============================================================================
#   KOUSHIK DAS - CYBERSECURITY PORTFOLIO AUTO-COMMIT & PUSH ENGINE (BASH)
#   Usage:
#     ./scripts/push_project.sh
#     ./scripts/push_project.sh "Added new CTF writeup"
# =============================================================================

echo -e "\033[0;36m============================================================\033[0m"
echo -e "\033[0;32m [CYBER-DEFENSE AUTOMATION] KOUSHIK DAS PORTFOLIO DEPLOYER \033[0m"
echo -e "\033[0;33m Target GitHub ID: 2koushikdas5\033[0m"
echo -e "\033[0;36m============================================================\033[0m"

# 1. Check Git
if ! command -v git &> /dev/null; then
    echo -e "\033[0;31m[!] Error: git is not installed.\033[0m"
    exit 1
fi

# 2. Init git if needed
if [ ! -d ".git" ]; then
    echo -e "\033[0;33m[*] Initializing local Git repository...\033[0m"
    git init
    git branch -M main
fi

# 3. Check status
if [ -z "$(git status --porcelain)" ]; then
    echo -e "\033[0;36m[i] No new changes or files to commit.\033[0m"
    echo -e "\033[0;32m[i] Working tree is clean.\033[0m"
    exit 0
fi

# 4. Commit message
MSG="$1"
if [ -z "$MSG" ]; then
    MSG="Update security portfolio & projects [$(date '+%Y-%m-%d %H:%M:%S')]"
fi

echo -e "\033[0;33m[*] Staging all files...\033[0m"
git add -A

echo -e "\033[0;33m[*] Committing with message: \"$MSG\"...\033[0m"
git commit -m "$MSG"

# 5. Remote verification
REMOTE=$(git remote get-url origin 2>/dev/null)
if [ -z "$REMOTE" ]; then
    echo ""
    echo -e "\033[0;33m[!] Notice: No remote 'origin' configured.\033[0m"
    echo -e "    Link your GitHub repository with:"
    echo -e "    \033[0;36mgit remote add origin https://github.com/2koushikdas5/My_Portfolio.git\033[0m"
    echo -e "    \033[0;36mgit push -u origin main\033[0m"
    echo ""
    exit 0
fi

BRANCH=$(git branch --show-current)
[ -z "$BRANCH" ] && BRANCH="main"

echo -e "\033[0;33m[*] Pushing to origin $BRANCH...\033[0m"
git push -u origin "$BRANCH"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "\033[0;32m[+] SUCCESS: Changes pushed to GitHub!\033[0m"
    echo -e "    Auto-deploy triggered for: \033[0;36mhttps://2koushikdas5.github.io/My_Portfolio\033[0m"
    echo ""
else
    echo -e "\033[0;31m[!] Push failed. Check your GitHub authentication or permissions.\033[0m"
fi
