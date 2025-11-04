import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const CareerRequest = sequelize.define(
    "CareerRequest",
    {
        your_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        your_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        your_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        select_role: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Not Specified",
        },
        join_as: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Not Specified",
        },
        your_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true, // CV ka path save hoga
        },
    },
    {
        tableName: "career_request",
        timestamps: true,
    }
);