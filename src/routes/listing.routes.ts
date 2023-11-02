import { Router } from "express";
import { verifyToken } from "../utils/verifyUser";
import { createListing,deleteListing } from "../controllers/listing.controller";
const router = Router();

router.route("/create").post(verifyToken, createListing);
router.route("/delete/:id").delete(verifyToken, deleteListing);

export default router;
