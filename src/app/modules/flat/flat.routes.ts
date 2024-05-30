import { Router } from "express";
import { flatController } from "./flat.controller";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { flatValidation } from "./flat.validation";
import { Role } from "@prisma/client";

const flatRoutes = Router();

flatRoutes.get("/", flatController.getFlats);
flatRoutes.get("/property-stats", flatController.getFlatStats);
flatRoutes.get(
  "/get-my-shared-flat",
  auth(Role.user),
  flatController.sharedFlat
);

flatRoutes.get("/:flatId", flatController.getFlat);

flatRoutes.post(
  "/",
  auth(Role.user),
  zodValidation(flatValidation.flatValidate),
  flatController.addFlat
);
flatRoutes.put("/:flatId", auth(Role.user), flatController.updateFlat);

flatRoutes.delete(
  "/:flatId",
  auth(Role.user, Role.admin),
  flatController.deleteFlat
);

export default flatRoutes;
