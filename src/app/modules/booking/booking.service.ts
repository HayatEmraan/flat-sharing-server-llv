import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

const bookingRequestSync = async (
  payload: { flatId: string },
  userId: string
) => {
  await prisma.flat.findUniqueOrThrow({
    where: {
      id: payload.flatId,
    },
  });

  const booking = await prisma.booking.create({
    data: {
      flatId: payload.flatId,
      userId,
    },
  });

  return booking;
};

const getBookingRequestSync = async () => {
  return await prisma.booking.findMany({});
};

const updateBookingRequestSync = async (
  payload: { status: Status },
  bookingId: string
) => {
  await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
    },
  });

  const updateBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: payload,
  });

  return updateBooking;
};

export const bookingService = {
  bookingRequestSync,
  getBookingRequestSync,
  updateBookingRequestSync,
};
