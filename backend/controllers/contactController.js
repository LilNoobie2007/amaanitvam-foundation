import Contact from "../models/contact.js";
import { 
    sendAdminNotificationEmail, sendUserAutoReplyEmail 
} from "../services/emailService.js";

export const createContact = async (req, res) => {

    try {
        const { name, email, subject, message } = req.validatedContact;
        const ipAddress = req.clientIp;
        const userAgent = req.get("user-agent") || "Unknown";

        const newContact = new Contact({
            name,
            email,
            subject,
            message,
            ipAddress,
            userAgent,
            submissionTimestamp: new Date()
        });

        await newContact.save();

        const [userEmailResult, adminEmailResult] = await Promise.all([
            sendUserAutoReplyEmail({ contact: newContact }),
            sendAdminNotificationEmail({ contact: newContact })
        ]);

        if (!userEmailResult || !adminEmailResult) {
            throw new Error("Email delivery failed");
        }

        res.status(201).json({
            success: true,
            message: "Your message has been received successfully."
        });

    } catch (error) {

        console.error("Contact submission failed:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });
    }
};