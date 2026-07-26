import type { VerificationResult } from "../types/index.js";

interface CompanyMetadata {
  company?: string;
  website?: string;
  positiveSignals?: string[];
  redFlags?: string[];
}

export class CompanyAgent {
  async analyze(payload: {
    sourceType: VerificationResult["sourceType"];
    metadata?: CompanyMetadata;
  }) {
    const data = payload.metadata ?? {};

    let score = 100;

    const signals: string[] = [];
    const redFlags: string[] = [];

    // Company name
    if (data.company && data.company.trim() !== "") {
      signals.push(`Company identified: ${data.company}`);
    } else {
      score -= 25;
      redFlags.push("Company name missing.");
    }

    // Website
    if (data.website && data.website.trim() !== "") {
      signals.push(`Website detected: ${data.website}`);

      if (
        data.website.includes("github.io") ||
        data.website.includes("blogspot") ||
        data.website.includes("wix") ||
        data.website.includes("weebly")
      ) {
        score -= 15;
        redFlags.push("Company uses a free website builder.");
      }
    } else {
      score -= 20;
      redFlags.push("No official company website found.");
    }

    // Gemini positive signals
    if (data.positiveSignals) {
      signals.push(...data.positiveSignals);
    }

    // Gemini red flags
    if (data.redFlags) {
      redFlags.push(...data.redFlags);

      score -= data.redFlags.length * 5;
    }

    score = Math.max(0, Math.min(100, score));

    return {
      id: `company-${Date.now()}`,
      score,
      riskLevel:
        score >= 85
          ? "low"
          : score >= 70
          ? "medium"
          : "high",
      summary:
        score >= 85
          ? "Company information appears legitimate."
          : score >= 70
          ? "Company information needs verification."
          : "Company profile looks suspicious.",
      recommendation:
        score >= 85
          ? "Company signals are positive."
          : "Verify company independently before proceeding.",
      signals,
      redFlags,
      sourceType: payload.sourceType,
      createdAt: new Date().toISOString(),
    };
  }
}