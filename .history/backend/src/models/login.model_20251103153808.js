import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true, // same as allowNull: false
            unique: true,   // same as unique: true
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: false, // since Sequelize timestamps: false
        collection: "login", // same as tableName
    }
);

export const Login = mongoose.model("LoginRequest", loginSchema);