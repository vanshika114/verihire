import type { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error-handler.js";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    data: null,
  });
  next();
}

export function globalErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  errorHandler(err, req, res, next);
}
