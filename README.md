# Namo Ride

Standalone production application for the Namo Ride platform.

## Architecture baseline

- Backend: NestJS + TypeScript
- Primary relational datastore: MySQL
- Selective document datastore: MongoDB where justified
- Ephemeral/cache/geo/queue infrastructure: Redis
- Admin web: Next.js + TypeScript
- Mobile: Flutter customer and partner applications
- Object storage: S3-compatible private storage

## Repository role

This repository is the source of truth for Namo Ride implementation and architecture documentation.

## Initial milestone

M0 establishes the production-ready monorepo foundation, local infrastructure, configuration, health checks, database connectivity, CI gates, and application shells before business-domain implementation.
