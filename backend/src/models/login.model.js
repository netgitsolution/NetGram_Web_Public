import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const Login = sequelize.define(
    "Login",
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