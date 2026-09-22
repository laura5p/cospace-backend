import { Router, Request, Response } from 'express';

interface Booking {
  id: string;
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

const bookings: Booking[] = [
  { id: '1', desk: 'Desk A1', floor: 'Floor 1', date: '2026-09-20', active: true },
  { id: '2', desk: 'Desk B2', floor: 'Floor 2', date: '2026-09-21', active: true },
  { id: '3', desk: 'Desk A2', floor: 'Floor 1', date: '2026-09-22', active: false },
];

const router = Router();

// GET all bookings
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(bookings);
});

// GET a single booking by id
router.get('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  res.status(200).json(booking);
});

// POST a new booking
router.post('/', (req: Request, res: Response) => {
  const { desk, floor, date } = req.body;

  const newBooking: Booking = {
    id: String(bookings.length + 1),
    desk,
    floor,
    date,
    active: true,
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// PUT - full replace
router.put('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  const { desk, floor, date, active } = req.body;
  bookings[index] = { id, desk, floor, date, active };

  res.status(200).json(bookings[index]);
});

// PATCH - partial update (active status)
router.patch('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  bookings[index].active = req.body.active;
  res.status(200).json(bookings[index]);
});

// DELETE
router.delete('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  bookings.splice(index, 1);
  res.status(204).send();
});

export default router;