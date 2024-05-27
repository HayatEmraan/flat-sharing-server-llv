import { Active, Role } from "@prisma/client";
import { z } from "zod";

const userValidate = z.object({
  body: z.object({
    email: z.string().optional(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    name: z.string().optional(),
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
