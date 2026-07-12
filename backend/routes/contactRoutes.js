import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { validateContactSubmission } from "../middleware/validateContact.js";

const router = express.Router();

// POST new message from public website
router.post("/", validateContactSubmission, createContact);

// GET all messages for Admin Portal
router.get("/", getContacts); 

export default router;