import { Active, Role } from "@prisma/client";
import { z } from "zod";

const userValidate = z.object({
  body: z.object({
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string({
      required_error: "address is required",
    }),
    name: z.string({
      required_error: "name is required",
    }),
  }),
});

const userRoleValidation = z.object({
  body: z.object({
    role: z.enum([Role.admin, Role.user]).optional(),
    isActive: z.enum([Active.activate, Active.deactivate]).optional(),
  }),
});

export const userValidation = {
  userValidate,
  userRoleValidation,
};
