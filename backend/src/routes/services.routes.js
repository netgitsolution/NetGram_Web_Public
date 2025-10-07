import express from 'express';
import { updateServiceRequest, getServiceRequest } from '../controllers/service.controller.js';

const router = express.Router();

router.post('/request', updateServiceRequest);
router.get('/getData', getServiceRequest);

export default router;