import { AppError } from "../utils/appError";
import { HTTP_STATUS } from "../constants/httpStatus";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, HTTP_STATUS.NOT_FOUND);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
