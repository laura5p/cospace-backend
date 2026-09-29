import { BookingService } from "../services/booking.service";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";

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
  constructor(private service: BookingService) {}

  getAll(req: Request, res: Response, next: NextFunction): void {
    try {
      const page = parsePositiveInt(req.query.page, DEFAULT_PAGE);
      const limit = Math.min(parsePositiveInt(req.query.limit, DEFAULT_LIMIT), MAX_LIMIT);
      res.status(HTTP_STATUS.OK).json(this.service.getPaginatedBookings(page, limit));
    } catch (err) {
      next(err);
    }
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(HTTP_STATUS.OK).json(this.service.getById(req.params.id as string));
    } catch (err) {
      next(err);
    }
  }

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(HTTP_STATUS.CREATED).json(this.service.create(req.body));
    } catch (err) {
      next(err);
    }
  }

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(HTTP_STATUS.OK).json(this.service.update(req.params.id as string, req.body));
    } catch (err) {
      next(err);
    }
  }

  patch(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(HTTP_STATUS.OK).json(this.service.patch(req.params.id as string, req.body.active));
    } catch (err) {
      next(err);
    }
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      this.service.delete(req.params.id as string);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}