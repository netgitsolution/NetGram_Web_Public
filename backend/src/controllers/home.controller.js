import { HomeRequest } from '../models/home.model.js';

export const updateHomeRequest = async (req, res) => {
    try {
        const { id, service_heading, hero_heading, hero_text, client } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Check if the record exists
        const existingHome = await HomeRequest.findByPk(id);

        if (!existingHome) {
            return res.status(404).json({ message: "No matching Home Request found to update." });
        }

        // Update the record
        await HomeRequest.update(
            { service_heading, hero_heading, hero_text, client },
            { where: { id } }
        );

        // Fetch updated record
        const updatedHome = await HomeRequest.findByPk(id);

        return res.status(200).json({
            message: "Home request updated successfully!",
            data: updatedHome
        });

    } catch (error) {
        console.error("Error updating Home Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        });
    }
};