import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { role: string };
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];

  if (token !== 'super-secret-key') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  req.user = { role: 'admin' };
  next();
}