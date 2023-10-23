import mongoose, { model } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requied: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://th.bing.com/th/id/R.9dc3825792d508bf23ef411d8e0ca7e9?rik=%2bdS6bZBCZFh2Dg&pid=ImgRaw&r=0",
    },
  },

  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
