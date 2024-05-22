import { z } from "zod";

const loginValidate = z.object({
  body: z.object({
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "password must be string",
    }),
  }),
});

const registerValidate = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
      invalid_type_error: "email must be string",
    }),
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "password must be string",
    }),
    username: z.string({
      required_error: "username is required",
      invalid_type_error: "username must be string",
    }),
  }),
});

const passwordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "old password is required",
      invalid_type_error: "old password must be string",
    }),
    newPassword: z.string({
      required_error: "new password is required",
      invalid_type_error: "new password must be string",
    }),
  }),
});

export const authValidation = {
  loginValidate,
  registerValidate,
  passwordValidation,
};
