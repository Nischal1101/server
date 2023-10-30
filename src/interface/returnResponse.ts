import { Document } from "mongoose";
import { Response } from "express";

export interface ReturnResponse {
  status: "success" | "error";
  message: string;
  data: object[] | object;
}

export interface UserDocument extends Document {
  _doc: {
    password: string;
    email: string;
    avatar?: string;
    username?: string;
  };
}


