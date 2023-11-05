import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import User from "./../models/user.model";
import { ReturnResponse, UserDocument } from "../interface/returnResponse";
import bcrypt from "bcrypt";
import Listing from "./../models/listing.model";

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
    let hashedUpdatedPw: string;
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
    return res.status(200).json(returnResponse).clearCookie("access_token");
  } catch (error: any) {
    const err = new CustomErrorHandler(error.message, 500);
    return next(err);
  }
}

export const getUserListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let returnResponse: ReturnResponse;
  try {
    if (req.user._id !== req.params.id) {
      const err = new CustomErrorHandler("Can only get own listings", 401);
      return next(err);
    }
    const listings = await Listing.find({ userRef: req.params.id });
    returnResponse = {
      status: "success",
      message: "Listings fetched successfully",
      data: listings,
    };
    res.status(200).json(returnResponse);
  } catch (error: any) {
    const err = new CustomErrorHandler(error.message, 500);
    return next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let returnResponse: ReturnResponse;
  try {
    const user: UserDocument | null = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }
    const { password, ...rest } = user._doc;
    returnResponse = {
      status: "success",
      message: "User fetched successfully",
      data: rest,
    };
    res.status(200).json(returnResponse);
  } catch (error: any) {
    return next(new CustomErrorHandler(error.message, 500));
  }
};
