import { Service } from "../models/service.model";

export const updateServiceRequest = async (req, res) => {
    try {
        const { heading, sub_heading, service_card, service_description, service_section, flexible_section, flexible_text } = req.body;

    } catch (error) {

    }
};

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
    };
};