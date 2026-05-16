# ============================================================
#  SeedCoin -- Chequeo Rapido de Integridad
#  Uso: .\.agents\scripts\check.ps1  (desde la raiz del repo)
#  Duracion estimada: ~10-15 segundos
# ============================================================

$ErrorActionPreference = "Continue"
$Root      = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$MobileDir = Join-Path $Root "mobile"

$Passed  = 0
$Failed  = 0
$Results = @()

function Write-Header {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "   SeedCoin - Chequeo Rapido de Integridad " -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
}

function Run-Check {
    param(
        [string]$Name,
        [scriptblock]$Body
    )

    Write-Host "  [ .. ] $Name" -ForegroundColor DarkGray

    $output   = & $Body 2>&1
    $exitCode = $LASTEXITCODE

    if ($exitCode -eq 0) {
        Write-Host "  [ OK ] $Name" -ForegroundColor Green
        $script:Passed++
        $script:Results += @{ Name = $Name; Status = "PASS"; Output = "" }
    } else {
        Write-Host "  [FAIL] $Name" -ForegroundColor Red
        $script:Failed++
        $script:Results += @{ Name = $Name; Status = "FAIL"; Output = ($output | Out-String) }
    }
}

# ---- Main --------------------------------------------------

Write-Header

Set-Location $MobileDir

# 1. TypeScript
Run-Check "TypeScript (tsc --noEmit)" {
    npx tsc --noEmit 2>&1
    $LASTEXITCODE
}

# 2. ESLint
Run-Check "ESLint (expo lint)" {
    npx expo lint 2>&1
    $LASTEXITCODE
}

# 3. Tests unitarios
Run-Check "Tests unitarios (jest)" {
    npx jest --passWithNoTests --silent 2>&1
    $LASTEXITCODE
}

Set-Location $Root

# ---- Resumen -----------------------------------------------

Write-Host ""
Write-Host "--------------------------------------------" -ForegroundColor DarkGray
Write-Host "  Resultado: " -NoNewline

if ($Failed -eq 0) {
    Write-Host "[PASS] $Passed/$($Passed + $Failed) checks pasaron" -ForegroundColor Green
    Write-Host "--------------------------------------------" -ForegroundColor DarkGray
    Write-Host ""
    exit 0
} else {
    Write-Host "[FAIL] $Failed fallo(s) -- $Passed/$($Passed + $Failed) checks pasaron" -ForegroundColor Red
    Write-Host "--------------------------------------------" -ForegroundColor DarkGray
    Write-Host ""

    foreach ($r in $Results) {
        if ($r.Status -eq "FAIL" -and $r.Output) {
            Write-Host "  -- Detalle: $($r.Name) --" -ForegroundColor Yellow
            Write-Host $r.Output -ForegroundColor DarkYellow
        }
    }
    exit 1
}
