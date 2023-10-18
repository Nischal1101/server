import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import ReturnResponse from "../interface/returnResponse";

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
