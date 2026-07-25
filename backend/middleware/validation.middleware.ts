import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error-handler.js";

export function validateBody(requiredFields: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const body = req.body ?? {};
    const missing = requiredFields.filter((field) => !body[field]);

    if (missing.length > 0) {
      next(new AppError(`Missing required fields: ${missing.join(", ")}`, 400));
      return;
    }

    next();
  };
}

export function validateFile(req: Request, _res: Response, next: NextFunction) {
  if (!req.file) {
    next(new AppError("A file upload is required", 400));
    return;
  }

  next();
}
