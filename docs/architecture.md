# Layered Architecture

## Request trace (GET /bookings/1)

Console output showing the request passing through all four layers in order:

[Controller] getById
[Service] getById 1
[Repository] findById 1

## 400 validation example

Command:
curl -X POST -H "Content-Type: application/json" -d '{"desk":"Go","floor":"Floor 1","date":"2026-09-20"}' http://localhost:5000/bookings

Response:
{"error":"Desk name must be at least 3 characters long"}

This error is raised in the **Service layer** (`BookingService.create`), which validates the business rule that a desk name must be at least 3 characters long. The Controller catches the thrown error and formats it into a 400 HTTP response.

## Why the service layer must not import Express

The service layer contains only business logic and should work independently of any transport mechanism (HTTP, CLI, message queue), so it must never import `Request`, `Response`, or any other Express type — only the Controller layer is allowed to know that HTTP exists.