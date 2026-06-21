import express from "express";
import { createDonationOrder, verifyDonationPayment } from "../controllers/donationController.js";
import { validateDonation } from "../middleware/validateDonation.js";

const router = express.Router();

router.post("/create-order", validateDonation, createDonationOrder);
router.post("/verify", verifyDonationPayment);

export default router;
