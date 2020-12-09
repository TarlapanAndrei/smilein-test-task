import { Router } from 'express';

const router = Router();
import { validateDtoFunc } from '../utils/validate-midleware';
import { getUsers, deleteUsers, getUser, uptateTheRole } from '../controllers/user.controller';
import { singup, login } from '../controllers/auth.controller';
import { validateDto } from '../dto/new-user.dto';
import { validateSingInDto } from '../dto/auth-credentials.dto';
import { protect, superAdminRestriction, adminRestriction } from '../controllers/auth.controller';
import { changeStatusDto } from '../dto/change-status.dto';


router.post('/signup', validateDtoFunc(validateDto), singup);
router.post('/signin', validateDtoFunc(validateSingInDto), login)

router
  .route('/')
  .get(protect, adminRestriction, getUsers)

router
  .route('/:id')
  .get(protect, adminRestriction, getUser)
  .delete(protect, superAdminRestriction, deleteUsers);

router
  .route('/:id/userstoupdate/:userId')
  .put(validateDtoFunc(changeStatusDto), protect, superAdminRestriction, uptateTheRole)

export default router;