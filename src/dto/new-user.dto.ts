import * as yup from 'yup'
export const validateDto = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  password: yup.string().required('Password is required'),
  email: yup.string().required().email(),
  passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), undefined], 'Passwords must match')
})