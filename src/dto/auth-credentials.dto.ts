import * as yup from 'yup'
export const validateSingInDto = yup.object().shape({
  password: yup.string().required('Password is required'),
  email: yup.string().required('email is required').email(),
})