import express from 'express';
import { loginUser } from '../controllers/login.controller.js';
// import { validateLogin } from '../middlewares/validateLogin.middleware.js';

const router = express.Router();

router.post('/', loginUser);

export default router;