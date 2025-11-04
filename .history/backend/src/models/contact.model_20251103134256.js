import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        your_name: {
            type: String,
            required: true,
        },
        your_email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },
        your_number: {
            type: String,
            required: true,
        },
        select_service: {
            type: String,
            required: true,
        },
        your_message: {
            type: String,
        },
    },
    {
        collection: 'contact_request', // same as your SQL table
        timestamps: true, // adds createdAt & updatedAt
    }
);

export const ContactRequest = mongoose.model('ContactRequest', contactSchema);