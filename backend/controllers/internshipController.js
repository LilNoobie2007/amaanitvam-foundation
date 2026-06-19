import InternshipApplication from "../models/internshipApplication.js";
import { 
    sendInternshipConfirmationEmail, sendInternshipAdminEmail 
} 
from "../services/emailService.js";

export const createInternshipApplication = async (req, res) => {

    try {
        const { name, email, phone, track, university, currentYear, motivation, portfolioUrl, startDate, duration } = req.validatedInternship;
        const ipAddress = req.clientIp;
        const userAgent = req.get("user-agent") || "Unknown";

        const newApplication = new InternshipApplication({
            name,
            email,
            phone,
            track,
            university,
            currentYear,
            motivation,
            portfolioUrl,
            startDate,
            duration,
            ipAddress,
            userAgent,
            submissionTimestamp: new Date()
        });

        await newApplication.save();

        const [confirmationResult, adminResult] = await Promise.all([
            sendInternshipConfirmationEmail({ application: newApplication }),
            sendInternshipAdminEmail({ application: newApplication })
        ]);

        if (!confirmationResult || !adminResult) {
            throw new Error("Email delivery failed");
        }

        res.status(201).json({
            success: true,
            message: "Your internship application has been submitted successfully."
        });

    } catch (error) {

        console.error("Internship application submission failed:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit application."
        });
    }
};
