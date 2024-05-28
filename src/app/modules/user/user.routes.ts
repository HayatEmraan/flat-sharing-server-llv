import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { userValidation } from "./user.validation";
import { Role } from "@prisma/client";

const userRoutes = Router();

userRoutes.get(
  "/profile",
  auth(Role.admin, Role.user),
  userController.getUserProfile
);

// auth(Role.admin),
userRoutes.get(
  "/get-users",
  auth(Role.admin, Role.user),
  userController.getAllUsers
);

userRoutes.put(
  "/profile",
  // zodValidation(userValidation.userValidate),
  auth(Role.admin, Role.user),
  userController.updateUserProfile
);

userRoutes.patch(
  "/change-role",
  auth(Role.admin),
  zodValidation(userValidation.userRoleValidation),
  userController.updateUserRole
);

export default userRoutes;
