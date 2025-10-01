import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const JoinUsRequest = sequelize.define(
    'JoinUsRequest',
    {
        heading: {
            type: DataTypes.STRING
        },
        sub_heading: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        apply: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }
);