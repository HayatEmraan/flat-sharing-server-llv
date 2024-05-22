import { PrismaClient } from "@prisma/client";
import { IUser } from "../../interface";

const prisma = new PrismaClient();

const getUserSync = async (id: string) => {
  return await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId: id,
    },
  });
};

const updateUserSync = async (
  id: string,
  data: Omit<IUser, "name" | "email" | "password">
) => {
  // checking user profile is exit or not
  await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId: id,
    },
  });

  // update user profile
  const updateUser = await prisma.userProfile.update({
    where: {
      userId: id,
    },
    data: data,
  });

  return updateUser;
};

export const userService = {
  getUserSync,
  updateUserSync,
};
