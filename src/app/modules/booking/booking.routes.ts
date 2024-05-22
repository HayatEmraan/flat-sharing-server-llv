import { Router } from "express";
import auth from "../../middlewares/auth";
import zodValidation from "../../middlewares/zodValidation";
import { bookingValidation } from "./booking.validation";
import { bookingController } from "./booking.controller";

const bookingApplication = Router();
const bookingRequest = Router();

bookingApplication.post(
  "/",
  auth("All-User"),
  zodValidation(bookingValidation.bookingValidate),
  bookingController.bookingRequest
);


bookingRequest.get("/", auth("All-User"), bookingController.getBookingRequest);
bookingRequest.put(
  "/:bookingId",
  auth("All-User"),
  bookingController.updateBookingRequest
);

export const bookingRoutes = {
  bookingApplication,
  bookingRequest,
};
