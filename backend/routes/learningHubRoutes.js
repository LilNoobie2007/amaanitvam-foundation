import express from "express";
import { registerForEvent, getRegistrations } from "../controllers/learningHubController.js";

const router = express.Router();

// POST new registration (Used by main.js on the public site)
router.post("/register", registerForEvent);

// GET all registrations (Used by the Admin portal)
router.get("/", getRegistrations);

export default router;