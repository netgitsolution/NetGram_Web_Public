import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const HomeRequest = sequelize.define(
    'HomeRequest',
    {
        service: {
            type: DataTypes.ARRAY(DataTypes.STRING) // Array of strings
        },
        heading: {
            type: DataTypes.STRING,
            unique: true // Make heading unique so upsert works
        },
        description: {
            type: DataTypes.STRING
        },
        client: {
            type: DataTypes.JSONB // Array of objects
        }
    },
    {
        tableName: 'home',
        timestamps: true
    }
);