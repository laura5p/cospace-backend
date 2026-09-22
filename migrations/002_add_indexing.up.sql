ALTER TABLE bookings
ADD CONSTRAINT uniq_desk_date UNIQUE (desk_id, booking_date);
