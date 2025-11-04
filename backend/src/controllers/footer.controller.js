import { Footer } from '../models/footer.model.js';

// ----------------- CREATE OR UPDATE FOOTER -----------------
export const updateFooterRequest = async (req, res) => {
    try {
        const { id, heading_text, phone_number, email, address } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Sequelize upsert (create if not exist, else update)
        const [footerData, created] = await Footer.upsert({
            id,
            heading_text,
            phone_number,
            email,
            address,
        });

        return res.status(200).json({
            message: created
                ? "Footer request created successfully!"
                : "Footer request updated successfully!",
            data: footerData,
        });
    } catch (error) {
        console.error("Error in updateFooterRequest:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// ----------------- GET FOOTER -----------------
export const getFooterRequest = async (req, res) => {
    try {
        const footerRequests = await Footer.findAll();
        return res.status(200).json(footerRequests);
    } catch (error) {
        console.error("Error fetching Footer Requests:", error);
        return res.status(500).json({
            message: "Something went wrong getFooterRequest!",
            error: error.message,
        });
    }
};