# Full HR Management Platform (SaaS)

Production-ready monorepo for a full HR platform using:
- Backend: Node.js, NestJS, PostgreSQL, Prisma
- Frontend: Next.js, TypeScript, Tailwind
- Infra: Docker

## Structure
- `backend/` NestJS API + Prisma
- `frontend/` Next.js admin portal
- `infra/` Docker and environment templates
- `docs/` Architecture, API, deployment guide
- `tests/` API and load tests

## Quick Start
```bash
docker compose -f infra/docker-compose.yml up --build
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Swagger: http://localhost:4000/api/docs

