import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Blog } from '../entity/Blog';
import { User } from '../entity/User';
import { catchAsync } from '../utils/catchAsync';
import ApiError from '../utils/api-error';

export const getBlogs = catchAsync(async (req: Request, res: Response): Promise<Response> => {
  const blogs = await getRepository(Blog).find({
    where: [
      {active: true},
      {active: false, ownerId: req.body.user.id}
    ]
  });
  return res.status(200).json({
    status: 'success',
    length: blogs.length,
    data: blogs
  });
});

export const getBlog = catchAsync(async (req: Request, res: Response): Promise<Response> => {
  const blog = await getRepository(Blog).findOne(req.params.id);
  return res.status(200).json(blog);
});

export const updateBlog = catchAsync(async (req: Request, res: Response): Promise<Response> => {
  const blog = await getRepository(Blog).findOne(req.params.id);
  if (blog) {
    await getRepository(Blog).merge(blog, req.body);
    const results = await getRepository(Blog).save(blog);
    return res.status(200).json({
      status:'success',
      data: results
    })
  }
  return res.status(404).json({
    status:'error',
    data: 'not found'
  })
});

export const createBlog = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    if(!req.body.user){
     next(new ApiError(401, 'you hav to be authorized'))
  }
  const blog = {
    title: req.body.title,
    content: req.body.content,
    ownerId: req.body.user.id,
    blogId: req.body.blogId
  }
  const newBlog = getRepository(Blog).create(blog);
  await getRepository(Blog).save(newBlog);
  return res.status(200).json({
    status: 'success',
    data: newBlog
  })
});

export const deleteBlog = catchAsync(async (req: Request, res: Response): Promise<Response> => {
await getRepository(Blog).delete(req.params.id);

return res.status(201).json({
  status:'success',
  data: 'deleted'
})
});

export const getPersonalBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log(req.params.id);
  console.log(req.body.user.id);
  if(req.params.id === req.body.user.id){
      const personalBlogs: Blog[] = await getRepository(Blog).find({
    where: {
      "ownerId": req.params.id
    }
  })
    return res.status(200).json({
    status: "success",
    quantity: personalBlogs.length,
    data: personalBlogs,
  })
  } else {
    getBlogs(req, res, next);
  }
})