import { Router } from 'express';

const router = Router();
import { validateDtoFunc } from '../utils/validate-midleware';
import { getUsers, createUser, deleteUsers, getUser, updateUser } from '../controllers/user.controller';
import { singup, login } from '../controllers/auth.controller';
import { validateDto } from '../dto/new-user.dto';
import { validateSingInDto } from '../dto/auth-credentials.dto';
import { protect, personalProtect } from '../controllers/auth.controller';
import { getPersonalBlogs } from '../controllers/blog.controller';


router.post('/signup', validateDtoFunc(validateDto), singup);
router.post('/signin', validateDtoFunc(validateSingInDto), login)

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUsers);

router
  .route('/:id/blogs')
  .get(protect, getPersonalBlogs);

router
  .route('/:id/blogs/:blogId')

export default router;