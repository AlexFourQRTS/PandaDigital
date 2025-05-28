# Panda Platform - Docker Setup

## Архитектура

Приложение разделено на 4 контейнера:

- **PostgreSQL** (порт 5432) - База данных
- **Backend** (порт 3001) - Express API сервер
- **Frontend** (порт 3000) - React приложение
- **Nginx** (порт 80) - Обратный прокси и балансировщик нагрузки

## Быстрый запуск

1. **Сборка контейнеров:**
```bash
docker-compose build
```

2. **Запуск всех сервисов:**
```bash
docker-compose up -d
```

3. **Применение миграций базы данных:**
```bash
# Дождитесь запуска PostgreSQL, затем:
docker-compose exec backend npm run db:push
```

4. **Открыть приложение:**
- Фронтенд: http://localhost:3000
- Главная страница (через Nginx): http://localhost
- API: http://localhost:3001/api

## Полезные команды

```bash
# Остановить все контейнеры
docker-compose down

# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Перезапуск
docker-compose restart

# Пересборка и запуск
docker-compose down && docker-compose build && docker-compose up -d

# Подключение к базе данных
docker-compose exec postgres psql -U xsanderadmin -d mydatabase
```

## Структура

```
/
├── docker-compose.yml          # Основная конфигурация
├── backend.Dockerfile          # Backend контейнер
├── frontend.Dockerfile         # Frontend контейнер
├── nginx.conf                  # Nginx конфигурация
├── nginx-frontend.conf         # Nginx для фронтенда
├── init.sql                    # Инициализация БД
├── server/docker-server.ts     # Backend для Docker
└── uploads/                    # Загруженные файлы
```

## Переменные окружения

База данных настроена с следующими параметрами:
- Host: postgres (внутри Docker сети)
- Port: 5432
- Database: mydatabase
- User: xsanderadmin
- Password: qazxdr5WSE#!QAZXDR%2wse43

## Разработка

Для разработки используйте обычный режим:
```bash
npm run dev
```

Для продакшена используйте Docker:
```bash
docker-compose up -d
```