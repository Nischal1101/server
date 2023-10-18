import mongoose from "mongoose";
import { DB_URI } from "../config";
const db=async()=>{
   const conn= await mongoose.connect(DB_URI as string)
   return conn;
}
export default db;