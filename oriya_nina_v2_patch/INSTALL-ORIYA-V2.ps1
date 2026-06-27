param(
  [string]$ProjectPath = "D:\Developer Dress\fashion-catalog\fashion-catalog"
)

$ErrorActionPreference = "Stop"
$PatchPath = Split-Path -Parent $MyInvocation.MyCommand.Path

if (!(Test-Path $ProjectPath)) {
  throw "Project path not found: $ProjectPath"
}

$Backup = Join-Path $ProjectPath ("backup-before-oriya-v2-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
New-Item -ItemType Directory -Path $Backup | Out-Null

$Files = @(
  "index.html",
  "public\robots.txt",
  "public\sitemap.xml",
  "public\og-image.svg",
  "public\site.webmanifest",
  "src\App.jsx",
  "src\components\Footer.jsx",
  "src\components\ItemCard.jsx",
  "src\components\ItemModal.jsx",
  "src\components\Navbar.jsx",
  "src\components\FloatingWhatsApp.jsx",
  "src\components\SEO.jsx",
  "src\constants.js",
  "src\pages\AdminPage.jsx",
  "src\pages\CatalogPage.jsx",
  "src\pages\HomePage.jsx",
  "src\pages\FAQPage.jsx",
  "src\pages\LandingPage.jsx",
  "src\seoSchemas.js",
  "vercel.json"
)

foreach ($File in $Files) {
  $Source = Join-Path $PatchPath $File
  $Dest = Join-Path $ProjectPath $File
  if (Test-Path $Dest) {
    $BackupDest = Join-Path $Backup $File
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $BackupDest) | Out-Null
    Copy-Item $Dest $BackupDest -Force
  }
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Dest) | Out-Null
  Copy-Item $Source $Dest -Force
}

Write-Host "ORIYA NINA v2 installed successfully." -ForegroundColor Green
Write-Host "Backup created at: $Backup" -ForegroundColor Yellow
Write-Host "Next commands:" -ForegroundColor Cyan
Write-Host "cd `"$ProjectPath`""
Write-Host "npm run build"
Write-Host "npm run dev"
