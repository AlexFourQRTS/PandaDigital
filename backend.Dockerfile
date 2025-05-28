FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY drizzle.config.ts ./

# Install dependencies
RUN npm ci --only=production

# Copy backend source code
COPY server/ ./server/
COPY shared/ ./shared/

# Create uploads directory
RUN mkdir -p uploads

# Build TypeScript
RUN npm install -g tsx
RUN npm install typescript @types/node

EXPOSE 3001

CMD ["tsx", "server/docker-server.ts"]