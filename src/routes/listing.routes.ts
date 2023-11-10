import { Router } from "express";
import { verifyToken } from "../utils/verifyUser";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller";
const router = Router();

router.route("/create").post(verifyToken, createListing);
router.route("/delete/:id").delete(verifyToken, deleteListing);
router.route("/update/:id").post(verifyToken, updateListing);
router.route("/get/:id").get(getListing);
router.route("/get").get(getListings);

export default router;
