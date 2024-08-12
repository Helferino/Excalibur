## Excalibur Assignment

Job assignment for Excalibur's Full-Stack developer (React.js + Node.js) position by **Jakub Urban - urbanjakub1306@gmail.com**

### Notes for reviewer(s)

- Front-end part is finished with all bonus assignmens done + other quality of life features added by me
- Back-end part is finished too but with some issues. I spent too much time on trying to resolve them but I think you will get the point I was trying to make.
  (See **Improvements** section)
- You can rewrite `packages/mailer/config.ini` or just use it as it is
- Testing HTTP request for email API is in root `test-request.http`

### Start

```bash
# Development
pnpm i # Install packages
pnpm run build # Build dependencies
docker compose -f docker-compose.dev.yaml up

# Production (!Not working, see Improvements section...)
docker compose up

# Manual service run (e.g Front-end)
pnpm i # Install packages
pnpm run build # Build dependencies
pnpm run --filter form build
pnpm run --filter form start
# pnpm run --filter form dev
```

### Front-End

- Using port **3000**
- Form for sending fake emails
- Multi-stage form with input validation
- Attachements uploading (External CDN)
- Error handling from fake API response

![obrázok](https://github.com/user-attachments/assets/3bc44f5d-038d-46df-b7bd-1745a0d94fe5)

### API

- Using port **3001**
- REST API for sending emails with **Mailer** service
- User's data validation

### Mailer

- Using port **50051**
- gRPC server that can send emails
- Rendering templates using [Pug](https://pugjs.org/)
- Configurable SMTP config in `packages/mailer/config.ini`

### Improvements

**Overall project structure**

I used **pnpm** monorepo with custom reusable `common` package that requires manual rebuilding `pnpm run --filter build` which is not ideal. Also this package is making troubles in `docker-compose.yaml` in run mode thats why it doesnt work in current version. I spent way too much time on this issue so I decided to skip it. It surely can be fixed...

**Others**

- Connect front-end part to to API so its completed as whole full-stack app (Out of scope for this assignment)
- Fix typing issues in typescript (1 or 2 I think)
- Other improvements ideas/notes are in codebase
