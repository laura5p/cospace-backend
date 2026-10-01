import { prisma } from "../utils/prisma";
import { Prisma } from "../generated/prisma/client";
import type { Booking, CreateBookingInput } from "../schemas/booking.schema";

type BookingRow = { id: number; user_id: number; desk_id: number; booking_date: Date; active: boolean };

const toBooking = (row: BookingRow): Booking => ({
  id: row.id,
  user_id: row.user_id,
  desk_id: row.desk_id,
  date: row.booking_date.toISOString().slice(0, 10),
  active: row.active,
});

const toDate = (date: string): Date => new Date(`${date}T00:00:00.000Z`);

const isNotFound = (err: unknown): boolean =>
  err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025";

export class BookingRepository {
  async findAll(): Promise<Booking[]> {
    const rows = await prisma.booking.findMany({ orderBy: { id: "asc" } });
    return rows.map(toBooking);
  }

  async findPaginated(skip: number, limit: number): Promise<Booking[]> {
    const rows = await prisma.booking.findMany({ skip, take: limit, orderBy: { id: "asc" } });
    return rows.map(toBooking);
  }

  async count(): Promise<number> {
    return prisma.booking.count();
  }

  async findById(id: number): Promise<Booking | null> {
    const row = await prisma.booking.findUnique({ where: { id } });
    return row ? toBooking(row) : null;
  }

  async create(data: CreateBookingInput): Promise<Booking> {
    const row = await prisma.booking.create({
      data: { user_id: data.user_id, desk_id: data.desk_id, booking_date: toDate(data.date), active: data.active },
    });
    return toBooking(row);
  }

  async update(id: number, data: CreateBookingInput): Promise<Booking | null> {
    try {
      const row = await prisma.booking.update({
        where: { id },
        data: { user_id: data.user_id, desk_id: data.desk_id, booking_date: toDate(data.date), active: data.active },
      });
      return toBooking(row);
    } catch (err) {
      if (isNotFound(err)) return null;
      throw err;
    }
  }

  async patch(id: number, active: boolean): Promise<Booking | null> {
    try {
      return toBooking(await prisma.booking.update({ where: { id }, data: { active } }));
    } catch (err) {
      if (isNotFound(err)) return null;
      throw err;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.booking.delete({ where: { id } });
      return true;
    } catch (err) {
      if (isNotFound(err)) return false;
      throw err;
    }
  }
}