FROM node:22-bookworm-slim AS base
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
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
CMD ["npm", "run", "start"]

# Select the correct stage based on build argument
FROM ${NODE_ENV:-'production'} AS final
EXPOSE 5050
