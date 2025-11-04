import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
        },
        sub_heading: {
            type: String,
        },
        project_category: {
            type: [String], // Sequelize ARRAY → Array of strings
            default: [],
        },
        project: {
            type: Object, // JSONB → can store flexible objects
            default: {},
        },
    },
    {
        collection: 'blog', // same as your old table name
        timestamps: true,   // adds createdAt & updatedAt
    }
);

export const BlogRequest = mongoose.model('BlogRequest', blogSchema);