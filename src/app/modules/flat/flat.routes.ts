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
flatRoutes.get("/property-stats", flatController.getFlatStats);

flatRoutes.get("/:flatId", flatController.getFlat);

flatRoutes.put("/:flatId", auth(Role.user), flatController.updateFlat);

flatRoutes.get(
  "/get-my-shared-flat",
  auth(Role.user),
  flatController.sharedFlat
);

export default flatRoutes;
