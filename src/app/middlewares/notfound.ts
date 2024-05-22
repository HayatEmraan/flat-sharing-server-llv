import { RequestHandler } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = async (req, res) => {
  return res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: "api route not found",
    error: {
      path: req.originalUrl,
    },
  });
};

export default notFound;
