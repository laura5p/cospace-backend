import { BookingRepository } from '../repositories/booking.repositories';
import type { Booking, CreateBookingInput } from '../schemas/booking.schema';

export class BookingService {
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  getAll(): Booking[] {
    console.log('[Service] getAll');
    return this.repository.findAll();
  }

  getById(id: string): Booking | undefined {
    console.log('[Service] getById', id);
    return this.repository.findById(id);
  }

  create(data: CreateBookingInput): Booking {
    console.log('[Service] create', data.desk);
    const newBooking: Booking = { id: String(Date.now()), ...data };
    return this.repository.create(newBooking);
  }

  update(id: string, data: CreateBookingInput): Booking | undefined {
    console.log('[Service] update', id);
    return this.repository.update(id, { id, ...data });
  }

  patch(id: string, active: boolean): Booking | undefined {
    console.log('[Service] patch', id);
    return this.repository.patch(id, active);
  }

  delete(id: string): boolean {
    console.log('[Service] delete', id);
    return this.repository.delete(id);
  }
}