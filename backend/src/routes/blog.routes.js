import express from 'express';
import { updateBlogRequest, getBlogRequest } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/request', updateBlogRequest);
router.get('/getData', getBlogRequest);

export default router;  