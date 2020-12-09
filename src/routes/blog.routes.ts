import { Router } from 'express';

const router = Router();
import { validateDtoFunc } from '../utils/validate-midleware';
import { createBlogDto } from '../dto/create-blog.dto';


import { getBlogs, createBlog, deleteBlog, getOneBlog, updateBlog, getPersonalBlogs, publishBlog, chechIfTheBlogIsPublished } from '../controllers/blog.controller';
import { protect } from '../controllers/auth.controller';
import commentsRouter from './comments.routes';

router.use('/:id/comments', commentsRouter);

router
  .route('/mybloges')
  .get(protect, getPersonalBlogs)

router
  .route('/')
  .get(protect, getBlogs)
  .post(validateDtoFunc(createBlogDto), protect, createBlog)

router
  .route('/:id')
  .get(protect, getOneBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)

router
  .route('/:id/publish')
  .put(protect, publishBlog)



export default router;