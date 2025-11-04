import { Service } from "../models/service.model.js";

// ----------------- CREATE or UPDATE SERVICE -----------------
export const updateServiceRequest = async (req, res) => {
    try {
        const {
            id,
            heading,
            sub_heading,
            service_card,
            flexible_heading,
            flexible_text
        } = req.body;

        if (!id) return res.status(400).json({ message: "id is required!" });

        // Sequelize upsert — create if not exists, update if exists
        const [serviceData, created] = await Service.upsert({
            id,
            heading,
            sub_heading,
            service_card,
            flexible_heading,  // ✅ changed from flexible_section
            flexible_text
        });

        return res.status(200).json({
            message: created
                ? "Service request created successfully!"
                : "Service request updated successfully!",
            data: serviceData,
        });

    } catch (error) {
        console.error("Error in updateServiceRequest:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// ----------------- GET SERVICE -----------------
export const getServiceRequest = async (req, res) => {
    try {
        const serviceRequests = await Service.findAll();
        return res.status(200).json(serviceRequests);
    } catch (error) {
        console.error("Error fetching Service Requests:", error);
        return res.status(500).json({
            message: "Something went wrong in getServiceRequest!",
            error: error.message,
        });
    }
};