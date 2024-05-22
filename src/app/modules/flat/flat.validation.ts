import { z } from "zod";

const flatValidate = z.object({
  body: z.object({
    squareFeet: z.number(),
    totalBedrooms: z.number(),
    totalRooms: z.number(),
    utilitiesDescription: z.string(),
    location: z.string(),
    description: z.string(),
    rent: z.number(),
    advanceAmount: z.number(),
  }),
});

export const flatValidation = {
  flatValidate,
};
