import { z } from "zod";

const userValidate = z.object({
  body: z.object({
    bio: z.string(),
    profession: z.string(),
    address: z.string(),
  }),
});

export const userValidation = {
  userValidate,
};
