import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const JoinUsRequest = sequelize.define(
    'JoinUsRequest',
    {
        heading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        heading_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        opportunities_heading: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);