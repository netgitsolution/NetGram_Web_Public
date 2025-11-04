import { BlogRequest } from '../models/blog.model.js';

// ----------------- CREATE or UPDATE BLOG -----------------
export const updateBlogRequest = async (req, res) => {
    try {
        const { id, heading, sub_heading, project_category, project } = req.body;

        if (!id) return res.status(400).json({ message: "id is required!" });

        // Sequelize upsert — create if not exists, update if exists
        const [blogData, created] = await BlogRequest.upsert({
            id,
            heading,
            sub_heading,
            project_category,
            project,
        });

        return res.status(200).json({
            message: created
                ? "Blog request created successfully!"
                : "Blog request updated successfully!",
            data: blogData,
        });

    } catch (error) {
        console.error("Error in updateBlogRequest:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// ----------------- GET BLOG -----------------
export const getBlogRequest = async (req, res) => {
    try {
        const blogRequests = await BlogRequest.findAll();
        return res.status(200).json(blogRequests);
    } catch (error) {
        console.error("Error fetching Blog Requests:", error);
        return res.status(500).json({
            message: "Something went wrong in getBlogRequest!",
            error: error.message,
        });
    }
};