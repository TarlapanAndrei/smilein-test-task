import { Router } from 'express';

const router = Router();

import { getBlogs, createBlog, deleteBlog, getBlog, updateBlog, getPersonalBlogs } from '../controllers/blog.controller';
import { protect } from '../controllers/auth.controller';


router
  .route('/')
  .get(protect, getBlogs)
  .post(protect, createBlog)

router
  .route('/:id')
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog)

export default router;