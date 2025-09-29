import express from 'expresss';
import { updatePortfolioRequest } from '../controllers/portfolio.controller.js';

const router = express.Router();

router.post('/request', updatePortfolioRequest);

export default router;