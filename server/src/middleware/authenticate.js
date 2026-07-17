import admin from "../config/firebase.js";
import { UnauthorizedError } from "../shared/errors/AppError.js";
import User from "../modules/users/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    req.user = decodedToken;
    
    // Optionally fetch full user from DB if needed by controllers
    // const dbUser = await User.findOne({ firebaseUid: decodedToken.uid });
    // if (dbUser) {
    //   req.user.role = dbUser.role;
    // }

    next();
  } catch (error) {
    next(error);
  }
};
