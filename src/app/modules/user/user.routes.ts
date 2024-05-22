import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { userValidation } from "./user.validation";

const userRoutes = Router();

userRoutes.get("/", auth("All-User"), userController.getUserProfile);
userRoutes.put(
  "/",
  zodValidation(userValidation.userValidate),
  auth("All-User"),
  userController.updateUserProfile
);

userRoutes.patch("/change-role", )

export default userRoutes;
