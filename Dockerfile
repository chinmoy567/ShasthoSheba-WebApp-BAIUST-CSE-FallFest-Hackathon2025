# ---- Base image ----
FROM node:20-alpine AS base
WORKDIR /app

# Install system deps if needed (e.g., for bcrypt)
RUN apk add --no-cache python3 make g++ 

# Copy manifests first for better cache
COPY package*.json ./

# Install deps (production by default; switch as needed)
RUN npm ci

# Copy source
COPY . .

# Build Tailwind once at image build time (safe even if input.css missing)
# If you prefer runtime build, remove this and rely on compose command.
RUN npm run build:css || true

# Expose port
EXPOSE 3000

# Environment defaults (can be overridden at runtime)
ENV NODE_ENV=production

# Start the server (uses server.js)
CMD ["node", "server.js"]
