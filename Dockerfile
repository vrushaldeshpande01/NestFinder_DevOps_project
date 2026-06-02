# Multi-stage Dockerfile for NestFinder Application
# Based on quantumvector e-commerce setup pattern, optimized for Node.js/React full-stack app

# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Build the application (Vite + esbuild for server)
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestfinder -u 1001

# Copy built artifacts from builder
COPY --from=builder --chown=nestfinder:nodejs /app/dist ./dist
COPY --from=builder --chown=nestfinder:nodejs /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev && \
    npm cache clean --force

# Switch to non-root user
USER nestfinder

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to ensure proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/server.cjs"]
