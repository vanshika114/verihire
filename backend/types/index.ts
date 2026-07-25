export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AnalyzeRequestBase {
  source: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyzeUrlRequest extends AnalyzeRequestBase {
  url: string;
}

export interface AnalyzeEmailRequest extends AnalyzeRequestBase {
  email: string;
  subject?: string;
  body?: string;
}

export interface AnalyzePdfRequest extends AnalyzeRequestBase {
  filename?: string;
  contentType?: string;
}

export interface AnalyzeImageRequest extends AnalyzeRequestBase {
  filename?: string;
  contentType?: string;
}

export interface VerificationResult {
  id: string;
  score: number;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  recommendation: string;
  signals: string[];
  redFlags: string[];
  sourceType: "url" | "email" | "pdf" | "image";
  createdAt: string;
}

export interface AnalysisResult {
  trustScore: number;
  company: string;
  summary: string;
  positives: string[];
  redFlags: string[];
  recommendation: string;
}