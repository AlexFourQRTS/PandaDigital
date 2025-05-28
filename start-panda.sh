#!/bin/bash
cd server && npx ts-node --transpile-only simple-start.ts &
SERVER_PID=$!
sleep 3
cd ../client && npx vite --host 0.0.0.0 &
CLIENT_PID=$!
echo '🐼 Panda платформа запущена!'
echo '🌐 Бэкенд: http://localhost:3000'
echo '⚛️ Фронтенд: http://localhost:5173'
wait
