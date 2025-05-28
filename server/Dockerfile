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

# Create media directory
RUN mkdir -p media

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]