import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            trim: true,
        },
        sub_heading: {
            type: String,
            trim: true,
        },
        project_category: {
            type: [String], // ARRAY of strings
            default: [],
        },
        project: {
            type: mongoose.Schema.Types.Mixed, // JSONB -> flexible JSON object
            default: {},
        },
        team_heading: {
            type: String,
            trim: true,
        },
        team_sub_heading: {
            type: String,
            trim: true,
        },
        team_role: {
            type: mongoose.Schema.Types.Mixed, // JSONB -> flexible JSON object
            default: {},
        },
    },
    {
        timestamps: true, // same as Sequelize timestamps: true
        collection: "portfolio", // same as tableName
    }
);

export const PortfolioRequest = mongoose.model("PortfolioRequest", portfolioSchema);