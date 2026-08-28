# Namo Ride

Production monorepo for the standalone Namo Ride platform.

## Locked foundation

- Backend: NestJS 12 + TypeScript
- Primary datastore: MySQL 8.4 LTS
- ORM: Prisma 7.10 with the MariaDB/MySQL driver adapter
- Ephemeral/GEO/cache infrastructure: Redis
- MongoDB: selective supporting document workloads only when justified
- Admin web: Next.js (next milestone)
- Mobile: Flutter customer and partner applications (later milestone)

## M0 local API bootstrap

```bash
cp .env.example .env
npm install
npm run infra:up
npm run verify
npm run dev:api
```

Readiness endpoint:

```bash
curl http://localhost:3000/api/v1/health
```

Liveness endpoint:

```bash
curl http://localhost:3000/api/v1/health/live
```

The readiness endpoint verifies MySQL connectivity. The liveness endpoint confirms that the API process is running without depending on MySQL.

## Engineering rule

`main` is the verified milestone branch. Active implementation is performed on feature branches and is merged only after local verification.
