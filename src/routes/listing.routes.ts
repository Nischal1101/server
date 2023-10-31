import { Router } from "express";
import { verifyToken } from "../utils/verifyUser";
import { createListing } from "../controllers/listing.controller";
const router = Router();

router.route("/create").post(verifyToken, createListing);

export default router;
