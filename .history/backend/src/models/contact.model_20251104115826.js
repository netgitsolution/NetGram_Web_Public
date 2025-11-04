import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

export const ContactRequest = sequelize.define(
    'ContactRequest',
    {
        your_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        your_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        your_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        select_service: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        your_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'contact_request',
        timestamps: true,
    }
);