import { Router } from 'express';
import {
  createCommunityPost,
  getCommunityPosts,
  toggleUpvote,
} from '../controllers/communityController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getCommunityPosts);
router.post('/', authMiddleware, createCommunityPost);
router.patch('/:id/upvote', authMiddleware, toggleUpvote);

export default router;

