-- ===== SEED DATA =====

-- 3 teams
INSERT INTO teams (name, department) VALUES
('Engineering', 'Product'),
('Sales', 'Revenue'),
('People', 'Operations');

-- 8 colleagues (one with no bookings: Grace)
INSERT INTO users (first_name, last_name, email, role, password, team_id) VALUES
('Alice', 'Smith', 'alice@cospace.com', 'colleague', 'hash1', 1),
('Bob', 'Jones', 'bob@cospace.com', 'colleague', 'hash2', 1),
('Charlie', 'Brown', 'charlie@cospace.com', 'colleague', 'hash3', 2),
('Dana', 'White', 'dana@cospace.com', 'colleague', 'hash4', 2),
('Evan', 'Green', 'evan@cospace.com', 'colleague', 'hash5', 3),
('Fiona', 'Black', 'fiona@cospace.com', 'colleague', 'hash6', 3),
('Grace', 'Adams', 'grace@cospace.com', 'colleague', 'hash7', 1),
('Henry', 'Baker', 'henry@cospace.com', 'colleague', 'hash8', 2);

-- 3 meeting rooms
INSERT INTO rooms (name, floor, capacity) VALUES
('Boardroom', 1, 10),
('Huddle Space', 2, 4),
('Focus Room', 3, 2);

-- 4 desks
INSERT INTO desks (name, floor) VALUES
('Desk A1', 1),
('Desk A2', 1),
('Desk B1', 2),
('Desk B2', 2);

-- 6 bookings (Alice books Desk A1 on two different days; Grace has none)
INSERT INTO bookings (user_id, desk_id, booking_date) VALUES
(1, 1, '2026-09-20'),
(1, 1, '2026-09-21'),
(2, 2, '2026-09-20'),
(3, 3, '2026-09-20'),
(4, 4, '2026-09-20'),
(5, 1, '2026-09-22');

-- ===== REPORTING QUERY =====

SELECT
    CONCAT(u.first_name, ' ', u.last_name) AS full_name,
    t.name AS team_name,
    COUNT(b.id) AS desks_booked
FROM users u
LEFT JOIN teams t ON u.team_id = t.id
LEFT JOIN bookings b ON u.id = b.user_id
GROUP BY u.id, full_name, t.name;

-- ===== UPDATE =====

UPDATE users
SET team_id = 3
WHERE first_name = 'Alice';

-- ===== DELETE =====

DELETE FROM desks
WHERE name = 'Desk A1';

