# API Routing

## Route Planning Table

| Action | Method | Path | Payload | Success Status |
|---|---|---|---|---|
| Retrieve all bookings | GET | /bookings | None | 200 OK |
| Retrieve a single booking | GET | /bookings/:id | None (path param) | 200 OK |
| Add a new booking | POST | /bookings | JSON: desk, floor, date | 201 Created |
| Overwrite a full booking | PUT | /bookings/:id | JSON: full booking object | 200 OK |
| Toggle booking status | PATCH | /bookings/:id | JSON: { active: boolean } | 200 OK |
| Delete a booking | DELETE | /bookings/:id | None (path param) | 204 No Content |

## Successful POST

Command:
\`\`\`
curl -X POST -H "Content-Type: application/json" -d '{"desk":"Window Desk A","floor":"Floor 2, North Wing","date":"2026-09-01"}' http://localhost:5000/bookings
\`\`\`

Response:
\`\`\`
{"id":"4","desk":"Window Desk A","floor":"Floor 2, North Wing","date":"2026-09-01","active":true}
\`\`\`

## 404 Example

Command:
\`\`\`
curl http://localhost:5000/bookings/1
\`\`\`

Response (after deletion):
\`\`\`
{"error":"Booking not found"}
\`\`\`

## req.body without express.json()

Without `express.json()` registered as middleware, `req.body` is `undefined` for any POST/PUT/PATCH request, even when the client sends a valid JSON payload. I found this out by temporarily commenting out `app.use(express.json())` and sending a POST request — the server threw `TypeError: Cannot read properties of undefined (reading 'desk')` because it tried to destructure fields off `undefined`.