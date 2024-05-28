import { Active, PrismaClient } from "@prisma/client";
import { IUser, IUserLogin } from "../../../interface";
import { jwt } from "../../helpers/jwt";
import { BCRYPT_CREDENTIALS, JWT_CREDENTIALS } from "../../../config";
import { bcrypt } from "../../helpers/bcrypt";
import appError from "../../errors/appError";
import httpStatus from "http-status";
import { TUserChangePassword, TUserRoot } from "./auth.types";
import accountCreateConfirmation from "../../../mailer/account.confirmation";
import { sendEmail } from "../../../mailer/nodemailer";
import generateSixDigitCode from "./auth.utils";
import emailConfirmation from "../../../mailer/email.confirmation";

const prisma = new PrismaClient();

const loginSync = async (data: IUserLogin) => {
  const user = await prisma.user.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              email: {
                equals: data.emailOrUsername,
                mode: "insensitive",
              },
            },
            {
              username: {
                equals: data.emailOrUsername,
                mode: "insensitive",
              },
            },
          ],
        },
        {
          isActive: Active.activate,
        },
      ],
    },
  });

  if (!user) {
    throw new appError("User not found", httpStatus.NOT_FOUND);
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
  };

  const accessToken = await jwt.encodeToken(
    JWT_CREDENTIALS.access_key as string,
    payload,
    JWT_CREDENTIALS.access_expire as string
  );

  return {
    ...payload,
    accessToken,
  };
};

const registerSync = async (data: IUser) => {
  const { password } = data;

  // await prisma.user.deleteMany({});

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

  if (user) {
    const confirmationHTML = accountCreateConfirmation(user.username);
    sendEmail(user.email, confirmationHTML, "Account Creation Confirmation");
  }

  return user;
};

const passwordChangeSync = async (
  id: string,
  userCredentials: TUserChangePassword
) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
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
      id,
    },
    data: {
      password: hash,
    },
  });
};

const checkEmailSync = async (payload: string) => {
  const checkUsernameIsExist = await prisma.user.findUnique({
    where: {
      email: payload,
    },
  });

  if (checkUsernameIsExist) {
    throw new appError(
      `${payload} - (email is already exist)`,
      httpStatus.CONFLICT
    );
  }

  return {
    available: true,
    checking: `you can register with this email - (${payload})`,
  };
};

const checkUsernameSync = async (payload: string) => {
  const checkUsernameIsExist = await prisma.user.findUnique({
    where: {
      username: payload,
    },
  });

  if (checkUsernameIsExist) {
    throw new appError(
      `${payload} - (username not available)`,
      httpStatus.CONFLICT
    );
  }

  return {
    available: true,
    checking: `you can register with this username - (${payload})`,
  };
};

const confirmMail = async (payload: string) => {
  const code = generateSixDigitCode();

  const insertIntoConfirm = await prisma.confirm.create({
    data: {
      email: payload,
      code: Number(code),
    },
  });

  if (!insertIntoConfirm) {
    throw new appError(
      `something went wrong, please try again`,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }

  if (insertIntoConfirm) {
    const confirmationHTML = emailConfirmation(Number(code));
    sendEmail(payload, confirmationHTML, "Email verify Confirmation");
  }

  return insertIntoConfirm;
};

export const authService = {
  loginSync,
  registerSync,
  passwordChangeSync,
  checkUsernameSync,
  checkEmailSync,
  confirmMail,
};
