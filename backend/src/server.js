import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { checkDbConnection, syncDatabase } from "./config/db.config.js";
import history from 'connect-history-api-fallback';
import listEndpoints from 'express-list-endpoints';

dotenv.config();

// Import Routes
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import careerRoutes from "./routes/career.routes.js";

// Page routes
import homeRoutes from "./routes/home.routes.js";
import loginRoutes from "./routes/login.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import joinUsRoutes from "./routes/joinUs.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import teamRoutes from "./routes/team.routes.js";

const app = express();

const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/career", careerRoutes);

// Admin Page routes
app.use("/api/home", homeRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/joinUs", joinUsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/team", teamRoutes);

console.log('Before static middleware:', listEndpoints(app));
// SPA routing MUST come before static so rewritten URLs get served
app.use(history({ index: '/index.html' }));
console.log('After history middleware:', listEndpoints(app));

// Static assets for frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
console.log('Static path:', path.join(__dirname, "../frontend/dist"));
console.log('After static middleware:', listEndpoints(app));

app._router?.stack?.forEach((middleware, index) => {
  if (middleware.route) {
    console.log(`Route ${index}:`, middleware.route.path, middleware.route.methods);
  } else if (middleware.name === 'router') {
    console.log(`Router ${index}:`, middleware.regexp);
  }
});
// PORT from .env
const PORT = process.env.PORT || 3000;

// Start Server
const startServer = async () => {
  try {
    await checkDbConnection();
    await syncDatabase();

    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};
startServer();