import * as yup from 'yup';
export const createBlogDto = yup.object().shape({
  title: yup.string().required('You have to set the title'),
  content: yup.string().required('You have to have content on your blog'),
  active: yup.boolean().optional().default(false),
})