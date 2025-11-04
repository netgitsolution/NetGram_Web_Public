import mongoose from "mongoose";

const projectRequestSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true, // same as allowNull: false
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // same as validate: isEmail
        },
        phone_number: {
            type: String,
            maxlength: 15, // same as DataTypes.STRING(15)
            trim: true,
        },
        project_type: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100, // same as DataTypes.STRING(100)
        },
        project_details: {
            type: String, // TEXT -> long string
            trim: true,
        },
    },
    {
        timestamps: true, // same as Sequelize timestamps: true
        collection: "project_requests", // same as tableName
    }
);

export const ProjectRequest = mongoose.model("Project", projectRequestSchema);