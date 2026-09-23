import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';

export class BookingController {
  private service: BookingService;

  constructor(service: BookingService) {
    this.service = service;
  }

  getAll(req: Request, res: Response): void {
    console.log('[Controller] getAll');
    const bookings = this.service.getAll();
    res.status(200).json(bookings);
  }

  getById(req: Request, res: Response): void {
    console.log('[Controller] getById');
    const id = req.params.id as string;
    const booking = this.service.getById(id);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.status(200).json(booking);
  }

  create(req: Request, res: Response): void {
    console.log('[Controller] create');
    try {
      const { desk, floor, date } = req.body;
      const booking = this.service.create(desk, floor, date);
      res.status(201).json(booking);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  update(req: Request, res: Response): void {
    console.log('[Controller] update');
    try {
      const id = req.params.id as string;
      const { desk, floor, date, active } = req.body;
      const booking = this.service.update(id, { id, desk, floor, date, active });
      if (!booking) {
        res.status(404).json({ error: 'Booking not found' });
        return;
      }
      res.status(200).json(booking);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  patch(req: Request, res: Response): void {
    console.log('[Controller] patch');
    const id = req.params.id as string;
    const booking = this.service.patch(id, req.body.active);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.status(200).json(booking);
  }

  delete(req: Request, res: Response): void {
    console.log('[Controller] delete');
    const id = req.params.id as string;
    const deleted = this.service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.status(204).send();
  }
}