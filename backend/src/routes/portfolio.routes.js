import express from 'express';
import { updatePortfolioRequest, getPortfolioRequest } from '../controllers/portfolio.controller.js';

const router = express.Router();

router.post('/request', updatePortfolioRequest);
router.get('/getData', getPortfolioRequest);

export default router;