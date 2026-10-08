import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/booking.service";
import { BadRequestError } from "../errors";
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

function parseId(value: unknown): number {
  const id = typeof value === "string" ? parseInt(value, 10) : NaN;
  if (Number.isNaN(id) || id < 1) throw new BadRequestError("Booking id must be a positive integer");
  return id;
}

export class BookingController {
  constructor(private service: BookingService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parsePositiveInt(req.query.page, DEFAULT_PAGE);
      const limit = Math.min(parsePositiveInt(req.query.limit, DEFAULT_LIMIT), MAX_LIMIT);
      res.status(HTTP_STATUS.OK).json(await this.service.getPaginatedBookings(page, limit));
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(HTTP_STATUS.OK).json(await this.service.getById(parseId(req.params.id)));
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(HTTP_STATUS.CREATED).json(await this.service.create(req.body));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(HTTP_STATUS.OK).json(await this.service.update(parseId(req.params.id), req.body));
    } catch (err) {
      next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(HTTP_STATUS.OK).json(await this.service.patch(parseId(req.params.id), req.body.active));
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.delete(parseId(req.params.id));
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}