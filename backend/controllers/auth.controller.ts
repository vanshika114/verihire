import type { NextFunction, Request, Response } from "express";

export async function login(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true, message: "Login placeholder", data: { authenticated: true } });
  } catch (error) {
    next(error);
  }
}

export async function signup(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true, message: "Signup placeholder", data: { created: true } });
  } catch (error) {
    next(error);
  }
}
