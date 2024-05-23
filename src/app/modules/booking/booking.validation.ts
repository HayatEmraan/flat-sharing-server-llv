import { Status } from "@prisma/client";
import { z } from "zod";

const bookingValidate = z.object({
  body: z.object({
    flatId: z.string(),
  }),
});

const bookingStatusValidate = z.object({
  body: z.object({
    status: z.enum([Status.CONFIRMED, Status.REJECTED]),
  }),
});

export const bookingValidation = {
  bookingValidate,
};
