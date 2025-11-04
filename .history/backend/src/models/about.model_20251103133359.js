import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
        },
        sub_heading: {
            type: String,
        },
        story_heading: {
            type: String,
        },
        story_description: {
            type: String,
        },
        mission_heading: {
            type: String,
        },
        mission_description: {
            type: String,
        },
        core_values: {
            type: Array, // JSONB → Array or Object in MongoDB
            default: [],
        },
        contact_heading: {
            type: String,
        },
        contact_sub_heading: {
            type: String,
        },
        contact_service_role: {
            type: Array, // JSONB → Array or Object
            default: [],
        },
        mobile_number: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        business_hours: {
            type: Array, // JSONB → Array
            default: [],
        },
        social_media: {
            type: Array, // JSONB → Array
            default: [],
        },
    },
    {
        collection: 'about', // optional, same as your old table name
        timestamps: true, // adds createdAt & updatedAt
    }
);

export const About = mongoose.model('About', aboutSchema);