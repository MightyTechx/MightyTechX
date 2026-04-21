FROM node:20-alpine

WORKDIR /app

# Install dependencies (including devDeps needed for tsc build)
COPY server/package.json server/package-lock.json* ./
RUN npm ci

# Copy source and compile TypeScript
COPY server/ .
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

EXPOSE 10000

ENV NODE_ENV=production
ENV PORT=10000
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

CMD ["node", "dist/index.js"]
