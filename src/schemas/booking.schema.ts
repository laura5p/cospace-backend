import { z } from "zod";

export const createBookingSchema = z.object({
  user_id: z.number().int().positive(),
  desk_id: z.number().int().positive(),
  date: z.iso.date(),
  active: z.boolean().default(true),
});
export const bookingSchema = createBookingSchema.extend({
  id: z.number().int()
});

export const patchBookingSchema = z.object({
  active: z.boolean()
});


export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type PatchBookingInput = z.infer<typeof patchBookingSchema>;