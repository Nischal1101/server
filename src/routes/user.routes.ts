import { Router } from "express";
import {
  deleteUser,
  getUserListings,
  updateUser,
} from "../controllers/user.controller";
import { verifyToken } from "./../utils/verifyUser";
const router = Router();

router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);
router.route("/listings/:id").get(verifyToken, getUserListings);

export default router;
