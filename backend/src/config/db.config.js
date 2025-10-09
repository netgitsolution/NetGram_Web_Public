import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // needed for Render
        },
    },
});

export const checkDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Postgres connected successfully");
    } catch (error) {
        console.error("❌ Failed to connect Postgres:", error);
    }
};

export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Database synced successfully");
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
};