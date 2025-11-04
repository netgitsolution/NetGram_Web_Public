import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema(
    {
        heading_text: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    {
        collection: 'footer', // same name as old SQL table
        timestamps: true, // adds createdAt & updatedAt automatically
    }
);

export const Footer = mongoose.model('Footer', footerSchema);