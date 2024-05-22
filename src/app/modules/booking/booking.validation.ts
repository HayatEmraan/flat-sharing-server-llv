import { z } from "zod";

const bookingValidate = z.object({
  body: z.object({
    flatId: z.string(),
  }),
});

export const bookingValidation = {
  bookingValidate,
};
