import { NextFunction, Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Comment } from '../entity/Comment';
import { catchAsync } from '../utils/catchAsync';
import ApiError from '../utils/api-error';


export const getBlogComments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const allComments = await getRepository(Comment).find({
    where: {
      blogId: req.params.id
    }
  })
  return res.status(200).json({
    status: 'success',
    results: allComments.length,
    data: { allComments}
  })
})
export const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.user){
    next(new ApiError(401, 'you have to be authorized'))
 }
  const commentData = {
    ownerId: req.body.user.id,
    blogId: req.params.id,
    content: req.body.content
  }
  const newComment = getRepository(Comment).create(commentData);
  await getRepository(Comment).save(newComment);
  return res.status(200).json({
    status: 'success',
    data: newComment
  })
})


export const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updatedComment = await getConnection()
      .createQueryBuilder()
      .update(Comment)
      .set({
        content: req.body.content
      })
      .returning("*")
      .where({id: req.params.commentId, ownerId: req.body.user.id})
      .execute()
      .then((response)=> {
        return response.raw[0];
      });
      if(!updatedComment) {
        return next(new ApiError(404, 'No comment with that ID'))
      }
    return res.status(200).json({
      status: 'success',
      data: { updatedComment}
    })
})

export const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if(req.body.user.role === 'ADMIN' || req.body.user.role === 'SUPERADMIN'){
    const deletedComment: number | null | undefined = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .returning("*")
      .where("id = :id", { id: req.params.commentId})
      .execute()
      .then((response)=> {
        return response.affected;
      });
      if(!deletedComment) {
        return next( new ApiError(404, 'no comment with this Id'))
      }
      return res.status(200).json({
        status: 'success',
        data: 'deleted By Admin'
      })
  } else {
    const deletedComment: number | null | undefined = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .returning("*")
      .where('id = :id and "ownerId" = :ownerId', { id: req.params.commentId, ownerId: req.body.user.id})
      .execute()
      .then((response)=> {
        return response.affected;
      });

      if(!deletedComment) {
        return next( new ApiError(404, "You don't have any comment with this Id"))
      }

      return res.status(200).json({
        status: 'success',
        data: 'deleted',
      })
  }
})