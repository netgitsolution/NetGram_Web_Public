import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

export const ProjectRequest = sequelize.define(
    'Project',
    {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        phone_number: {
            type: DataTypes.STRING(15),
        },
        project_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        project_details: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: 'project_requests',
        timestamps: true,
    }
);