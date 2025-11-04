import { HomeRequest } from '../models/home.model.js';

// export const updateHomeRequest = async (req, res) => {
//     try {
//         const { id, service_heading, hero_heading, hero_text, client } = req.body;

//         if (!id) {
//             return res.status(400).json({ message: "id is required!" });
//         }

//         // Check if the record exists
//         const existingHome = await HomeRequest.findByPk(id);

//         if (!existingHome) {
//             return res.status(404).json({ message: "No matching Home Request found to update." });
//         }

//         // Update the record
//         await HomeRequest.update(
//             { service_heading, hero_heading, hero_text, client },
//             { where: { id } }
//         );

//         // Fetch updated record
//         const updatedHome = await HomeRequest.findByPk(id);

//         return res.status(200).json({
//             message: "Home request updated successfully!",
//             data: updatedHome
//         });

//     } catch (error) {
//         console.error("Error updating Home Request:", error);
//         return res.status(500).json({
//             message: "Something went wrong!",
//             error: error.message
//         });
//     }
// };

export const updateHomeRequest = async (req, res) => {
    try {
        const { id, service_heading, hero_heading, hero_text, client } = req.body;

        if (!id) return res.status(400).json({ message: "id is required!" });

        // Sequelize upsert (create if not exist, else update)
        const [homeData, created] = await HomeRequest.upsert({
            id,
            service_heading,
            hero_heading,
            hero_text,
            client,
        });

        res.json({
            message: created ? "Home request created successfully!" : "Home request updated successfully!",
            data: homeData,
        });
    } catch (error) {
        console.error("Error in updateHomeRequest:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const getHomeRequest = async (req, res) => {
    try {
        const homeRequests = await HomeRequest.findAll();
        return res.status(200).json(homeRequests);
    } catch (error) {
        console.error("Error fetching Home Requests:", error);
        return res.status(500).json({
            message: "Something went wrong getHomeRequest!",
            error: error.message
        });
    }
};