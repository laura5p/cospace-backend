import { BookingRepository } from "../repositories/booking.repositories";
import type { Booking, CreateBookingInput } from "../schemas/booking.schema";
import { NotFoundError } from "../errors";

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
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  getAll(): Booking[] {
    console.log("[Service] getAll");
    return this.repository.findAll();
  }

  getById(id: string): Booking {
    const booking = this.repository.findById(id);
    if (!booking) throw new NotFoundError(`Booking ${id} not found`);
    return booking;
  }

  create(data: CreateBookingInput): Booking {
    console.log("[Service] create", data.desk);
    const newBooking: Booking = { id: String(Date.now()), ...data };
    return this.repository.create(newBooking);
  }

  update(id: string, data: CreateBookingInput): Booking {
    const updated = this.repository.update(id, { id, ...data });
    if (!updated) throw new NotFoundError(`Booking ${id} not found`);
    return updated;
  }

  patch(id: string, active: boolean): Booking {
    const patched = this.repository.patch(id, active);
    if (!patched) throw new NotFoundError(`Booking ${id} not found`);
    return patched;
  }

  delete(id: string): void {
    if (!this.repository.delete(id))
      throw new NotFoundError(`Booking ${id} not found`);
  }

  getPaginatedBookings(page: number, limit: number): PaginatedResult<Booking> {
    console.log("[Service] getPaginatedBookings", page, limit);
    const skip = (page - 1) * limit;
    const totalItems = this.repository.count();
    const data = this.repository.findPaginated(skip, limit);

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
}
