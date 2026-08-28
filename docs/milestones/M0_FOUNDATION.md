# M0 — Foundation

## Goal

Establish the first runnable Namo Ride backend on the standalone monorepo without prematurely introducing business-domain tables.

## Included in this slice

- npm workspace foundation
- NestJS API application
- strict runtime environment validation
- MySQL 8.4 local service
- Prisma 7.10 configured for MySQL through the MariaDB driver adapter
- Redis local service
- security headers through Helmet
- explicit `/api/v1` API prefix
- liveness endpoint
- MySQL-backed readiness endpoint
- TypeScript verification gate
- unit tests for environment and database URL parsing

## Endpoints

- `GET /api/v1/health/live` — process liveness, no database dependency
- `GET /api/v1/health` — readiness, validates MySQL connectivity

## Verification

```bash
cp .env.example .env
npm install
npm run infra:up
npm run verify
npm run dev:api
```

Expected readiness response has `status: ok` and `checks.database: up`.

## Not included yet

- application/domain tables
- migrations
- OTP/authentication
- Redis application client
- MongoDB application client
- Next.js admin application
- Flutter applications

Those are intentionally sequenced after the M0 runtime foundation is verified.
