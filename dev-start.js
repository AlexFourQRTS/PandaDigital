#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🐼 Запуск Panda платформы с фронтендом и бэкендом...\n');

// Функция для красивого вывода логов
function logWithPrefix(prefix, color, data) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\x1b[${color}m[${timestamp}] [${prefix}]\x1b[0m ${data.toString().trim()}`);
}

// Запуск сервера
console.log('🔧 Запуск бэкенд сервера...');
const server = spawn('npx', ['ts-node', '--transpile-only', 'simple-start.ts'], {
  cwd: path.join(__dirname, 'server'),
  stdio: ['pipe', 'pipe', 'pipe']
});

// Запуск клиента с задержкой
setTimeout(() => {
  console.log('⚛️ Запуск React фронтенда...');
  
  const client = spawn('npx', ['vite', '--host', '0.0.0.0'], {
    cwd: path.join(__dirname, 'client'),
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Обработка вывода клиента
  client.stdout.on('data', (data) => {
    logWithPrefix('ФРОНТ', '36', data); // Cyan
  });

  client.stderr.on('data', (data) => {
    logWithPrefix('ФРОНТ', '33', data); // Yellow
  });

  client.on('close', (code) => {
    logWithPrefix('ФРОНТ', '31', `Завершен с кодом ${code}`);
  });

  // Обработка сигнала завершения для клиента
  process.on('SIGINT', () => {
    client.kill();
  });

}, 3000); // Задержка 3 секунды для запуска сервера

// Обработка вывода сервера
server.stdout.on('data', (data) => {
  logWithPrefix('БЭКЕНД', '32', data); // Green
});

server.stderr.on('data', (data) => {
  logWithPrefix('БЭКЕНД', '31', data); // Red
});

server.on('close', (code) => {
  logWithPrefix('БЭКЕНД', '31', `Завершен с кодом ${code}`);
});

// Обработка сигнала завершения
process.on('SIGINT', () => {
  console.log('\n🐼 Завершение Panda платформы...');
  server.kill();
  process.exit();
});

console.log('\n📱 Ваша Panda платформа запускается...');
console.log('🌐 Бэкенд будет доступен на: http://localhost:3000');
console.log('⚛️ Фронтенд будет доступен на: http://localhost:5173');
console.log('\n🚀 Для остановки нажмите Ctrl+C\n');