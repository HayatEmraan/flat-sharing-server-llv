import { z } from "zod";

const loginValidate = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const registerValidate = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    bio: z.string(),
    profession: z.string(),
    address: z.string(),
  }),
});

export const authValidation = {
  loginValidate,
  registerValidate,
};
