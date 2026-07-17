import { ForbiddenError } from "../shared/errors/AppError.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      // Default role if not set in token/db
      const userRole = req.user.role || "viewer";

      if (!roles.includes(userRole) && userRole !== "super_admin") {
        throw new ForbiddenError(`Role ${userRole} is not authorized to access this resource`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
