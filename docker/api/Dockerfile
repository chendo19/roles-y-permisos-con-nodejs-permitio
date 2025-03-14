FROM node:22-bookworm-slim AS base
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN echo "API NODE_ENV is set to: $NODE_ENV"
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
COPY . .
CMD ["npm", "run", "start"]

# Select the correct stage based on build argument
FROM ${NODE_ENV:-'production'} AS final
EXPOSE 5050
