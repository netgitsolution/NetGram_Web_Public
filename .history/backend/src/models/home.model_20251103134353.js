import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema(
    {
        service_heading: {
            type: [String], // ARRAY(DataTypes.STRING) → Array of strings
            default: [],
        },
        hero_heading: {
            type: String,
            unique: true, // same as Sequelize unique constraint
        },
        hero_text: {
            type: String,
        },
        client: {
            type: [Object], // JSONB (Array of objects)
            default: [],
        },
    },
    {
        collection: 'home', // same as old table name
        timestamps: true,   // adds createdAt & updatedAt
    }
);

export const HomeRequest = mongoose.model('HomeRequest', homeSchema);