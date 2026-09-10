<#
=============================================================================
  KOUSHIK DAS - CYBERSECURITY PORTFOLIO AUTO-COMMIT & PUSH ENGINE
  Usage:
    .\scripts\push_project.ps1
    .\scripts\push_project.ps1 "Added new CTF writeup and project"
=============================================================================
#>

param (
    [string]$CommitMessage = ""
)

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " [CYBER-DEFENSE AUTOMATION] KOUSHIK DAS PORTFOLIO DEPLOYER " -ForegroundColor Green
Write-Host " Target GitHub ID: 2koushikdas5" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verify Git installation
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Error: Git command line is not installed or not in PATH." -ForegroundColor Red
    Exit 1
}

# 2. Check if git repository is initialized
if (-not (Test-Path ".git")) {
    Write-Host "[*] Initializing local Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# 3. Check for unstaged changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "[i] No new changes or files detected to commit." -ForegroundColor Cyan
    Write-Host "[i] Working tree is clean." -ForegroundColor Green
    Exit 0
}

# 4. Determine commit message
if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $CommitMessage = "Update security portfolio & projects [$timestamp]"
}

Write-Host "[*] Staging all files..." -ForegroundColor Yellow
git add -A

Write-Host "[*] Committing with message: `"$CommitMessage`"..." -ForegroundColor Yellow
git commit -m "$CommitMessage"

# 5. Check remote origin
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host ""
    Write-Host "[!] Notice: No remote 'origin' detected." -ForegroundColor Yellow
    Write-Host "    If you haven't linked your GitHub repository yet, run:" -ForegroundColor White
    Write-Host "    git remote add origin https://github.com/2koushikdas5/My-portfolio.git" -ForegroundColor Cyan
    Write-Host "    git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    Exit 0
}

Write-Host "[*] Pushing commits to GitHub ($remote)..." -ForegroundColor Yellow
$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) { $currentBranch = "main" }

git push -u origin $currentBranch

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[+] SUCCESS: Changes successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "    Your portfolio will auto-deploy via GitHub Actions." -ForegroundColor Green
    Write-Host "    Live site URL: https://2koushikdas5.github.io/My-portfolio" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[!] Push failed. Please check your GitHub authentication or repository permissions." -ForegroundColor Red
}
