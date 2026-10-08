import express, { Request, Response } from 'express';
import bookingRouter from './routes/booking.routes';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import "dotenv/config";
import cors from 'cors';

const app = express();
const port = 5000;

app.use(logger);
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'active', message: 'CoSpace API is running' });
});

app.use('/bookings', bookingRouter);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});