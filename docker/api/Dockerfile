FROM node:22-bookworm-slim AS base

# Separate stages for dev and prod
FROM base AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
CMD ["npm", "run", "dev"]

FROM base AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 5050
CMD ["npm", "run", "start"]

# Select the correct stage based on build argument


