FROM node:22-bookworm-slim AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Separate stages for dev and prod
FROM base AS development
CMD ["npm", "run", "dev"]

FROM base AS production
RUN npm run build # If applicable
CMD ["npm", "run", "start"]

# Select the correct stage based on build argument
ARG NODE_ENV
FROM ${NODE_ENV} AS final
EXPOSE 5050
