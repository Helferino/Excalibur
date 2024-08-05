FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY packages/form/. ./packages/form/
COPY packages/common/. ./packages/common/

RUN npm install -g pnpm
RUN pnpm install --filter form --filter common

RUN pnpm run --filter form --filter common build

EXPOSE 3000

CMD ["pnpm", "--filter", "form", "start"]