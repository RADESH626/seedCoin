@echo off
echo Starting SeedCoin with Logging...

:: Start Backend (Logs to backend.log)
start "SeedCoin Backend" powershell -NoExit -Command "cd seedCoin; .\mvnw.cmd spring-boot:run | Tee-Object -FilePath ..\backend.log"

:: Start Frontend (Logs to frontend.log)
start "SeedCoin Frontend" powershell -NoExit -Command "cd frontend; npm run dev | Tee-Object -FilePath ..\frontend.log"

echo Services starting...
echo Logs are being saved to:
echo  - backend.log
echo  - frontend.log
