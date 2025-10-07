import express from 'express';
import { updateJoinUsRequest, getJoinUsRequest } from '../controllers/joinUs.controller.js';

const router = express.Router();

router.post('/request', updateJoinUsRequest);
router.get('/getData', getJoinUsRequest);

export default router;