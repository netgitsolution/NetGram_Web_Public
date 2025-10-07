import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

export const Service = sequelize.define(
    'ServiceRequest',
    {
        heading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_heading: {
            type: DataTypes.STRING,
        },
        service_card: {
            type: DataTypes.JSONB // Array of objects
        },
        flexible_heading: {
            type: DataTypes.STRING,
        },
        flexible_text: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: "service_request",
        timestamps: true,
    }
);