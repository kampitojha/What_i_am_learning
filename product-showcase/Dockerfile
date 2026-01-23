# Step 1: Initialize the build stage
# We use the 'node' official image, version 20 (alpine is a lightweight version)
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This ensures we don't re-install dependencies if only source code changes
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Initialize the production stage
# We use nginx to serve the static files created in the build stage
FROM nginx:alpine

# Copy the built files from the previous 'builder' stage to the nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
