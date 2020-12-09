import { NextFunction, Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Blog } from '../entity/Blog';
import { User } from '../entity/User';
import { catchAsync } from '../utils/catchAsync';
import ApiError from '../utils/api-error';

export const getBlogs = catchAsync(async (req: Request, res: Response): Promise<Response> => {
  const blogs = await getRepository(Blog).find({
    where: [
      {active: true}
    ]
  });
  return res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: blogs
  });
});

export const getOneBlog = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response| void> => {
  const blog = await getRepository(Blog).findOne({where: [{id: req.params.id, ownerId: req.body.user.id }, {id: req.params.id, active: true}]});
  if(!blog) {
    return next(new ApiError(404, "Blog not found"));
  }
  return res.status(200).json({
    status: "success",
    data: {blog}
  });
});

export const updateBlog = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response| void> => {
  const blog = await getRepository(Blog).findOneOrFail(req.params.id);
  if (!blog) {
    return next(new ApiError(404, 'Blog not found'))
  }
    getRepository(Blog).merge(blog, req.body);
    const results = await getRepository(Blog).save(blog);
    return res.status(200).json({
      status:'success',
      data: results
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
    blogId: req.body.blogId,
    active: req.body.active
  }
  const newBlog = getRepository(Blog).create(blog);
  await getRepository(Blog).save(newBlog);
  return res.status(200).json({
    status: 'success',
    data: newBlog
  })
});

export const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response| void> => {
  if(req.body.user.role === 'ADMIN' || req.body.user.role === 'SUPERADMIN'){
    const deletedBlog = await getRepository(Blog).delete({id: req.params.id, active: true});
    if(deletedBlog.affected === 0){
      return next(new ApiError(404, "No published Blog with this Id"))
    }
    return res.status(201).json({
      status:'success',
      data: 'deleted'
    })
  } else {
    const deletedBlog =  await getRepository(Blog).delete({id: req.params.id, ownerId: req.body.user.id});
    if(deletedBlog.affected === 0){
      return next(new ApiError(404, "You don't have a personal blog with this Id"))
    }
    return res.status(201).json({
      status:'success',
      data: 'deleted'
    })
  }
});

export const getPersonalBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = req.body.user
    if(!user){
      return next(new ApiError(403, 'You are not logged in, please log in'))
    }
      const personalBlogs: Blog[] = await getRepository(Blog).find({
    where: {
      "ownerId": req.body.user.id
    }
  })
    return res.status(200).json({
    status: "success",
    quantity: personalBlogs.length,
    data: personalBlogs,
  })
})
export const publishBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const publishUnpublish = await getConnection()
    .createQueryBuilder()
    .update(Blog)
    .set({
    active: req.body.active
    })
    .returning("*")
    .where({id: req.params.id, ownerId: req.body.user.id})
    .execute()
    .then((response)=> {
    return response.raw[0];
    });
    if(!publishUnpublish) {
    return next(new ApiError(404, 'No comment with that ID'))
  }
  return res.status(200).json({
    status: 'success',
    data: publishUnpublish
  })
})


export const chechIfTheBlogIsPublished = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
  const blog = await getRepository(Blog).find({where:{ id: req.params.id, active: true}});
  if(blog.length === 0) {
    return next(new ApiError(404, 'no published blog found with this id'))
  }
  next();
})