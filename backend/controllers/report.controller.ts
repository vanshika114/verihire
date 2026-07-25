import type { NextFunction, Request, Response } from "express";

export async function getReports(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true, message: "Reports placeholder", data: [] });
  } catch (error) {
    next(error);
  }
}
