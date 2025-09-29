import { Home } from '../models/home.model.js';

export const createOrUpdateHomeRequest = async (req, res) => {
    try {
        const { service, heading, description, client } = req.body;

        // Validation
        if (!heading || !description) {
            return res.status(400).json({ message: "Heading and Description required!" });
        }

        // Upsert (create or update)
        const [homeRequest, created] = await Home.upsert(
            {
                heading,
                service,
                description,
                client
            },
            {
                returning: true // returns the affected row(s)
            }
        );

        return res.status(created ? 201 : 200).json({
            message: created
                ? "Home request created successfully!"
                : "Home request updated successfully!",
            data: homeRequest
        });

    } catch (error) {
        console.error("Error creating/updating Home Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        });
    }
};