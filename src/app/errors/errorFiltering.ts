import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

interface IError {
  status: number;
  message: string;
  errorDetails: any;
}

const errorFiltering = async (err: any) => {
  let error = {
    status: 0,
    message: "",
    errorDetails: err,
  };
  if (err instanceof jwt.TokenExpiredError) {
    error = {
      status: httpStatus.UNAUTHORIZED,
      message: "The provided JWT (JSON Web Token) has expired.",
      errorDetails: err,
    };
  } else if (err instanceof ZodError) {
    error = {
      status: httpStatus.BAD_REQUEST,
      message: "Name field is required. Email must be a valid email address.",
      errorDetails: err,
    };
  }
  return error as IError;
};

export default errorFiltering;
