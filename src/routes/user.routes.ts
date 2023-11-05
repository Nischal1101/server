import { Router } from "express";
import {
  deleteUser,
  getUserListings,
  updateUser,
  getUser,
} from "../controllers/user.controller";
import { verifyToken } from "./../utils/verifyUser";
const router = Router();

router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);
router.route("/listings/:id").get(verifyToken, getUserListings);
router.route("/:id").get(verifyToken, getUser);

export default router;
