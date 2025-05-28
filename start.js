const { spawn } = require('child_process');
const path = require('path');

console.log('🐼 Запуск Panda платформы...');

// Запуск сервера
const server = spawn('npx', ['ts-node', '--transpile-only', 'simple-start.ts'], {
  cwd: path.join(__dirname, 'server'),
  stdio: ['pipe', 'pipe', 'pipe']
});

// Запуск клиента
const client = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: ['pipe', 'pipe', 'pipe']
});

// Обработка вывода сервера
server.stdout.on('data', (data) => {
  console.log(`[СЕРВЕР] ${data.toString().trim()}`);
});

server.stderr.on('data', (data) => {
  console.error(`[СЕРВЕР ERROR] ${data.toString().trim()}`);
});

// Обработка вывода клиента
client.stdout.on('data', (data) => {
  console.log(`[КЛИЕНТ] ${data.toString().trim()}`);
});

client.stderr.on('data', (data) => {
  console.error(`[КЛИЕНТ ERROR] ${data.toString().trim()}`);
});

// Обработка завершения процессов
server.on('close', (code) => {
  console.log(`[СЕРВЕР] Завершен с кодом ${code}`);
});

client.on('close', (code) => {
  console.log(`[КЛИЕНТ] Завершен с кодом ${code}`);
});

// Обработка сигнала завершения
process.on('SIGINT', () => {
  console.log('\n🐼 Завершение Panda платформы...');
  server.kill();
  client.kill();
  process.exit();
});