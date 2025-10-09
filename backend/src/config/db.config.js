import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instance
export const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // ab SQL queries console me dikhenge
    }
);

// Check DB connection
export const checkDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Postgres connected successfully');
    } catch (error) {
        console.error('Failed to connect Postgres', error);
    }
};

// Sync DB (create table if not exists)
export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        // alter = update structure automatically
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};