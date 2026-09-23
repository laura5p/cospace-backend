import { BookingRepository, Booking } from '../repositories/booking.repositories';

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

  create(desk: string, floor: string, date: string): Booking {
    console.log('[Service] create', desk);
    if (desk.length < 3) {
      throw new Error('Desk name must be at least 3 characters long');
    }
    const newBooking: Booking = {
      id: String(Date.now()),
      desk,
      floor,
      date,
      active: true,
    };
    return this.repository.create(newBooking);
  }

  update(id: string, data: Booking): Booking | undefined {
    console.log('[Service] update', id);
    if (data.desk.length < 3) {
      throw new Error('Desk name must be at least 3 characters long');
    }
    return this.repository.update(id, data);
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