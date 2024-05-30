import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import globalResponseHandler from "../../helpers/globalResponseHandler";
import { bookingService } from "./booking.service";

const bookingRequest = catchAsync(async (req, res) => {
  const { id } = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking requests submitted successfully",
    data: await bookingService.bookingRequestSync(req.body, id),
  });
});

const getBookingRequest = catchAsync(async (req, res) => {
  const user = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking requests retrieved successfully",
    data: await bookingService.getBookingRequestSync(user),
  });
});

const updateBookingRequest = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const user = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking request updated successfully",
    data: await bookingService.updateBookingRequestSync(
      req.body,
      bookingId,
      user
    ),
  });
});

const getBookingByRequest = catchAsync(async (req, res) => {
  const user = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking requests retrieved successfully",
    data: await bookingService.getBookingByRequestSync(user),
  });
});

export const bookingController = {
  bookingRequest,
  getBookingRequest,
  updateBookingRequest,
  getBookingByRequest,
};
