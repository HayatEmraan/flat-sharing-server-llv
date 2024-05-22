import { Router } from "express";
import { authController } from "./auth.controller";
import zodValidation from "../../middlewares/zodValidation";
import { authValidation } from "./auth.validation";

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

authRoutes.post("/change-password", )

export default authRoutes;
