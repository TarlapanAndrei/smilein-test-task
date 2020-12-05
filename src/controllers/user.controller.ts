import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { catchAsync } from '../utils/catchAsync';

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

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  return res.status(200).json(user);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  if (user) {
    await getRepository(User).merge(user, req.body);
    const results = await getRepository(User).save(user);
    return res.status(200).json({
      status:'success',
      data: results
    })
  }
  return res.status(404).json({
    status:'error',
    data: 'not found'
  })
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }
  const newUser = getRepository(User).create(user);
  await getRepository(User).save(newUser);
  return res.status(200).json({
    status: 'success',
    data: newUser
  })
}
export const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
  await getRepository(User).delete(req.params.id);

  return res.status(201).json({
    status:'success',
    data: 'deleted'
  })
}