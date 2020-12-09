import * as yup from 'yup';
import { UserRoleEnum } from '../utils/user-role.enum';
export const changeStatusDto = yup.object().shape({
  role: yup.string().required('You have to set the role').oneOf([UserRoleEnum.user, UserRoleEnum.admin, UserRoleEnum.superadmin]),
})