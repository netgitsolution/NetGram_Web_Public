import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

export const CareerRequest = sequelize.define(
    'CareerRequest',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Invalid email format',
                },
            },
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Not Specified',
        },
        join_as: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Not Specified',
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        file: {
            type: DataTypes.STRING, // store file path or file name
            allowNull: true,
        },
    },
    {
        tableName: 'career_request', // same name as MongoDB collection
        timestamps: true, // adds createdAt & updatedAt automatically
    }
);