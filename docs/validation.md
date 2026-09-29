Validation
Booking requests are validated with a Zod schema (src/schemas/booking.schema.ts) at the route boundary. The validateSchema middleware parses req.body, replaces it with the sanitised result, and forwards any ZodError to the global error handler, which returns a structured 400.
Desk name too short
Command:
curl -i -X POST <http://localhost:5000/bookings> -H "Authorization: super-secret-key" -H "Content-Type: application/json" -d '{"desk":"Go", "floor":"Floor 1", "date":"2026-09-30"}'
​
Response:
HTTP/1.1 400 Bad Request

{"error":"Validation Failed","details":[{"field":["desk"],"message":"Too small: expected string to have >=3 characters"}]}
​
Invalid date
Command:
curl -i -X POST <http://localhost:5000/bookings> -H "Authorization: super-secret-key" -H "Content-Type: application/json" -d '{"desk":"Desk A1","floor":"Floor 1","date":"next-monday"}'
​
Response:
HTTP/1.1 400 Bad Request

{"error":"Validation Failed","details":[{"field":["date"],"message":"Invalid ISO date"}]}
​
Trailing whitespace is stripped
Sent (desk has leading and trailing spaces):
curl -i -X POST <http://localhost:5000/bookings> -H "Authorization: super-secret-key" -H "Content-Type: application/json" -d '{"desk":"   Window Desk A   ","floor":"Floor 3","date":"2026-09-30"}'
​
Response:
HTTP/1.1 201 Created

{"id":"REPLACE_WITH_ID","desk":"Window Desk A","floor":"Floor 3","date":"2026-09-30","active":true}
​
Stored (from curl <http://localhost:5000/bookings>):
{"id":"REPLACE_WITH_ID","desk":"Window Desk A","floor":"Floor 3","date":"2026-09-30","active":true}
​
The spaces are removed by .trim() in the schema. This only reaches the saved record because the middleware assigns the parsed result back with req.body = result.data; Zod returns a cleaned copy and never changes the original input. active was not sent, so the schema's default of true was applied.
PATCH accepts only active
Command:
curl -i -X PATCH <http://localhost:5000/bookings/1> -H "Authorization: super-secret-key" -H "Content-Type: application/json" -d '{"active":false}'
​
Response: HTTP/1.1 200 OK, with booking 1 returned showing "active":false. PATCH uses patchBookingSchema, so it does not require desk, floor or date.
Why the schema is the source of the TypeScript type
TypeScript types are erased when the code is compiled, so they cannot check data arriving at runtime. A Zod schema does check it, and z.infer<typeof createBookingSchema> generates the TypeScript type from that schema. Defining the rules once means runtime validation and compile-time types can never drift apart: changing a rule in the schema updates the type everywhere it is used. If the type were written by hand, a change to one could easily be missed in the other.