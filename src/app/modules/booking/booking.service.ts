import { PrismaClient, Status } from "@prisma/client";
import { bookingNotification } from "../../../mailer/booking.confirmation";
import { sendEmail } from "../../../mailer/nodemailer";
import appError from "../../errors/appError";
import httpStatus from "http-status";
import { getCurrentDate } from "./booking.utils";

const prisma = new PrismaClient();

const bookingRequestSync = async (
  payload: { flatId: string },
  userId: string
) => {
  const findFlatEitherExistOrNot = await prisma.flat.findUnique({
    where: {
      id: payload.flatId,
    },
  });

  if (!findFlatEitherExistOrNot) {
    throw new appError("flat info is not found", httpStatus.NOT_FOUND);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userprofile: true,
    },
  });

  const booking = await prisma.booking.create({
    data: {
      flatId: payload.flatId,
      userId,
    },
  });

  if (booking && user) {
    const confirmationHTML = bookingNotification.bookingConfirmation(
      user.userprofile?.name as string,
      findFlatEitherExistOrNot?.location as string,
      booking.id,
      getCurrentDate()
    );
    sendEmail(
      user.email,
      confirmationHTML,
      `Booking request confirmation #${booking.id.slice(0, 10)}`
    );
  }

  return booking;
};

const getBookingRequestSync = async () => {
  return await prisma.booking.findMany({});
};

const updateBookingRequestSync = async (
  payload: { status: Status },
  bookingId: string,
  id: string
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      flat: {
        userId: id,
      },
    },
    include: {
      flat: true,
      user: {
        include: {
          userprofile: true,
        },
      },
    },
  });

  if (!booking) {
    throw new appError("booking info is not found", httpStatus.NOT_FOUND);
  }

  if (
    booking.status === Status.CONFIRMED ||
    booking.status === Status.REJECTED
  ) {
    throw new appError(
      `This booking already marked as ${booking.status}, you can't change current status`,
      httpStatus.FORBIDDEN
    );
  }

  const updateBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: payload,
  });

  if (updateBooking) {
    if (payload.status === Status.CONFIRMED) {
      const confirmationHTML = bookingNotification.bookingConfirmed(
        booking.user.userprofile?.name as string,
        booking.flat.location as string,
        booking.id,
        getCurrentDate()
      );
      sendEmail(
        booking.user.email,
        confirmationHTML,
        `Booking request approved #${booking.id.slice(0, 10)}`
      );
    } else if (payload.status === Status.REJECTED) {
      const confirmationHTML = bookingNotification.bookingDeclined(
        booking.user.userprofile?.name as string
      );
      sendEmail(
        booking.user.email,
        confirmationHTML,
        `Booking request declined #${booking.id.slice(0, 10)}`
      );
    }
  }

  return updateBooking;
};

export const bookingService = {
  bookingRequestSync,
  getBookingRequestSync,
  updateBookingRequestSync,
};
