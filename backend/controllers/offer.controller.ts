import type { NextFunction, Request, Response } from "express";

export async function listOffers(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true, message: "Offers placeholder", data: [] });
  } catch (error) {
    next(error);
  }
}
