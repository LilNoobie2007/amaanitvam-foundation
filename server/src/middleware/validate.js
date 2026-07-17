import { ValidationError } from "../shared/errors/AppError.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(", ");
      return next(new ValidationError(errorMessage));
    }

    // Replace request with validated and stripped values
    req[source] = value;
    next();
  };
};
