import httpStatus from "http-status";
import appError from "../errors/appError";
import { jwt } from "../helpers/jwt";
import { JWT_CREDENTIALS } from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { Active, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw new appError(
          "Unauthorized or access not granted",
          httpStatus.UNAUTHORIZED
        );
      }

      const user = (await jwt.decodeToken(
        token,
        JWT_CREDENTIALS.access_key as string
      )) as JwtPayload;

      const { role, email, username } = user;

      if (!user) {
        throw new appError("Forbidden Access", httpStatus.FORBIDDEN);
      }

      if (!roles.includes(role)) {
        throw new appError(
          "User unauthorized or role not matched",
          httpStatus.UNAUTHORIZED
        );
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email,
          username,
          role,
          isActive: Active.activate,
        },
      });

      if (!findUser) {
        throw new appError(
          "User unauthorized or not found",
          httpStatus.UNAUTHORIZED
        );
      }

      req.user = user as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
