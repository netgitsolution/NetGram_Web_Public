import { JoinUsRequest } from "../models/joinUs.models.js";

// ----------------- UPDATE JOIN US -----------------
export const updateJoinUsRequest = async (req, res) => {
    try {
        const { id, heading, sub_heading, role, apply } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Check if record exists
        const existingJoinUs = await JoinUsRequest.findByPk(id);

        if (!existingJoinUs) {
            return res.status(404).json({ message: "No matching Join Us Request found to update." });
        }

        // Update the record
        await JoinUsRequest.update(
            { heading, sub_heading, role, apply },
            { where: { id } }
        );

        // Fetch updated record
        const updatedJoinUs = await JoinUsRequest.findByPk(id);

        return res.status(200).json({
            message: "Join Us request updated successfully!",
            data: updatedJoinUs
        });

    } catch (error) {
        console.error("Error updating Join Us Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        });
    }
};

// ----------------- GET JOIN US -----------------
export const getJoinUsRequest = async (req, res) => {
    try {
        const joinUsRequests = await JoinUsRequest.findAll();
        return res.status(200).json(joinUsRequests);
    } catch (error) {
        console.error("Error fetching Join Us Requests:", error);
        return res.status(500).json({
            message: "Something went wrong getJoinUsRequest!",
            error: error.message
        });
    }
};