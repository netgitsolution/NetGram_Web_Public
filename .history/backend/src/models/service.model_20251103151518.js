import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true, // same as allowNull: false
            trim: true,
        },
        sub_heading: {
            type: String,
            trim: true,
        },
        service_card: {
            type: [
                {
                    title: { type: String, trim: true },
                    description: { type: String, trim: true },
                    icon: { type: String, trim: true },
                },
            ], // Array of objects
            default: [],
        },
        flexible_heading: {
            type: String,
            trim: true,
        },
        flexible_text: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // same as Sequelize timestamps: true
        collection: "service_request", // same as tableName
    }
);

export const Service = mongoose.model("ServiceRequest", serviceSchema);