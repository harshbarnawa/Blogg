import { Router } from 'express';
import { addComment, createBlog, getBlogs } from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getBlogs);
router.post('/', authMiddleware, createBlog);
router.post('/:id/comments', authMiddleware, addComment);

export default router;

