import express from 'express';
import { updateBlogRequest, getBlogRequest } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/blog', updateBlogRequest);
router.get('/getData', getBlogRequest);

export default router;  