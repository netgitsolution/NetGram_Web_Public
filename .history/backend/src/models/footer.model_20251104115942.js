import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const Footer = sequelize.define(
    'FooterRequest',
    {
        heading_text: {
            type: DataTypes.STRING
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