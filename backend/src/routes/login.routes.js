import express from 'express';
import { loginController } from '../controllers/login.controller.js';
import { validateLogin } from '../middlewares/validateLogin.middleware.js';

const router = express.Router();

router.post('/', validateLogin, loginController);

export default router;