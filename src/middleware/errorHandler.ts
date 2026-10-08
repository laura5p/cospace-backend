import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/appError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { Prisma } from "../generated/prisma";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "fail",
      message: "Validation failed",
      errors: err.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
    return;
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "fail",
      message: "Malformed JSON in request body",
      errors: [],
    });
    return;
  }

  if (err instanceof AppError && err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message, errors: [] });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res
        .status(HTTP_STATUS.CONFLICT)
        .json({
          status: "fail",
          message: "That desk is already booked for this date",
          errors: [],
        });
      return;
    }
    if (err.code === "P2003") {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({
          status: "fail",
          message: "The referenced user or desk does not exist",
          errors: [],
        });
      return;
    }
  }

  console.error(err.stack);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Something went wrong on our end",
    errors: [],
  });
}
