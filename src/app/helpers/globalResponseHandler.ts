import { Response } from "express";

interface IResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown> | Record<string, unknown>[] | null;
  meta?: Record<string, unknown>;
}

const globalResponseHandler = async (res: Response, data: IResponse) => {
  return res.status(data.statusCode).send({
    ...data,
  });
};

export default globalResponseHandler;
