import { Request, Response, NextFunction } from "express";
import ApiError from "./api-error";

export const validateDtoFunc = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try{
      await schema.validate(req.body);
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  }
}