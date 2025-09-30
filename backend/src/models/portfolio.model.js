import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

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
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        project: {
            type: DataTypes.JSONB
        }
    }, {
    tableName: 'portfolio',
    timestamps: true,
}
);