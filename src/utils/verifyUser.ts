import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "./CustomErrorHandler";
import { PUBLIC_KEY } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    const err = new CustomErrorHandler("no token found, unautorized", 401);
    next(err);
  }
  jwt.verify(token, PUBLIC_KEY!, (err: any, user:any) => {
    if (err) {
      const err = new CustomErrorHandler("Token not verified, Forbidden", 403);
      next(err);
    }
    req.user = user;
    next();
  });
  next();
};
