# Use the official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy the application code
COPY . .
# Install dependencies (if needed)
RUN bun install

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
