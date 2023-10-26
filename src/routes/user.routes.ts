import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/user.controller";
import { verifyToken } from "./../utils/verifyUser";
const router = Router();

router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);

export default router;
