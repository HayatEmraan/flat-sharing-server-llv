import { Router } from "express";
import { flatController } from "./flat.controller";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { flatValidation } from "./flat.validation";
import { Role } from "@prisma/client";

const flatRoutes = Router();

flatRoutes.post(
  "/",
  auth(Role.user),
  zodValidation(flatValidation.flatValidate),
  flatController.addFlat
);
flatRoutes.get("/", flatController.getFlats);
flatRoutes.put("/:flatId", flatController.updateFlat);

export default flatRoutes;
