import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { BookingService } from "../services/booking.service";
import { BookingRepository } from "../repositories/booking.repositories";
import { auth } from "../middleware/auth";
import { validateSchema } from "../middleware/validate";
import { createBookingSchema } from "../schemas/booking.schema";

const repository = new BookingRepository();
const service = new BookingService(repository);
const controller = new BookingController(service);

const router = Router();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", auth, validateSchema(createBookingSchema), (req, res) =>
  controller.create(req, res),
);
router.put("/:id", auth, validateSchema(createBookingSchema), (req, res) =>
  controller.update(req, res),
);
router.patch("/:id", auth, validateSchema(createBookingSchema), (req, res) =>
  controller.patch(req, res),
);
router.delete("/:id", auth, (req, res) => controller.delete(req, res));

export default router;
