import { About } from '../models/about.model.js';

// ----------------- CREATE or UPDATE ABOUT -----------------
export const updateAboutRequest = async (req, res) => {
    try {
        const {
            id,
            heading,
            sub_heading,
            story_heading,
            story_description,
            mission_heading,
            mission_description,
            core_values,
            meet_our_team,
            contact_service,
            mobile_number,
            email,
            address,
            business_hours,
            social_media
        } = req.body;

        if (!id) return res.status(400).json({ message: "id is required!" });

        // Sequelize upsert — create if not exists, update if exists
        const [aboutData, created] = await About.upsert({
            id,
            heading,
            sub_heading,
            story_heading,
            story_description,
            mission_heading,
            mission_description,
            core_values,
            meet_our_team,
            contact_service,
            mobile_number,
            email,
            address,
            business_hours,
            social_media
        });

        return res.status(200).json({
            message: created
                ? "About request created successfully!"
                : "About request updated successfully!",
            data: aboutData,
        });

    } catch (error) {
        console.error("Error in updateAboutRequest:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// ----------------- GET ABOUT -----------------
export const getAboutRequest = async (req, res) => {
    try {
        const aboutRequests = await About.findAll();
        return res.status(200).json(aboutRequests);
    } catch (error) {
        console.error("Error fetching About Requests:", error);
        return res.status(500).json({
            message: "Something went wrong in getAboutRequest!",
            error: error.message,
        });
    }
};