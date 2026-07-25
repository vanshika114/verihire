import type { Request, Response, NextFunction } from "express";
import { AnalysisService } from "../services/analysis.service.js";
import { AppError } from "../utils/error-handler.js";

const analysisService = new AnalysisService();

export async function analyzeUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { url } = req.body as { url?: string };

    if (!url) {
      throw new AppError("url is required", 400);
    }

    const result = await analysisService.analyze("url", { url });
    res.status(200).json({ success: true, message: "URL analysis completed", data: result });
  } catch (error) {
    next(error);
  }
}

export async function analyzeEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, subject, body } = req.body as { email?: string; subject?: string; body?: string };

    if (!email) {
      throw new AppError("email is required", 400);
    }

    const result = await analysisService.analyze("email", { email, subject, body });
    res.status(200).json({ success: true, message: "Email analysis completed", data: result });
  } catch (error) {
    next(error);
  }
}

export async function analyzePdf(req: Request, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    const result = await analysisService.analyze("pdf", {
      filename: file?.originalname,
      contentType: file?.mimetype,
    });

    res.status(200).json({ success: true, message: "PDF analysis completed", data: result });
  } catch (error) {
    next(error);
  }
}

export async function analyzeImage(req: Request, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    const result = await analysisService.analyze("image", {
      filename: file?.originalname,
      contentType: file?.mimetype,
    });

    res.status(200).json({ success: true, message: "Image analysis completed", data: result });
  } catch (error) {
    next(error);
  }
}
