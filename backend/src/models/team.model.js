import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const Team = sequelize.define(
    "TeamRequest",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isUrl: true }
        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isUrl: true }
        }
    },
    {
        tableName: "team",
        timestamps: false
    }
);