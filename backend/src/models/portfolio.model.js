import { DataType, DataTypes } from 'sequelize';
import db from '../config/database.js';

export const Portfolio = db.define(
    'PortfolioRequest',
    {
        heading: {
            type: DataTypes, String,
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