import express from 'express';
import { createHomeRequest } from '../controllers/home.controller.js';

const router = express.Router();

router.post('/request', createHomeRequest);

export default router;