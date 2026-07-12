import LearningHub from "../models/LearningHub.js";

// Handle POST request from the public website
export const registerForEvent = async (req, res) => {
  try {
    const { name, email, phone, type, event, organization, message } = req.body;
    
    const newRegistration = new LearningHub({
      name, email, phone, type, event, organization, message
    });

    await newRegistration.save();
    res.status(201).json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Learning Hub registration error:", error);
    res.status(500).json({ success: false, message: "Failed to process registration." });
  }
};

// Handle GET request for the Admin Portal
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await LearningHub.find().sort({ registrationDate: -1 });
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error("Fetch Learning Hub error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
};