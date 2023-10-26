import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import User from "./../models/user.model";
import { ReturnResponse, UserDocument } from "../interface/returnResponse";
import bcrypt from "bcrypt";

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let returnResponse: ReturnResponse;
  try {
    const { id } = req.params;
    const { username, email, password, avatar } = req.body;
    if (req.user._id !== id) {
      const err = new CustomErrorHandler("Can only update own account", 401);
      next(err);
    }
    let hashedUpdatedPw;
    if (password) {
      hashedUpdatedPw = await bcrypt.hash(password, 10);
    } else {
      hashedUpdatedPw = password;
    }
    const updatedUser: UserDocument | null = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          email,
          password: hashedUpdatedPw,
          avatar,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      const err = new CustomErrorHandler("Internal server error", 500);
      next(err);
    }
    const { password: pass, ...rest } = updatedUser!._doc;
    returnResponse = {
      status: "success",
      message: "User updated successfully",
      data: rest,
    };
    return res.status(200).json(returnResponse);
  } catch (error: any) {
    const err = new CustomErrorHandler(error.message, 500);
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let returnResponse: ReturnResponse;
  try {
    const { id } = req.params;
    if (req.user._id !== id) {
      const err = new CustomErrorHandler("Can only delete own account", 401);
      next(err);
    }
    const result = await User.findById(id);
    if (!result) {
      const err = new CustomErrorHandler(
        "User to be deleted doesn't exist",
        500
      );
      next(err);
    }
    await User.findByIdAndDelete(id);
    returnResponse = {
      status: "success",
      message: "User deleted successfully",
      data: {},
    };
    return res.status(200).json(returnResponse);
  } catch (error: any) {
    const err = new CustomErrorHandler(error.message, 500);
    next(err);
  }
}
