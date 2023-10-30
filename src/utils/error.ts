import { NextFunction, Response, Request } from "express";
import CustomErrorHandler from "./CustomErrorHandler";
import { NODE_ENV } from "../config";
import { ReturnResponse } from "../interface/returnResponse";

export function error(
  err: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let returnResponse: ReturnResponse;
  let statusCode = err.statusCode || 500;
  returnResponse = {
    status: "error",
    message: NODE_ENV === "dev" ? err.message : "Internal Server Error",
    data: {},
  };
  return res.status(statusCode).json(returnResponse);
}
