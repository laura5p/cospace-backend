import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { BookingRepository } from '../repositories/booking.repositories';

const repository = new BookingRepository();
const service = new BookingService(repository);
const controller = new BookingController(service);

const router = Router();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.patch('/:id', (req, res) => controller.patch(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;