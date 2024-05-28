import { Router } from "express";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { bookingValidation } from "./booking.validation";
import { bookingController } from "./booking.controller";
import { Role } from "@prisma/client";

const bookingRoutes = Router();

bookingRoutes.post(
  "/create-booking",
  auth(Role.user, Role.admin),
  zodValidation(bookingValidation.bookingValidate),
  bookingController.bookingRequest
);

bookingRoutes.get(
  "/booking-info",
  auth(Role.user, Role.admin),
  bookingController.getBookingRequest
);
bookingRoutes.put(
  "/change-status/:bookingId",
  auth(Role.user, Role.admin),
  bookingController.updateBookingRequest
);

export default bookingRoutes;
