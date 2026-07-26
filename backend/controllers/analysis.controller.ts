import type { Request, Response, NextFunction } from "express";
import { AnalysisService } from "../services/analysis.service.js";
import { TextExtractorService } from "../services/text.extractor.service.js";
import { AppError } from "../utils/error-handler.js";

const analysisService = new AnalysisService();
const extractor = new TextExtractorService();

export async function analyzeUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { url } = req.body;

    if (!url) {
      throw new AppError("url is required", 400);
    }

    const result = await analysisService.analyze("url", {
      text: url,
    });

    res.status(200).json({
      success: true,
      message: "URL analysis completed",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function analyzeEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, subject, body } = req.body;

    if (!email) {
      throw new AppError("email is required", 400);
    }

    const text = `
Email: ${email}

Subject:
${subject ?? ""}

Body:
${body ?? ""}
`;

    const result = await analysisService.analyze("email", {
      text,
    });

    res.status(200).json({
      success: true,
      message: "Email analysis completed",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function analyzePdf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const extracted = await extractor.extract(
      req.file.buffer,
      "pdf"
    );

    const result = await analysisService.analyze("pdf", {
      text: extracted.text,
    });

    res.status(200).json({
      success: true,
      message: "PDF analysis completed",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function analyzeImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const extracted = await extractor.extract(
      req.file.buffer,
      "image"
    );

    const result = await analysisService.analyze("image", {
      text: extracted.text,
    });

    res.status(200).json({
      success: true,
      message: "Image analysis completed",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}