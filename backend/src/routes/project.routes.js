import express from 'express';
import { createProject, getProjects } from '../controllers/project.controller.js';

const router = express.Router();

router.post('/request', createProject);
router.get('/list', getProjects);

export default router;