FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy shared schema
COPY ../shared ./shared

# Copy server code
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]