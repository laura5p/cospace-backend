import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation Failed",
      details: err.issues.map(issue => ({
        field: issue.path,
        message: issue.message,
      })),
    });
    return;
  }
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
}
