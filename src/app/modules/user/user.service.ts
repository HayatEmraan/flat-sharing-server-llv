import { Active, PrismaClient } from "@prisma/client";
import { IUserProfileInfo } from "../../../interface";
import appError from "../../errors/appError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const getUserSync = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
      isActive: Active.activate,
    },
  });

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      userId: user?.id,
    },
  });

  return {
    ...userProfile,
    email: user?.email,
    username: user?.username,
  };
};

const updateUserSync = async (id: string, data: IUserProfileInfo) => {
  const { email, ...userInfo } = data;
  let updateUser;
  console.log(userInfo);
  // update user profile
  if (userInfo) {
    updateUser = await prisma.userProfile.upsert({
      where: {
        userId: id,
      },
      update: userInfo,
      create: {
        ...userInfo,
        userId: id,
      },
    });
  }

  if (email) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }

  return updateUser;
};

const updateUserRoleSync = async (userPayload: any) => {
  const { id, ...othersInfo } = userPayload;
  // user is exist or not
  const checkingUserExistOrNot = await prisma.user.findUnique({
    where: {
      id: userPayload.id,
    },
  });

  if (!checkingUserExistOrNot) {
    throw new appError("User is not found", httpStatus.NOT_FOUND);
  }

  // if user has then perform the upcoming update
  return await prisma.user.update({
    where: {
      id: userPayload.id,
    },
    data: {
      ...othersInfo,
    },
  });
};

const getAllUserSync = async (id: string) => {
  return await prisma.user.findMany({
    where: {
      isActive: Active.activate,
      id: {
        not: id,
      },
    },
    select: {
      id: true,
      role: true,
      createdAt: true,
      username: true,
      email: true,
      userprofile: true,
    },
  });
};




export const userService = {
  getUserSync,
  updateUserSync,
  updateUserRoleSync,
  getAllUserSync,
};
