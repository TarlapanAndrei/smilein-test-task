import ApiError from './api-error';
import { Request, Response, NextFunction } from 'express';

export const apiErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof ApiError) {
    return res.status(err.code).json(err.message)
  }
  return res.status(500).json('someting went wrong');

}