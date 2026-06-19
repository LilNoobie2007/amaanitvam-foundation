import InternshipApplication from "../models/internshipApplication.js";
import VolunteerApplication from "../models/volunteerApplication.js";
import { 
    sendInternshipConfirmationEmail, sendInternshipAdminEmail, sendVolunteerConfirmationEmail, sendVolunteerAdminEmail 
}
 from "../services/emailService.js";

export const handleGoogleFormWebhook = async (req, res) => {

    try {
        const { 
            formType, name, email, phone 
        }
         = req.body;
        const ipAddress = req.clientIp || "Webhook";
        const userAgent = req.get("user-agent") || "Google-Forms-Webhook";

        if (formType === "internship") {

            const { 
                track, university, currentYear, motivation, portfolioUrl, startDate, duration 
            }
             = req.body;

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

            try {
                await Promise.all([
                    sendInternshipConfirmationEmail({ 
                        application: newApplication 
                    }),
                    sendInternshipAdminEmail({ 
                        application: newApplication 
                    })
                ]);
            } catch (emailError) {
                console.error("Webhook internship email delivery failed:", emailError);
            }

            res.status(201).json({
                success: true,
                message: "Internship application processed."
            });

        } else if (formType === "volunteer") {

            const { 
                role, availability, skills, motivation 
            }
             = req.body;

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

            try {
                await Promise.all([
                    sendVolunteerConfirmationEmail({ 
                        application: newApplication 
                    }),
                    sendVolunteerAdminEmail({ 
                        application: newApplication 
                    })
                ]);
            } catch (emailError) {
                console.error("Webhook volunteer email delivery failed:", emailError);
            }

            res.status(201).json({
                success: true,
                message: "Volunteer registration processed."
            });

        } else {

            res.status(400).json({
                success: false,
                message: "Invalid or missing formType. Expected 'internship' or 'volunteer'."
            });
            return;
        }

    } catch (error) {

        console.error("Webhook submission failed:", error);

        res.status(500).json({
            success: false,
            message: "Failed to process webhook submission."
        });
    }
};
