import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const About = sequelize.define(
    'AboutRequest',
    {
        heading: {
            type: DataTypes.STRING,
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
            type: DataTypes.JSONB
        },
        contact_heading: {
            type: DataTypes.STRING
        },
        contact_sub_heading: {
            type: DataTypes.STRING
        },
        contact_service_role: {
            type: DataTypes.JSONB
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
            type: DataTypes.JSONB
        },
        social_media: {
            type: DataTypes.JSONB
        },
    },
    {
        tableName: 'about',
        timestamps: true
    }
);