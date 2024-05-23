import httpStatus from "http-status";
import globalResponseHandler from "../../helpers/globalResponseHandler";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, ...othersInfo } = await authService.loginSync(req.body);
  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // Cookie expires after 15 minutes
    httpOnly: true, // The cookie is not accessible via JavaScript
    secure: false, // The cookie is only sent over HTTPS
    sameSite: "none", // The cookie is only sent in first-party contexts
  });

  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: {
      accessToken,
      ...othersInfo,
    },
  });
});

const createUser = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: await authService.registerSync(req.body),
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User password changed successfully",
    data: await authService.passwordChangeSync(email, req.body),
  });
});

const confirmMail = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Email confirmation code sent successfully",
    data: await authService.confirmMail(req.body.email),
  });
});

const checkUsername = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "This username is available",
    data: await authService.checkUsernameSync(req.body.username),
  });
});

const checkEmail = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "This email is available",
    data: await authService.checkEmailSync(req.body.email),
  });
});

export const authController = {
  loginUser,
  createUser,
  checkUsername,
  changePassword,
  confirmMail,
  checkEmail,
};
