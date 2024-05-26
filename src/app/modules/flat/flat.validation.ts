import { Purpose } from "@prisma/client";
import { z } from "zod";
const AmenitySchema = z.object({
  image: z.string().url(),
  name: z.string(),
  offer: z.boolean().optional(),
  popular: z.boolean().optional(),
  facilities: z.array(z.any()).optional(),
});

const flatValidate = z.object({
  body: z.object({
    name: z.string(),
    location: z.string(),
    category: z.string(),
    purpose: z.nativeEnum(Purpose),
    numberOfBedrooms: z.number().int(),
    numberOfBathrooms: z.number().int(),
    landmark: z.number().int(),
    images: z.array(z.string().url()),
    briefDescription: z.string(),
    price: z.number().int(),
    taxes: z.number().int().optional(),
    amenities: z.array(AmenitySchema),
  }),
});

export const flatValidation = {
  flatValidate,
};
