import { Router } from "express";
import { updateUser } from "../controllers/user.controller";
import { verifyToken } from "./../utils/verifyUser";
const router = Router();

router.route("/update/:id").post(verifyToken, updateUser);

export default router;
