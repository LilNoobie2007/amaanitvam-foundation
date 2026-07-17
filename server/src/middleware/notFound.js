import { NotFoundError } from "../shared/errors/AppError.js";

export const notFound = (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
};
