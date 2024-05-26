import httpStatus from "http-status";
import globalResponseHandler from "../../helpers/globalResponseHandler";
import catchAsync from "../../utils/catchAsync";
import { flatService } from "./flat.service";

const addFlat = catchAsync(async (req, res) => {
  const { id } = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Flat added successfully",
    data: await flatService.addFlatSync(id, req.body),
  });
});

const getFlats = catchAsync(async (req, res) => {
  const { data, meta } = await flatService.getFlatSync(req.query);
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Flats retrieved successfully",
    data,
    meta,
  });
});

const getFlat = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Flat retrieved successfully",
    data: await flatService.getSingleFlatSync(req.params.flatId),
  });
});

const updateFlat = catchAsync(async (req, res) => {
  const { flatId } = req.params;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Flat information updated successfully",
    data: await flatService.updateFlatSync(req.body, flatId, req.user),
  });
});

const sharedFlat = catchAsync(async (req, res) => {
  const { id } = req.user;
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Flat shared retrieve successfully",
    data: await flatService.getSharedFlatRequestSync(id),
  });
});

const getFlatStats = catchAsync(async (req, res) => {
  await globalResponseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Flats Stats retrieved successfully",
    data: await flatService.getFlatStatsSync(),
  });
});
export const flatController = {
  addFlat,
  getFlats,
  updateFlat,
  sharedFlat,
  getFlatStats,
  getFlat,
};
