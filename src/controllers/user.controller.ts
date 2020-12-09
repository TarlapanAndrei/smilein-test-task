import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { catchAsync } from '../utils/catchAsync';
import { UserRoleEnum } from '../utils/user-role.enum';
import ApiError from '../utils/api-error';

export const getUsers = catchAsync( async (req: Request, res: Response): Promise<Response> => {
  const users = await getRepository(User).find();
  return res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users
    }
   });
})

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response| void> => {
  const user = await getRepository(User).findOne(req.params.id);
  if(!user) {
    return next(new ApiError(404, 'no user with this id'))
  }
  return res.status(200).json({
    status: 'success',
    data: user
  });
}
export const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
  await getRepository(User).delete(req.params.id);

  return res.status(201).json({
    status:'success',
    data: 'deleted'
  })
}
export const uptateTheRole = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
  const userToUpdate = await getRepository(User).findOneOrFail(req.params.userId);
  console.log(req.params.userId);
  if(!userToUpdate) {
    return next(new ApiError(404, 'no user find with this id'))
  }
  await getRepository(User).merge(userToUpdate, req.body);
  const results = await getRepository(User).save(userToUpdate);
  return res.status(200).json({
    status:'success',
    data: results
  })
})