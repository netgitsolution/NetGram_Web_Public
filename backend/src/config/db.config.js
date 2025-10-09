import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Render or local — choose connection style
let sequelize;

if (process.env.DATABASE_URL) {
    // ✅ For Render / production
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Required by Render's managed Postgres
            },
        },
    });
} else {
    // ✅ For local development
    sequelize = new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: false,
        }
    );
}

// Check DB connection
export const checkDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Postgres connected successfully');
    } catch (error) {
        console.error('Failed to connect Postgres:', error);
    }
};

// Sync DB
export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

export { sequelize };