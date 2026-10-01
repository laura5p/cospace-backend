# Persistence with Prisma

Bookings are now stored in the local MySQL database `cospace-dev` instead of an in-memory array. Prisma generates the client from `prisma/schema.prisma`, the table structure is versioned in `prisma/migrations/`, and every repository uses the single shared client exported from `src/utils/prisma.ts`.

## Tables in cospace-dev

Command:

```bash
mysql -u root -p -D cospace-dev -e "SHOW TABLES;"
```

Output:

```
+---------------------------+
| Tables_in_cospace-dev |
+---------------------------+
| _prisma_migrations |
| bookings |
| desks |
| rooms |
| teams |
| users |
+---------------------------+
```

`_prisma_migrations` is created by Prisma to record which migrations have been applied. The other five tables come from the models in `schema.prisma`.

## Bookings survive a server restart

### 1. Create a booking

```bash
curl -i -X POST http://localhost:5000/bookings -H "Authorization: super-secret-key" -H "Content-Type: application/json" -d '{"user_id":1,"desk_id":1,"date":"2026-10-01"}'
```

```
HTTP/1.1 201 Created

{"id":REPLACE_WITH_ID,"user_id":1,"desk_id":1,"date":"2026-10-01","active":true}
```

### 2. Stop and restart the server

The Node process was stopped with `Ctrl + C`, then started again:

```
$ npm run dev

> cospace-backend@1.0.0 dev
> ts-node-dev --respawn --transpile-only src/index.ts

Server listening on port 5000
```

### 3. Fetch bookings after the restart

```bash
curl http://localhost:5000/bookings
```

```json
{"data":[{"id":1,"user_id":1,"desk_id":1,"date":"2026-10-01","active":true}],"meta":{"totalItems":1,"itemsPerPage":10,"currentPage":1,"totalPages":1}}
```

The booking created before the restart is still returned, so it was written to MySQL rather than held in memory.

## Why there is only one PrismaClient

Every `new PrismaClient()` opens its own pool of database connections, so creating one in each repository file multiplies the open connections until MySQL refuses new ones with "Too many connections"; exporting a single instance from `src/utils/prisma.ts` keeps the whole app on one pool capped at 5 connections.