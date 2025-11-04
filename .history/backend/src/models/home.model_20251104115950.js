import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const HomeRequest = sequelize.define(
    'HomeRequest',
    {
        service_heading: {
            type: DataTypes.ARRAY(DataTypes.STRING) // Array of strings
        },
        hero_heading: {
            type: DataTypes.STRING,
            unique: true // Make heading unique so upsert works
        },
        hero_text: {
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