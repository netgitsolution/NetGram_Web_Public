import { DataTypes } from "sequelize";
import { sequelize } from '../config/db.config.js';

export const Navbar = sequelize.define(
    'Navbar',
    {
        heading: {
            type: DataTypes.STRING,
            unique: true // Make heading unique so upsert works
        },
        sub_heading: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'navbar',
        timestamps: true
    }
);