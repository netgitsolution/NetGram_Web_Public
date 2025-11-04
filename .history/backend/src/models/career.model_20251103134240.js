import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // same as Sequelize validate: isEmail
        },
        number: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'Not Specified',
        },
        join_as: {
            type: String,
            default: 'Not Specified',
        },
        message: {
            type: String,
        },
        file: {
            type: String, // path to uploaded CV
        },
    },
    {
        collection: 'career_request', // same as old table name
        timestamps: true, // adds createdAt & updatedAt
    }
);

export const CareerRequest = mongoose.model('CareerRequest', careerSchema);