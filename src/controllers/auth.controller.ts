import {promisify} from 'util';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';
import { catchAsync } from '../utils/catchAsync';
import ApiError from '../utils/api-error';


const signToken = (id: string) => {
  return jwt.sign({id}, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

export const singup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user: any = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  }

  const newUser: User[] = getRepository(User).create(user);
  
  const userJwt: User[] = await getRepository(User).save(newUser);
  const jsonstring: string = JSON.stringify(userJwt)
  const userId: string = JSON.parse(jsonstring).id
  const token: string = signToken(userId)

  return res.status(200).json({
    status: 'success',
    data: {
      newUser,
      token
    }
  })
});
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  const user = await getRepository(User).findOneOrFail({
    where: { email: email },
    select: ['password', 'id']
  })
  if(!user || !await correctPassword(password, user.password) )  {
    return next(new ApiError(404, 'incorect email or password'));
  }

  const token = signToken(user.id);
  res.status(200).json({
    status: 'success',
    user,
    token
  })
})

export const protect = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if(!token) {
    return next(new ApiError(404, 'you are not loged in, please login or sign up'))
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  const decodedString = JSON.stringify(decoded);
  const decodedObject = JSON.parse(decodedString);
  const freshUser: User = await getRepository(User).findOneOrFail(decodedObject.id);
  if(!freshUser){
    return next(new ApiError(401, 'you are not authorized, please login'))
  }
  if(changedPasswordAfter(decodedObject.iat, freshUser)) {
    return next(new ApiError(403, 'user recently changed password! Please login again'))
  }
  req.body.user = freshUser;
  next();
})

export const personalProtect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if(req.body.user !== req.params.id){
    return next(new ApiError(401, 'you canot change personal data of ather users'))
  }
  next();
})

const correctPassword = async function(candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const changedPasswordAfter = (JWTTimestamp: any, user: User) => {
  if(user.passwordChangeAt){
    const changedTimeStamp = user.passwordChangeAt.getTime()/1000;
    return JWTTimestamp < changedTimeStamp
  }
  return false;
}