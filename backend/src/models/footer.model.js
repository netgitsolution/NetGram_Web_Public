import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const Footer = sequelize.define(
    'FooterRequest',
    {
        heading: {
            type: DataTypes.STRING,
            unique: true // Make heading unique so upsert works
        },
        sub_heading: {
            type: DataTypes.STRING
        },
        heading_text: {
            type: DataTypes.STRING
        },
        quick_links: {
            type: DataTypes.ARRAY(DataTypes.STRING) // Array of objects
        },
        phone_number: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'footer',
        timestamps: true
    }
);