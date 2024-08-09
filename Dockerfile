# Stage 1: Build the React app
FROM oven/bun:latest as builder

# Set working directory
WORKDIR /app

# Copy the project files
COPY . .

# Navigate to the client folder and build the React app
WORKDIR /app/client
RUN bun run build

# Stage 2: Serve the application
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/client/dist ./client/dist

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
