import express from 'express';
import { createCareer, getCareer } from '../controllers/career.controller.js';
import { uploadCV } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/submit", uploadCV.single("file"), createCareer);
router.get("/", getCareer);

export default router;