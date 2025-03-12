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
COPY --from=development /app/dist ./dist
CMD ["npm", "run", "start"]

# Select the correct stage based on build argument
ARG NODE_ENV
FROM ${NODE_ENV:-'production'} AS final
EXPOSE 5050
