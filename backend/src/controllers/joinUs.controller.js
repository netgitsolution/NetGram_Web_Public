import { JoinUsRequest } from "../models/joinUs.models.js";

// ----------------- CREATE OR UPDATE JOIN US -----------------
export const updateJoinUsRequest = async (req, res) => {
    try {
        const { id, heading, sub_heading, role, apply } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Sequelize upsert (create if not exist, else update)
        const [joinUsData, created] = await JoinUsRequest.upsert({
            id,
            heading,
            sub_heading,
            role,
            apply,
        });

        return res.status(200).json({
            message: created
                ? "Join Us request created successfully!"
                : "Join Us request updated successfully!",
            data: joinUsData,
        });
    } catch (error) {
        console.error("Error in updateJoinUsRequest:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
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
            error: error.message,
        });
    }
};