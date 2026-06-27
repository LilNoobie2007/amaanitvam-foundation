import Campaign from "../models/campaign.js";

// GET all campaigns
export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            campaigns
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE campaign
export const createCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);

        res.status(201).json({
            success: true,
            campaign
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};