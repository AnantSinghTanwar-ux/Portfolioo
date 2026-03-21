@echo off
cd c:\Users\maste\Desktop\portfolio
echo "Starting Vite..." > start.log
call npm run dev >> start.log 2>&1
echo "Finished" >> start.log
