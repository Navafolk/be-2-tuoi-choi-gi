@echo off
chcp 65001 >nul
title Xuat Ban Online - Be 2 Tuoi Choi Gi?
cd /d "%~dp0"
echo ========================================================
echo    DANG KHOI CHAY MAY CHU VA TAO LINK TRUY CAP ONLINE...
echo ========================================================

:: Khoi dong may chu Python neu chua chay
start "" /b py -3 server.py
timeout /t 2 /nobreak >nul

:: Chay Cloudflare Quick Tunnel tao link HTTPS cong khai
echo.
echo Dang ket noi toi mang luoi toan cau Cloudflare...
echo Link cong khai se xuat hien ben duoi trong vai giay:
echo (Tim dong bat dau bang https://....trycloudflare.com)
echo ========================================================
cloudflared.exe tunnel --url http://localhost:8080
pause
