# Base stage
FROM node:22-bookworm-slim AS base

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm ci
COPY . .
RUN ls -la

# Development stage
FROM base AS development
EXPOSE 5172
CMD ["npm", "run", "dev", "--", "--host"]

# Production stage (build frontend)
FROM base AS build
RUN npm list vite  # Debug: Check if vite is installed
RUN npm run build

# Production stage (build frontend)
FROM nginx:1.25.1-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
