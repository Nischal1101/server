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

export const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let returnResponse: ReturnResponse;
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new CustomErrorHandler("Listing not found", 404));
  }
  if (req.user._id !== listing.userRef) {
    return next(new CustomErrorHandler("Unauthorized", 401));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    returnResponse = {
      status: "success",
      message: "Listing deleted successfully",
      data: {},
    };
    res.status(200).json(returnResponse);
  } catch (error: any) {
    return next(new CustomErrorHandler(error.message, 500));
  }
};

export const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let returnResponse: ReturnResponse;
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new CustomErrorHandler("Listing not found", 404));
  }
  if (req.user._id !== listing.userRef) {
    return next(new CustomErrorHandler("Unauthorized", 401));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedListing) {
      const err = new CustomErrorHandler("Internal server error", 500);
      return next(err);
    }
    returnResponse = {
      status: "success",
      message: "Listing updated successfully",
      data: updatedListing,
    };
    res.status(200).json(returnResponse);
  } catch (error: any) {
    return next(new CustomErrorHandler(error.message, 500));
  }
};



export const getListing=async(req:Request,res:Response,next:NextFunction)=>
{
  let returnResponse:ReturnResponse;
  try {
    const listing=await Listing.findById(req.params.id);
    if(!listing)
    {
      return next(new CustomErrorHandler("Listing not found",404));
    }
    returnResponse={
      status:"success",
      message:"Listing found",
      data:listing
    }
    res.status(200).json(returnResponse);
  } catch (error:any) {
    return next(new CustomErrorHandler(error.message,500));
  }
}
