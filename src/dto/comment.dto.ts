import * as yup from 'yup';
export const createCommentDto = yup.object().shape({
  content: yup.string().required('comment field can not be empty').max(200),
})