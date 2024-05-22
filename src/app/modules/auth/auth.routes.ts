import { Router } from "express";
import { authController } from "./auth.controller";
import zodValidation from "../../middlewares/zodValidation";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const authRoutes = Router();

authRoutes.post(
  "/login",
  zodValidation(authValidation.loginValidate),
  authController.loginUser
);
authRoutes.post(
  "/register",
  zodValidation(authValidation.registerValidate),
  authController.createUser
);

authRoutes.post(
  "/change-password",
  auth(Role.admin, Role.user),
  zodValidation(authValidation.passwordValidation),
  authController.changePassword
);

export default authRoutes;
