import { Router } from "express";
import { flatController } from "./flat.controller";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { flatValidation } from "./flat.validation";

const flatRoutes = Router();

flatRoutes.post(
  "/",
  auth("All-User"),
  zodValidation(flatValidation.flatValidate),
  flatController.addFlat
);
flatRoutes.get("/", auth("All-User"), flatController.getFlats);
flatRoutes.put("/:flatId", auth("All-User"), flatController.updateFlat);

export default flatRoutes;
