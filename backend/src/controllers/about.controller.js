import { About } from "../models/about.model";

export const updateAbout = async (req, res) => {
    try {
        const { heading, sub_heading, story_heading, story_description, mission_heading, mission_description, core_values, mobile_number, email, address, business_hours, social_media } = req.body;
    } catch (error) {

    }
};

export const getAbout = async (req, res) => {
    try {
        const abouts = await About.findAll();
        return res.status(200).json(abouts);
    }
    catch (error) {
        console.error("Error fetching About data:", error);
        return res.status(500).json({
            message: "Something went wrong getAbout!",
            error: error.message
        });
    };
};