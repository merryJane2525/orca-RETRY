@echo off
cd /d "%~dp0"
title ORCA Local Runner

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js가 설치되어 있지 않습니다.
  echo https://nodejs.org 에서 LTS 버전을 먼저 설치해주세요.
  pause
  exit /b 1
)

if not exist node_modules (
  echo [1/3] 패키지 설치 중...
  call npm install
  if errorlevel 1 (
    echo npm install 실행 중 오류가 발생했습니다.
    pause
    exit /b 1
  )
)

echo [2/3] 브라우저를 여는 중...
start "" cmd /c "timeout /t 4 >nul && start http://localhost:5173"

echo [3/3] 로컬 서버 실행 중...
call npm run dev

pause
