import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { BookingService } from "../services/booking.service";
import { BookingRepository } from "../repositories/booking.repositories";
import { auth, requireRole } from "../middleware/auth";
import { validateSchema } from "../middleware/validate";
import { createBookingSchema, patchBookingSchema } from "../schemas/booking.schema";

const repository = new BookingRepository();
const service = new BookingService(repository);
const controller = new BookingController(service);

const router = Router();

router.get("/", (req, res, next) => controller.getAll(req, res, next));
router.get("/:id", (req, res, next) => controller.getById(req, res, next));
router.post("/", auth, validateSchema(createBookingSchema), (req, res, next) => controller.create(req, res, next));
router.put("/:id", auth, validateSchema(createBookingSchema), (req, res, next) => controller.update(req, res, next));
router.patch("/:id", auth, validateSchema(patchBookingSchema), (req, res, next) => controller.patch(req, res, next));
router.delete("/:id", auth, requireRole("admin"), (req, res, next) => controller.delete(req, res, next));

export default router;
