import { ErrorRequestHandler } from "express";
import errorFiltering from "./errorFiltering";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  const {
    status = 0,
    message = "",
    errorDetails = "",
  } = await errorFiltering(err);

  return res.status(status ? status : err.status ? err.status : 500).send({
    success: false,
    message: message ? message : err.message,
    errorDetails: errorDetails ? errorDetails : err,
  });
};

export default globalErrorHandler;
