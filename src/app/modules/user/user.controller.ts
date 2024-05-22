import httpStatus from "http-status";
import globalResponseHandler from "../../helpers/globalResponseHandler";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";

const getUserProfile = catchAsync(async (req, res) => {
  const { id } = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: await userService.getUserSync(id),
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const { id } = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: await userService.updateUserSync(id, req.body),
  });
});


const updateUserRole = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User role updated successfully",
    data: await userService.updateUserRoleSync(req.body),
  });
});


export const userController = {
  getUserProfile,
  updateUserProfile,
  updateUserRole,
};
