# A) Architecture

- Multi-tenant SaaS HR platform with stateless NestJS API and Next.js web app.
- PostgreSQL + Prisma as transactional store.
- Security layers: JWT auth, RBAC guard, audit logs, login/IP tracking hooks.
- Scales to 50k users with horizontal API pods and queue-based payroll batches.
- Realtime attendance pattern: API ingestion + websocket/event extension ready.

# B) Database

Prisma schema includes required tables:
`users`, `employees`, `companies`, `locations`, `shifts`, `holidays`, `attendance`,
`leave_requests`, `approvals`, `payroll`, `payslips`, `projects`, `news`,
`certificates`, `credits`, `logs`.

Key choices:
- JSON columns for flexible policy payloads (working rules, routing rules, targets).
- Decimal fields for payroll precision.
- UUID primary keys for distributed-safe inserts.

# C) Backend

NestJS backend provides:
- health endpoint
- module catalog endpoint
- attendance check-in endpoint with GPS/IP payload
- payroll calculation endpoint (gross/tax/SS/OT/deductions)
- Prisma integration and Swagger docs
- Base RBAC guard and AES encryption helper

Testing:
- Unit test for payroll net calculation
- e2e config scaffold for API tests

# D) Frontend

Next.js + Tailwind dashboard:
- Module cards for all required HR domains
- Ready to wire with backend APIs via `NEXT_PUBLIC_API_URL`

# E) API Docs

Swagger URL: `/api/docs`

Core endpoints:
- `GET /health`
- `GET /v1/modules`
- `POST /v1/attendance/check-in`
- `POST /v1/payroll/calculate`

# F) Deploy Guide

1. Copy env:
   - `cp infra/.env.example infra/.env`
2. Build and run:
   - `docker compose -f infra/docker-compose.yml up --build -d`
3. Open:
   - Frontend `http://localhost:3000`
   - Backend `http://localhost:4000`
   - API Docs `http://localhost:4000/api/docs`
4. DB migration (inside backend container):
   - `npx prisma migrate deploy`

Load test:
- `k6 run tests/load-test.js`
