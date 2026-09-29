import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

function parsePositiveInt(value: unknown, fallback: number): number {
  if (typeof value !== "string") return fallback;
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.max(parsed, 1);
}

export class BookingController {
  private service: BookingService;

  constructor(service: BookingService) {
    this.service = service;
  }

  getAll(req: Request, res: Response): void {
    console.log("[Controller] getAll");
    const page = parsePositiveInt(req.query.page, DEFAULT_PAGE);
    const limit = Math.min(
      parsePositiveInt(req.query.limit, DEFAULT_LIMIT),
      MAX_LIMIT,
    );
    const result = this.service.getPaginatedBookings(page, limit);
    res.status(200).json(result);
  }

  getById(req: Request, res: Response): void {
    console.log("[Controller] getById");
    const id = req.params.id as string;
    const booking = this.service.getById(id);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.status(200).json(booking);
  }

  create(req: Request, res: Response): void {
    console.log("[Controller] create");
    const booking = this.service.create(req.body);
    res.status(201).json(booking);
  }

  update(req: Request, res: Response): void {
    console.log("[Controller] update");
    const id = req.params.id as string;
    const booking = this.service.update(id, req.body);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.status(200).json(booking);
  }

  patch(req: Request, res: Response): void {
    console.log("[Controller] patch");
    const id = req.params.id as string;
    const booking = this.service.patch(id, req.body.active);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.status(200).json(booking);
  }

  delete(req: Request, res: Response): void {
    console.log("[Controller] delete");
    const id = req.params.id as string;
    const deleted = this.service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.status(204).send();
  }
}
