import { ControllerType } from "@/types";
import { ErrorHandler } from "@/utils/helper";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const TryCatch =
  (func: ControllerType): RequestHandler =>
  (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
