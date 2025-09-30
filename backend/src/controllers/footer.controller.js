import { Footer } from '../models/footer.model.js';

// ----------------- UPDATE FOOTER -----------------
export const updateFooterRequest = async (req, res) => {
    try {
        const { id, heading_text, phone_number, email, address } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        // Check if record exists
        const existingFooter = await Footer.findByPk(id);

        if (!existingFooter) {
            return res.status(404).json({ message: "No matching Footer Request found to update." });
        }

        // Update the record
        await Footer.update(
            { heading_text, phone_number, email, address },
            { where: { id } }
        );

        // Fetch updated record
        const updatedFooter = await Footer.findByPk(id);

        return res.status(200).json({
            message: "Footer request updated successfully!",
            data: updatedFooter
        });

    } catch (error) {
        console.error("Error updating Footer Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
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
            error: error.message
        });
    }
};