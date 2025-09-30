import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PortfolioRequest = sequelize.define(
    'PortfolioRequest',
    {
        heading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_heading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        project_stack: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
    tableName: 'portfolio',
    timestamps: true,
}
);