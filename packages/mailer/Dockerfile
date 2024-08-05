FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY packages/mailer/. ./packages/mailer/
COPY packages/common/. ./packages/common/

RUN npm install -g pnpm
RUN pnpm install --filter mailer --filter common

RUN pnpm run --filter mailer --filter common build

EXPOSE 50051

CMD ["pnpm", "--filter", "mailer", "start"]
