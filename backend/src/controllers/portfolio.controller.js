import { PortfolioRequest } from '../models/portfolio.model.js';

export const updatePortfolioRequest = async (req, res) => {
    try {
        const { id, heading, sub_heading, project_category, project, team_heading, team_sub_heading, team_role } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        const existingPortfolio = await PortfolioRequest.findByPk(id);
        if (!existingPortfolio) {
            return res.status(404).json({ message: "No matching Portfolio Request found to update." });
        }

        await PortfolioRequest.update(
            { heading, sub_heading, project_category, project, team_heading, team_sub_heading, team_role },
            { where: { id } }
        );

        const updatedPortfolio = await PortfolioRequest.findByPk(id);

        return res.status(200).json({
            message: "Portfolio request updated successfully!",
            data: updatedPortfolio
        });
    } catch (error) {
        console.error("Error updating Portfolio Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        });
    }
};

export const getPortfolioRequest = async (req, res) => {
    try {
        const portfolioRequests = await PortfolioRequest.findAll();
        return res.status(200).json(portfolioRequests);
    }
    catch (error) {
        console.error("Error fetching Portfolio Requests:", error);
        return res.status(500).json({
            message: "Something went wrong in getPortfolioRequest!",
            error: error.message
        });
    }
};