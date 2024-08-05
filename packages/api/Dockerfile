FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY packages/api/. ./packages/api/
COPY packages/common/. ./packages/common/

RUN npm install -g pnpm
RUN pnpm install --filter api --filter common

RUN pnpm run --filter api --filter common build

EXPOSE 3001

CMD ["pnpm", "--filter", "api", "start"]
