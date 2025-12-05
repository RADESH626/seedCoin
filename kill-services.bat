@echo off
echo Stopping SeedCoin Services...

:: Kill Java (Backend)
taskkill /F /IM java.exe

:: Kill Node (Frontend)
taskkill /F /IM node.exe

echo.
echo All services stopped. You can now run 'run.bat' again.
pause
