# Use the official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /server

# Copy the application code
COPY . .
# Install dependencies (if needed)
RUN bun install

# Build the client app
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
