import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err: any, req: any, res: Response) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
