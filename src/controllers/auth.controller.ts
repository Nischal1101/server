import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import ReturnResponse from "../interface/returnResponse";
import jwt from "jsonwebtoken";
import { PUBLIC_KEY } from "../config";

interface SignupRequestBody {
  password: string;
  email: string;
  username: string;
}

export async function signup(
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
) {
  let returnResponse: ReturnResponse;
  try {
    const { email, password, username } = req.body;
    const hashedpw = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedpw,
    });
    returnResponse = {
      status: "success",
      message: "User successfully created",
      data: user,
    };
    return res.status(201).json(returnResponse);
  } catch (err: any) {
    const error = new CustomErrorHandler(
      "validation failed " + err.message,
      422
    );
    next(error);
  }
}
export async function signin(req: Request, res: Response, next: NextFunction) {
  let returnResponse: ReturnResponse;
  try {
    const { email, password } = req.body;
    const finduser = await User.findOne({ email }).select(
      "-password -createdAt -updatedAt"
    );
    if (!finduser) {
      const err = new CustomErrorHandler("Unauthorized", 401);
      return next(err);
    }
    const match = await bcrypt.compare(password, finduser.password);
    if (!match) {
      const err = new CustomErrorHandler("Unauthorized", 401);
      return next(err);
    }
    const accessToken = jwt.sign(
      { _id: finduser._id, email: finduser.email },
      PUBLIC_KEY!
    );

    returnResponse = {
      status: "success",
      message: "User successfully logged in",
      data: { finduser },
    };
    return res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(200)
      .json(returnResponse);
  } catch (err: any) {
    const error = new CustomErrorHandler(
      "Internal Server Error " + err.message,
      500
    );
    next(error);
  }
}
