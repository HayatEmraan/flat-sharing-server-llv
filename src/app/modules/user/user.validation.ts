import { Active, Role } from "@prisma/client";
import { z } from "zod";

const userValidate = z.object({
  body: z.object({
    bio: z.string(),
    profession: z.string(),
    address: z.string(),
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
