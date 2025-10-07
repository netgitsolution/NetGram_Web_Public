import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const CareerRequest = sequelize.define(
    "CareerRequest",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Not Specified",
        },
        join_as: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Not Specified",
        },
        message: {
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