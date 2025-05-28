#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🐼 Запуск Panda платформы...');

// Запуск сервера
const server = spawn('npx', ['ts-node', '--transpile-only', 'simple-start.ts'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

// Запуск клиента с задержкой
setTimeout(() => {
  const client = spawn('npx', ['vite', '--host', '0.0.0.0'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit'
  });

  // Обработка сигналов завершения
  process.on('SIGTERM', () => {
    server.kill();
    client.kill();
  });

  process.on('SIGINT', () => {
    server.kill();
    client.kill();
    process.exit();
  });

}, 2000);

console.log('🌐 Бэкенд: http://localhost:3000');
console.log('⚛️ Фронтенд: http://localhost:5173');