import { NextFunction, Request, Response } from "express-serve-static-core";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import Listing from "../models/listing.model";
import { ReturnResponse } from "./../interface/returnResponse";

export const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let returnResponse: ReturnResponse;
  try {
    const listing = await Listing.create(req.body);
    returnResponse = {
      status: "success",
      message: "",
      data: listing,
    };
    return res.status(201).json(returnResponse);
  } catch (error: any) {
    next(new CustomErrorHandler(error.message, 500));
  }
};
