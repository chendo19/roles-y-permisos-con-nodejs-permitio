# Base stage
FROM node:22-bookworm-slim AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Development stage
FROM base AS development
CMD ["npm", "run", "dev", "--", "--host"]

# Production stage (build frontend)
FROM base AS build
RUN npm run build

# Select stage based on NODE_ENV
ARG NODE_ENV
FROM ${NODE_ENV:-'production'} AS final
