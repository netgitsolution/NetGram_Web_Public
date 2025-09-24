import { CareerRequest } from "../models/career.model.js";
import { sendCareerMail } from "../config/mailer.config.js";

// Controller
export const createCareer = async (req, res) => {
    try {
        const { your_name, your_email, your_number, select_role, join_as, your_message } = req.body;

        const filePath = req.file ? req.file.path : null;

        const newCareer = await CareerRequest.create({
            your_name,
            your_email,
            your_number,
            select_role: select_role || "Not Specified", // agar blank ho toh default
            join_as: join_as || "Not Specified",
            your_message,
            file: filePath,
        });

        await sendCareerMail(newCareer);

        res.status(201).json({
            message: "Application submitted successfully",
            data: newCareer,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCareer = async (req, res) => {
    try {
        const careers = await CareerRequest.findAll({ order: [["createdAt", "DESC"]] });
        res.json(careers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};