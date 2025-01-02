import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

interface CustomError extends Error {
  name: string;
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: CustomError | MongooseError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation Error',
      error: err.message
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      message: 'Invalid ID format',
      error: err.message
    });
    return;
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
}; 