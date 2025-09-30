import express from 'express';
import { updateHomeRequest, getHomeRequest } from '../controllers/home.controller.js';

const router = express.Router();

router.post('/request', updateHomeRequest);
router.get('/getData', getHomeRequest);

export default router;