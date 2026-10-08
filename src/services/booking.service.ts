import { BookingRepository } from "../repositories/booking.repositories";
import { NotFoundError } from "../errors";
import type { Booking, CreateBookingInput } from "../schemas/booking.schema";

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export class BookingService {
  constructor(private repository: BookingRepository) {}

  async getAll(): Promise<Booking[]> {
    return this.repository.findAll();
  }

  async getPaginatedBookings(page: number, limit: number): Promise<PaginatedResult<Booking>> {
    const skip = (page - 1) * limit;
    const [totalItems, data] = await Promise.all([
      this.repository.count(),
      this.repository.findPaginated(skip, limit),
    ]);

    return {
      data,
      meta: {
        totalItems,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async getById(id: number): Promise<Booking> {
    const booking = await this.repository.findById(id);
    if (!booking) throw new NotFoundError(`Booking ${id} not found`);
    return booking;
  }

  async create(data: CreateBookingInput): Promise<Booking> {
    return this.repository.create(data);
  }

  async update(id: number, data: CreateBookingInput): Promise<Booking> {
    const updated = await this.repository.update(id, data);
    if (!updated) throw new NotFoundError(`Booking ${id} not found`);
    return updated;
  }

  async patch(id: number, active: boolean): Promise<Booking> {
    const patched = await this.repository.patch(id, active);
    if (!patched) throw new NotFoundError(`Booking ${id} not found`);
    return patched;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new NotFoundError(`Booking ${id} not found`);
  }
}