@echo off
echo Starting Smart Infrastructure Monitoring Frontend...
echo.

cd frontend

if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo.
echo Starting Vite dev server on http://localhost:3000
echo.
npm run dev

pause
