# Базовый образ Node.js с Alpine (легковесный)
FROM node:18-alpine

# Рабочая директория в контейнере
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов
COPY . .

# Установка TypeScript глобально (если нужно)
RUN npm install -g typescript

# Компиляция TypeScript в JavaScript
RUN npm run build

# Порт, который будет использоваться микросервисом
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]