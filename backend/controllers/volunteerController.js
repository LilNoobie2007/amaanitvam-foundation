import VolunteerApplication from "../models/volunteerApplication.js";
import { 
    sendVolunteerConfirmationEmail, sendVolunteerAdminEmail 
} 
from "../services/emailService.js";

export const createVolunteerApplication = async (req, res) => {

    try {
        const { 
            name, email, phone, role, availability, skills, motivation 
        } 
        = req.validatedVolunteer;
        const ipAddress = req.clientIp;
        const userAgent = req.get("user-agent") || "Unknown";

        const newApplication = new VolunteerApplication({
            name,
            email,
            phone,
            role,
            availability,
            skills,
            motivation,
            ipAddress,
            userAgent,
            submissionTimestamp: new Date()
        });

        await newApplication.save();

        const [confirmationResult, adminResult] = await Promise.all([
            sendVolunteerConfirmationEmail({ 
                application: newApplication 
            }),
            sendVolunteerAdminEmail({ 
                application: newApplication 

            })
        ]);

        if (!confirmationResult || !adminResult) {
            throw new Error("Email delivery failed");
        }

        res.status(201).json({
            success: true,
            message: "Your volunteer registration has been submitted successfully."
        });

    } catch (error) {

        console.error("Volunteer registration submission failed:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit registration."
        });
    }
};
