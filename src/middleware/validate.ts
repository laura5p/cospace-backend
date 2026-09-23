import { Request, Response, NextFunction } from "express";

export function validate(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missing = requiredFields.filter((field) => !(field in req.body));

    if (missing.length > 0) {
      res.status(400).json({ error: "Missing required fields", missing });
      return;
    }

    next();
  };
}
