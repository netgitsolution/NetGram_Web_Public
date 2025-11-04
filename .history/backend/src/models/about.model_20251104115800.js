import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const About = sequelize.define(
    'AboutRequest',
    {
        heading: {
            type: DataTypes.STRING,
            unique: true // Make heading unique so upsert works
        },
        sub_heading: {
            type: DataTypes.STRING
        },
        story_heading: {
            type: DataTypes.STRING
        },
        story_description: {
            type: DataTypes.STRING
        },
        mission_heading: {
            type: DataTypes.STRING
        },
        mission_description: {
            type: DataTypes.STRING
        },
        core_values: {
            type: DataTypes.ARRAY(DataTypes.STRING) // Array of strings
        },
        meet_our_team: {
            type: DataTypes.JSONB // Array of objects
        },
        contact_service: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        mobile_number: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        business_hours: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        social_media: {
            type: DataTypes.JSONB // Array of objects
        },
    },
    {
        tableName: 'about',
        timestamps: true
    }
);