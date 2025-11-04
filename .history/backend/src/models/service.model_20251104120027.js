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
            allowNull: false,
        },
        service_card: {
            type: DataTypes.JSONB // Array of objects
        },
        flexible_section: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flexible_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: "services",
        timestamps: true,
    }
);