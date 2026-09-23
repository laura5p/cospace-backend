# Middleware

## Logged request line

(paste the line from the `npm run dev` terminal for a GET /bookings request)

## 401 Unauthorized

Requests without a valid `Authorization` header are rejected by `auth` before reaching validation or the controller.

Command (no header):

    curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:5000/bookings

Response:

    {"error":"Unauthorized"}

A misspelled header name (`Authorisation`) also returns 401, because Express only reads the `authorization` header, so the token is never found.

## 400 Missing required fields

With a valid token but an empty body, `auth` passes and `validate` blocks the request.

Command:

    curl -X POST -H "Authorization: super-secret-key" -H "Content-Type: application/json" -d '{}' http://localhost:5000/bookings

Response:

    {"error":"Missing required fields","missing":["desk","floor","date"]}

## Error handler without the 4th parameter

Removing `next` from the error handler's signature means Express no longer recognises it as error-handling middleware, so it is skipped and the error isn't returned as a clean formatted response.