import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

export const PortfolioRequest = sequelize.define(
    'PortfolioRequest',
    {
        heading: {
            type: DataTypes.STRING,
        },
        sub_heading: {
            type: DataTypes.STRING,
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