# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files first (for faster caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Build the production-ready static files
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:stable-alpine

# Copy built files from previous stage to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Default command to start nginx
CMD ["nginx", "-g", "daemon off;"]
