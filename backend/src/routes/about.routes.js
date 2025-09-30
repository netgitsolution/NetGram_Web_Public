import express from 'express';
import { updateAboutRequest, getAboutRequest } from '../controllers/about.controller.js';

const router = express.Router();

router.post('/request', updateAboutRequest);
router.get('/getData', getAboutRequest);

export default router;