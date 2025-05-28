FROM node:18-alpine

WORKDIR /app

# Copy package files from root
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy shared schema
COPY shared ./shared

# Copy server code
COPY server ./server

# Expose port
EXPOSE 5000

# Start the Docker server
CMD ["npx", "tsx", "server/docker-server.ts"]