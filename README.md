# Panda Web Platform

Современная веб-платформа с блогом, чатом, новостями и медиа-галереей.

## 🚀 Быстрый старт

### Вариант 1: Локальная разработка фронтенда + Docker бэкенд

#### 1. Запуск бэкенда в Docker
```bash
# Только бэкенд и база данных
docker-compose up postgres backend -d
```

#### 2. Разработка фронтенда локально
```bash
cd client
npm install
npm run dev
```

Фронтенд будет доступен на http://localhost:5173
API бэкенда на http://localhost:5000

### Вариант 2: Полное развертывание в Docker

```bash
# Все сервисы в Docker
docker-compose up -d
```

Приложение будет доступно на http://localhost

## 📁 Структура проекта

```
├── client/          # React фронтенд
│   ├── src/         # Исходный код
│   ├── package.json # Зависимости фронтенда
│   └── Dockerfile   # Docker образ для продакшена
├── server/          # Express бэкенд
│   ├── package.json # Зависимости бэкенда
│   └── Dockerfile   # Docker образ бэкенда
├── shared/          # Общие типы и схемы
└── docker-compose.yml # Конфигурация Docker
```

## 🛠 Команды разработки

### Фронтенд (client/)
```bash
npm run dev     # Запуск dev сервера
npm run build   # Сборка для продакшена
npm run preview # Предварительный просмотр сборки
```

### Бэкенд (server/)
```bash
npm run dev     # Запуск dev сервера
npm start       # Запуск продакшен сервера
```

## 🔧 Конфигурация

### Переменные окружения для бэкенда
```env
DATABASE_URL=postgres://user:password@localhost:5432/database
NODE_ENV=production
```

### Прокси настройки (client/vite.config.ts)
```typescript
server: {
  proxy: {
    '/api': 'http://localhost:5000',
    '/ws': { 
      target: 'ws://localhost:5000',
      ws: true 
    }
  }
}
```

## 🐳 Docker конфигурация

### Только бэкенд сервисы
```bash
docker-compose up postgres backend -d
```

### Все сервисы
```bash
docker-compose up -d
```

### Остановка
```bash
docker-compose down
```

## 📦 Основные технологии

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **WebSocket**: Для реалтайм чата
- **Docker**: Для контейнеризации

## 🎨 Дизайн система

- **Основной цвет**: Графитовые оттенки
- **Акцент**: Оранжевый (#f97316)
- **Адаптивность**: 5 breakpoints (mobile → 4K)

## 📱 Функции

- ✅ Блог с подсветкой кода
- ✅ Анонимный чат в реальном времени  
- ✅ Новости с внешнего API
- ✅ Медиа галерея с загрузкой файлов
- ✅ Страница технологий с аккордеонами
- ✅ Адаптивный дизайн

## 🔗 Полезные ссылки

- Фронтенд (dev): http://localhost:5173
- Бэкенд API: http://localhost:5000/api
- База данных: localhost:5432