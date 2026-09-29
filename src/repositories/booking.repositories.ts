import { Booking } from "../schemas/booking.schema";

export class BookingRepository {
  private bookings: Booking[] = [
    {
      id: "1",
      desk: "Desk A1",
      floor: "Floor 1",
      date: "2026-09-20",
      active: true,
    },
    {
      id: "2",
      desk: "Desk B2",
      floor: "Floor 2",
      date: "2026-09-21",
      active: true,
    },
    {
      id: "3",
      desk: "Desk A2",
      floor: "Floor 1",
      date: "2026-09-22",
      active: false,
    },
  ];

  findAll(): Booking[] {
    console.log("[Repository] findAll");
    return this.bookings;
  }

  findById(id: string): Booking | undefined {
    console.log("[Repository] findById", id);
    return this.bookings.find((b) => b.id === id);
  }

  create(booking: Booking): Booking {
    console.log("[Repository] create", booking);
    this.bookings.push(booking);
    return booking;
  }

  update(id: string, data: Booking): Booking | undefined {
    console.log("[Repository] update", id);
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    this.bookings[index] = data;
    return this.bookings[index];
  }

  patch(id: string, active: boolean): Booking | undefined {
    console.log("[Repository] patch", id);
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    this.bookings[index].active = active;
    return this.bookings[index];
  }

  delete(id: string): boolean {
    console.log("[Repository] delete", id);
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.bookings.splice(index, 1);
    return true;
  }
}
