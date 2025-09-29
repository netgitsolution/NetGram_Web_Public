import express from 'express';
import { updateHomeRequest } from '../controllers/home.controller.js';

const router = express.Router();

router.post('/request', updateHomeRequest);

export default router;