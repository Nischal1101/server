import { Router } from "express";
import {
  google,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller";
import validate from "./../middlewares/validator";
import authSchema from "../../schema/authSchema";
const router = Router();

router.route("/signup").post(validate(authSchema), signup);
router.route("/signin").post(signin);
router.route("/google").post(google);
router.route("/signout").get(signout);

export default router;
