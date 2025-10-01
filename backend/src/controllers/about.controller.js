import { About } from '../models/about.model.js';

// ----------------- UPDATE ABOUT -----------------
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

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Check if record exists
        const existingAbout = await About.findByPk(id);

        if (!existingAbout) {
            return res.status(404).json({ message: "No matching About Request found to update." });
        }

        // Update the record
        await About.update(
            {
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
            },
            { where: { id } }
        );

        // Fetch updated record
        const updatedAbout = await About.findByPk(id);

        return res.status(200).json({
            message: "About request updated successfully!",
            data: updatedAbout
        });

    } catch (error) {
        console.error("Error updating About Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
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
            message: "Something went wrong getAboutRequest!",
            error: error.message
        });
    }
};
