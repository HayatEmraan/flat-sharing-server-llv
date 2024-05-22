import { Active, Prisma, PrismaClient } from "@prisma/client";
import { IUser } from "../../interface";
import { jwt } from "../../helpers/jwt";
import { BCRYPT_CREDENTIALS, JWT_CREDENTIALS } from "../../config";
import { bcrypt } from "../../helpers/bcrypt";
import appError from "../../errors/appError";
import httpStatus from "http-status";
import { TUserChangePassword, TUserRoot } from "./auth.types";

const prisma = new PrismaClient();

const loginSync = async (data: IUser) => {
  let condition: Prisma.UserWhereUniqueInput;

  if (data.username) {
    condition = {
      username: data.username,
    };
  } else if (data.email) {
    condition = {
      email: data.email,
    };
  } else {
    throw new appError(
      "User unauthorized or not found",
      httpStatus.UNAUTHORIZED
    );
  }

  const user = await prisma.user.findUnique({
    where: condition,
  });

  if (!user) {
    throw new appError(
      "User unauthorized or not found",
      httpStatus.UNAUTHORIZED
    );
  }

  const compare = await bcrypt.comparePassword(
    user.password,
    data.password as string
  );

  if (!compare) {
    throw new appError("Password not matched", httpStatus.UNAUTHORIZED);
  }

  const payload = {
    id: user.id,
    role: user.role,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.encodeToken(
    JWT_CREDENTIALS.access_key as string,
    payload,
    JWT_CREDENTIALS.access_expire as string
  );

  return {
    ...payload,
    token,
  };
};

const registerSync = async (data: IUser) => {
  const { password } = data;

  const hash = await bcrypt.hashPassword(
    BCRYPT_CREDENTIALS.bcrypt_rounds as string,
    password
  );

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hash,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: false,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

const passwordChangeSync = async (
  email: string,
  userCredentials: TUserChangePassword
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      isActive: Active.activate,
    },
  });

  if (!user) {
    throw new appError(
      "User unauthorized or not found",
      httpStatus.UNAUTHORIZED
    );
  }
  const compare = await bcrypt.comparePassword(
    user.password,
    userCredentials.oldPassword as string
  );

  if (!compare) {
    throw new appError("Password not matched", httpStatus.UNAUTHORIZED);
  }

  const hash = await bcrypt.hashPassword(
    BCRYPT_CREDENTIALS.bcrypt_rounds as string,
    userCredentials.newPassword
  );

  return await prisma.user.update({
    where: {
      email: email,
      isActive: Active.activate,
    },
    data: {
      password: hash,
    },
  });
};

const userNameOrMailChangeSync = async (
  email: string,
  userCredentials: TUserRoot
) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userInfo) {
    throw new appError(
      "User unauthorized or not found",
      httpStatus.UNAUTHORIZED
    );
  }

  const user = await prisma.user.update({
    where: {
      username: userInfo.username,
      email: userInfo.email,
      isActive: Active.activate,
    },
    data: {
      ...userCredentials,
    },
  });

  const payload = {
    id: user.id,
    role: user.role,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.encodeToken(
    JWT_CREDENTIALS.access_key as string,
    payload,
    JWT_CREDENTIALS.access_expire as string
  );
  return {
    ...payload,
    token,
  };
};

export const authService = {
  loginSync,
  registerSync,
  passwordChangeSync,
  userNameOrMailChangeSync,
};
