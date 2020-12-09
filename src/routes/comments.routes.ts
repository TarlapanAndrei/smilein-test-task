import { Router } from 'express';

import { protect } from '../controllers/auth.controller';
import { getBlogComments, createComment, updateComment, deleteComment } from '../controllers/comment.controller';
import { chechIfTheBlogIsPublished } from '../controllers/blog.controller';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getBlogComments)
  .post(protect, chechIfTheBlogIsPublished, createComment)

router
  .route('/:commentId')
  .put(protect, updateComment)
  .delete(protect, deleteComment)

export default router;