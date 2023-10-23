import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import { ReturnResponse, UserDocument } from "../interface/returnResponse";
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
    const finduser: UserDocument | null = await User.findOne({ email });
    if (!finduser) {
      const err = new CustomErrorHandler("Unauthorized", 401);
      return next(err);
    }
    const match = await bcrypt.compare(password, finduser._doc.password);

    if (!match) {
      const err = new CustomErrorHandler("Unauthorized", 401);
      return next(err);
    }
    const accessToken = jwt.sign(
      { _id: finduser._id, email: finduser._doc.email },
      PUBLIC_KEY!
    );

    const { password: pass, ...rest } = finduser._doc;
    returnResponse = {
      status: "success",
      message: "User successfully logged in",
      data: { rest },
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

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let returnResponse: ReturnResponse;
  try {
    const { email, photo, name } = req.body;
    const user: UserDocument | null = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        { _id: user._id, email: user._doc.email },
        PUBLIC_KEY!
      );
      const { password: pass, ...rest } = user._doc;
      returnResponse = {
        status: "success",
        message: "User successfully logged in",
        data: { rest },
      };
      return res
        .cookie("access_token", accessToken, { httpOnly: true })
        .status(200)
        .json(returnResponse);
    } else {
      const generatedPw = Math.random().toString(36).slice(-8);
      const hashedpw = await bcrypt.hash(generatedPw, 10);
      const result = await User.create({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        password: hashedpw,
        email,
        avatar: photo,
      });
      if (!result) {
        const err = new CustomErrorHandler(
          "Internal server error , no result made",
          500
        );
        return next(err);
      }
    }
  } catch (error) {
    const err = new CustomErrorHandler("Internal server error", 500);
    return next(err);
  }
};
