import { Service } from "../models/service.model.js";

// Update Service Request
export const updateServiceRequest = async (req, res) => {
    try {
        const { id, heading, sub_heading, service_card, flexible_section, flexible_text } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Check if the record exists
        const existingService = await Service.findByPk(id);

        if (!existingService) {
            return res.status(404).json({ message: "No matching Service Request found to update." });
        }

        // Update the record
        await Service.update(
            { heading, sub_heading, service_card, flexible_section, flexible_text },
            { where: { id } }
        );

        // Fetch updated record
        const updatedService = await Service.findByPk(id);

        return res.status(200).json({
            message: "Service request updated successfully!",
            data: updatedService
        });

    } catch (error) {
        console.error("Error updating Service Request:", error);
        return res.status(500).json({
            message: "Something went wrong updateServiceRequest!",
            error: error.message
        });
    }
};

// Get all Service Requests
export const getServiceRequest = async (req, res) => {
    try {
        const serviceRequests = await Service.findAll();
        return res.status(200).json(serviceRequests);
    } catch (error) {
        console.error("Error fetching Service Requests:", error);
        return res.status(500).json({
            message: "Something went wrong getServiceRequest!",
            error: error.message
        });
    }
};
