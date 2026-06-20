import InternshipApplication from "../models/internshipApplication.js";
import { 
    sendInternshipConfirmationEmail, sendInternshipAdminEmail 
} 
from "../services/emailService.js";

export const createInternshipApplication = async (req, res) => {

    try {
        const { name, email, phone, track, university, currentYear, motivation, portfolioUrl, duration } = req.validatedInternship;
        
        const newApplication = new InternshipApplication({
            name,
            email,
            phone,
            track,
            university,
            currentYear,
            motivation,
            portfolioUrl,
            duration,
            submissionTimestamp: new Date()
        });

        await newApplication.save();

        // Respond to user immediately — don't make them wait for emails
        res.status(201).json({
            success: true,
            message: "Your internship application has been submitted successfully."
        });

        // Send emails in the background (fire-and-forget)
        Promise.all([
            sendInternshipConfirmationEmail({ application: newApplication }),
            sendInternshipAdminEmail({ application: newApplication, resumeFile: req.file })
        ]).catch((emailErr) => {
            console.error("Background email delivery failed:", emailErr);
        });

    } catch (error) {

        console.error("Internship application submission failed:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit application."
        });
    }
};
