import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

export const ProjectRequest = sequelize.define(
    'ProjectRequest',
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