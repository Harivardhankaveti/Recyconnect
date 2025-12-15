@echo off
echo Setting up WasteConnect Project...

echo.
echo Step 1: Installing Backend Dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Frontend Dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Database Setup Instructions...
echo Please ensure you have MySQL running and execute the following:
echo 1. Create a database named 'wasteconnect_db'
echo 2. Run the SQL script in backend/database.sql
echo.

echo.
echo Setup complete! 
echo.
echo To run the project:
echo 1. Start the backend: cd backend && npm start
echo 2. Start the frontend: cd frontend && npm start
echo 3. Open http://localhost:3000 in your browser
echo.
pause

