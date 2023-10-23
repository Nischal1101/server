import { Document } from "mongoose";

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

// interface CustomRequest extends Request {
