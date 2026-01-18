import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "../model/user.schema.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const accessToken =
      req?.cookies?.accessToken ||
      req?.header("Authorization")?.replace("Bearer", "");

    if (!accessToken) {
      return next(
        new ErrorHandler("Unauthorized Request", httpStatus.UNAUTHORIZED)
      );
    }
    const decodedToken = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    if (!decodedToken) {
      return next(
        new ErrorHandler("Invalid Access token, or Expirey Token, login again")
      );
    }
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(new ErrorHandler("Invalid access Token, login again"));
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next(
      new ErrorHandler(`Something went wrong while verify Your  Token`)
    );
  }
});

export const verifyJWTForFrontend = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const accessToken =
      req?.cookies?.accessToken ||
      req?.header("Authorization")?.replace("Bearer", "");

    if (!accessToken) {
      return next(
        new ErrorHandler("Unauthorized Request", httpStatus.UNAUTHORIZED)
      );
    }
    const decodedToken = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    if (!decodedToken) {
      return next(
        new ErrorHandler(
          "Invalid Access token, or Expirey Token, login again",
          httpStatus.UNAUTHORIZED
        )
      );
    }
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(
        new ErrorHandler(
          "Invalid access Token, login again",
          httpStatus.UNAUTHORIZED
        )
      );
    }

    return res.status(200).json({
      authenticated: true,
    });
  } catch (err) {
    console.log(err);
    return next(
      new ErrorHandler(`Something went wrong while verify Your  Token`)
    );
  }
});
