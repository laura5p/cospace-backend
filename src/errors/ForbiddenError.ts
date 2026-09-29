import { AppError } from "../utils/appError";
import { HTTP_STATUS } from "../constants/httpStatus";

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, HTTP_STATUS.FORBIDDEN);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}