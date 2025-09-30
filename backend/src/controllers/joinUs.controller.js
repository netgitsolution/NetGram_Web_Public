import { JoinUsRequest } from "../models/joinUs.models";

export const updateJoinUsRequest = async (req, res) => {
    try {
        const { heading, heading_description, opportunities_heading } = req.body;
    } catch (error) {

    }
};

export const getJoinUsRequest = async (req, res) => {
    try {
        const joinUsRequests = await JoinUsRequest.findAll();
        return res.status(200).json(joinUsRequests);
    } catch (error) {
        console.error("Error fetching JoinUs Requests:", error);
        return res.status(500).json({
            message: "Something went wrong getJoinUsRequest!",
            error: error.message
        });
    };
};