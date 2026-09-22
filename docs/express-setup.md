# Express Setup

## Health-check response

`curl http://localhost:5000/` output:

```json
{"status":"active","message":"CoSpace API is running"}
```

## What the AI got wrong

The AI-scaffolded version used implicit `any` types for the request and response parameters, which bypassed TypeScript's strict mode. I added explicit `Request` and `Response` types from Express to fix this.

## Why the shutdown handler matters

When this runs in a container (e.g. Docker/Kubernetes), the platform sends a `SIGTERM` signal before killing the process to allow in-flight requests to finish. Without a handler, the process is forcibly killed, potentially cutting off active connections. The `SIGTERM`/`SIGINT` listeners here call `server.close()` first, allowing a graceful shutdown.

## Confirmation

`node_modules/` and `.DS_Store` are listed in `.gitignore` and do not appear in `git status`.
# Express Setup

## Health-check response

curl http://localhost:5000/ output:

\`\`\`json
{"status":"active","message":"CoSpace API is running"}
\`\`\`

## What the AI got wrong

The AI-scaffolded version used implicit `any` types for the request and response parameters, which bypassed TypeScript's strict mode. I added explicit `Request` and `Response` types from Express to fix this.

## Why the shutdown handler matters

When this runs in a container (e.g. Docker/Kubernetes), the platform sends a `SIGTERM` signal before killing the process to allow in-flight requests to finish. Without a handler, the process is forcibly killed, potentially cutting off active connections. The `SIGTERM`/`SIGINT` listeners here call `server.close()` first, allowing a graceful shutdown.

## Confirmation

`node_modules/` and `.DS_Store` are listed in `.gitignore` and do not appear in `git status`.