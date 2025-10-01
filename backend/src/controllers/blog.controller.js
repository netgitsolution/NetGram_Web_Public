import { BlogRequest } from '../models/blog.model.js';

export const updateBlogRequest = async (req, res) => {
    try {
        const { id, heading, sub_heading, project_category, project } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required!" });
        }

        const existingBlog = await BlogRequest.findByPk(id);
        if (!existingBlog) {
            return res.status(404).json({ message: "No matching Blog Request found to update." });
        }

        await BlogRequest.update(
            { heading, sub_heading, project_category, project },
            { where: { id } }
        );

        const updatedBlog = await BlogRequest.findByPk(id);

        return res.status(200).json({
            message: "Blog request updated successfully!",
            data: updatedBlog
        });
    } catch (error) {
        console.error("Error updating Blog Request:", error);
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        });
    }
};

export const getBlogRequest = async (req, res) => {
    try {
        const BlogRequests = await BlogRequest.findAll();
        return res.status(200).json(BlogRequests);
    }
    catch (error) {
        console.error("Error fetching Blog Requests:", error);
        return res.status(500).json({
            message: "Something went wrong in getBlogRequest!",
            error: error.message
        });
    }
};