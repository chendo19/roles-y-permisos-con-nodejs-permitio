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

# Nginx for production
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Select stage based on NODE_ENV
ARG NODE_ENV
FROM ${NODE_ENV} AS final
