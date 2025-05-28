# Panda Web Platform

Современная веб-платформа с блогом, чатом, новостями и медиа-галереей.

## 🚀 Быстрый старт

### Рекомендуемый способ: React локально + Docker бэкенд

#### 1. Запуск бэкенда и базы данных в Docker
```bash
cd server
docker-compose up -d
```

#### 2. Запуск React приложения локально
```bash
cd client
npm install
npm run dev
```

**Доступ к приложению:**
- Фронтенд: http://localhost:5173
- API бэкенда: http://localhost:5000
- WebSocket: ws://localhost:5000/ws
- База данных: localhost:5432
- Загруженные файлы: папка `media/`

### Альтернативный способ: Полное развертывание в Docker

```bash
cd server
docker-compose -f ../docker-compose.yml up -d
```

Приложение будет доступно на http://localhost

## 📁 Структура проекта

```
├── .git/            # Git репозиторий (корневая папка)
├── client/          # React фронтенд
│   ├── src/         # Исходный код
│   ├── package.json # Зависимости фронтенда
│   └── vite.config.ts # Конфигурация Vite
├── server/          # Express бэкенд
│   ├── package.json # Зависимости бэкенда
│   ├── Dockerfile   # Docker образ бэкенда
│   └── docker-compose.yml # Конфигурация Docker
├── media/           # Папка для загруженных файлов
└── shared/          # Общие типы и схемы
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