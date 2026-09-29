import { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ForbiddenError } from "../errors";

const TOKEN_ROLES: Record<string, string> = {
  "super-secret-key": "admin",
  "viewer-key": "viewer",
};

export function auth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["authorization"];
  const role = token ? TOKEN_ROLES[token] : undefined;

  if (!role) {
    next(new UnauthorizedError("Invalid or missing authorization token"));
    return;
  }

  req.user = { role };
  next();
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      next(new ForbiddenError());
      return;
    }
    next();
  };
}
