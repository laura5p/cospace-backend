import { z } from "zod";

export const createBookingSchema = z.object({
  desk: z.string().trim().min(3).max(100),
  floor: z.string().trim().min(5).max(200),
  date: z.iso.date(),
  active: z.boolean().default(true),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const bookingSchema = createBookingSchema.extend({
  id: z.string()
});

export type Booking = z.infer<typeof bookingSchema>;
export const patchBookingSchema = z.object({
  active: z.boolean()
});

export type PatchBookingInput = z.infer<typeof patchBookingSchema>;