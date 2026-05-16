# ============================================================
#  SeedCoin -- Verificacion Completa Pre-Commit
#  Uso: .\.agents\scripts\verify.ps1  (desde la raiz del repo)
#  Duracion estimada: ~30-60 segundos
# ============================================================

$ErrorActionPreference = "Continue"
$Root      = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$MobileDir = Join-Path $Root "mobile"
$MobileSrc = Join-Path $MobileDir "src"

$Passed   = 0
$Failed   = 0
$Warnings = 0
$Results  = @()

function Write-Header {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "   SeedCoin - Verificacion Completa        " -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
}

function Run-Check {
    param(
        [string]$Name,
        [string]$Category,
        [scriptblock]$Body,
        [switch]$IsWarning
    )

    Write-Host "  [ .. ] [$Category] $Name" -ForegroundColor DarkGray

    $output   = & $Body 2>&1
    $exitCode = $LASTEXITCODE

    if ($exitCode -eq 0) {
        Write-Host "  [ OK ] [$Category] $Name" -ForegroundColor Green
        $script:Passed++
        $script:Results += @{ Name = $Name; Category = $Category; Status = "PASS"; Output = ""; IsWarning = $false }
    } elseif ($IsWarning) {
        Write-Host "  [WARN] [$Category] $Name" -ForegroundColor Yellow
        $script:Warnings++
        $script:Results += @{ Name = $Name; Category = $Category; Status = "WARN"; Output = ($output | Out-String); IsWarning = $true }
    } else {
        Write-Host "  [FAIL] [$Category] $Name" -ForegroundColor Red
        $script:Failed++
        $script:Results += @{ Name = $Name; Category = $Category; Status = "FAIL"; Output = ($output | Out-String); IsWarning = $false }
    }
}

function Run-GrepCheck {
    param(
        [string]$Name,
        [string]$Category,
        [string]$Pattern,
        [string]$Path,
        [switch]$IsWarning
    )

    Write-Host "  [ .. ] [$Category] $Name" -ForegroundColor DarkGray

    $matches = Get-ChildItem -Path $Path -Recurse -Include "*.ts","*.tsx" -ErrorAction SilentlyContinue |
               Select-String -Pattern $Pattern -ErrorAction SilentlyContinue

    $count = ($matches | Measure-Object).Count

    if ($count -eq 0) {
        Write-Host "  [ OK ] [$Category] $Name" -ForegroundColor Green
        $script:Passed++
        $script:Results += @{ Name = $Name; Category = $Category; Status = "PASS"; Output = ""; IsWarning = $false }
    } elseif ($IsWarning) {
        Write-Host "  [WARN] [$Category] $Name ($count ocurrencia(s))" -ForegroundColor Yellow
        $script:Warnings++
        $detail = $matches | Select-Object -First 5 | ForEach-Object { "    $($_.Filename):$($_.LineNumber) -> $($_.Line.Trim())" }
        $script:Results += @{ Name = $Name; Category = $Category; Status = "WARN"; Output = ($detail -join "`n"); IsWarning = $true }
    } else {
        Write-Host "  [FAIL] [$Category] $Name ($count ocurrencia(s))" -ForegroundColor Red
        $script:Failed++
        $detail = $matches | Select-Object -First 5 | ForEach-Object { "    $($_.Filename):$($_.LineNumber) -> $($_.Line.Trim())" }
        $script:Results += @{ Name = $Name; Category = $Category; Status = "FAIL"; Output = ($detail -join "`n"); IsWarning = $false }
    }
}

# ---- Main --------------------------------------------------

Write-Header

Set-Location $MobileDir

Write-Host "  -- Bloque 1: Chequeos de Codigo --" -ForegroundColor DarkCyan

Run-Check "TypeScript (tsc --noEmit)" "TIPOS" {
    npx tsc --noEmit 2>&1
    $LASTEXITCODE
}

Run-Check "ESLint (expo lint)" "LINT" {
    npx expo lint 2>&1
    $LASTEXITCODE
}

Run-Check "Tests unitarios (jest)" "TESTS" {
    npx jest --passWithNoTests --silent 2>&1
    $LASTEXITCODE
}

Write-Host ""
Write-Host "  -- Bloque 2: Salud del Proyecto --" -ForegroundColor DarkCyan

Run-Check "Expo Doctor" "EXPO" {
    npx expo-doctor 2>&1
    $LASTEXITCODE
} -IsWarning

Set-Location $Root

Write-Host ""
Write-Host "  -- Bloque 3: Calidad del Codigo --" -ForegroundColor DarkCyan

Run-GrepCheck `
    "Sin console.log de debug" `
    "CALIDAD" `
    "console\.(log|warn|error)\(" `
    $MobileSrc `
    -IsWarning

Run-GrepCheck `
    "Sin 'any' explicito" `
    "TIPOS" `
    ": any[^[]" `
    $MobileSrc `
    -IsWarning

Run-GrepCheck `
    "Sin TODO/FIXME criticos" `
    "DEUDA" `
    "TODO|FIXME|HACK|XXX" `
    $MobileSrc `
    -IsWarning

# ---- Resumen -----------------------------------------------

$Total = $Passed + $Failed + $Warnings

Write-Host ""
Write-Host "============================================" -ForegroundColor DarkGray
Write-Host "  RESUMEN DE VERIFICACION" -ForegroundColor White
Write-Host "============================================" -ForegroundColor DarkGray
Write-Host "  [OK]   Pasaron:  $Passed / $Total" -ForegroundColor Green
Write-Host "  [WARN] Warnings: $Warnings / $Total" -ForegroundColor Yellow
Write-Host "  [FAIL] Fallaron: $Failed / $Total" -ForegroundColor Red
Write-Host "============================================" -ForegroundColor DarkGray

foreach ($r in $Results) {
    if ($r.Status -ne "PASS" -and $r.Output) {
        $color = if ($r.IsWarning) { "Yellow" } else { "Red" }
        Write-Host ""
        Write-Host "  -- $($r.Name) --" -ForegroundColor $color
        Write-Host $r.Output -ForegroundColor DarkGray
    }
}

Write-Host ""

if ($Failed -gt 0) {
    Write-Host "  [ROJO]    NO apto para commit -- corrige los errores primero." -ForegroundColor Red
    exit 1
} elseif ($Warnings -gt 0) {
    Write-Host "  [AMARILLO] Apto para commit con advertencias -- revisa los warnings." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "  [VERDE]   Todo limpio -- listo para commit." -ForegroundColor Green
    exit 0
}
