# Multi-stage build for backend

FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy sources
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Use Node ESM specifier resolution to allow extension-less imports in compiled JS
CMD ["node", "--experimental-specifier-resolution=node", "dist/index.js"]

 