import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const Login = sequelize.define(
    "LoginRequest",
    {
        email: {
            type: DataTypes.STRING
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