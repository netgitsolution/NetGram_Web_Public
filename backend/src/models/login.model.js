import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const Login = sequelize.define(
    "LoginRequest",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "login",
        timestamps: false
    }
);