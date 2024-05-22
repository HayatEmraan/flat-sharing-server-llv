import { z } from "zod";

const flatValidate = z.object({
  body: z.object({
    numberOfBedrooms: z.number({
      required_error: "bedroom is required",
    }),
    location: z.string({
      required_error: "location is required",
    }),
    briefDescription: z.string({
      required_error: "description is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
  }),
});

export const flatValidation = {
  flatValidate,
};
