import { PortfolioRequest } from '../models/portfolio.model.js';

export const updatePortfolioRequest = async (req, res) => {
    try {
        const {
            id,
            heading,
            sub_heading,
            project_category,
            project,
            team_heading,
            team_sub_heading,
            team_role
        } = req.body;

        if (!id) return res.status(400).json({ message: "id is required!" });

        // Sequelize upsert — create if not exists, update if it exists
        const [portfolioData, created] = await PortfolioRequest.upsert({
            id,
            heading,
            sub_heading,
            project_category,
            project,
            team_heading,
            team_sub_heading,
            team_role,
        });

        return res.status(200).json({
            message: created
                ? "Portfolio request created successfully!"
                : "Portfolio request updated successfully!",
            data: portfolioData,
        });

    } catch (error) {
        console.error("Error in updatePortfolioRequest:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getPortfolioRequest = async (req, res) => {
    try {
        const portfolioRequests = await PortfolioRequest.findAll();
        return res.status(200).json(portfolioRequests);
    } catch (error) {
        console.error("Error fetching Portfolio Requests:", error);
        return res.status(500).json({
            message: "Something went wrong in getPortfolioRequest!",
            error: error.message,
        });
    }
};