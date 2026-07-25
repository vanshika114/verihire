import type { VerificationResult } from "../types/index.js";

export class CompanyAgent {
  async analyze(payload: { sourceType: VerificationResult["sourceType"]; metadata?: Record<string, unknown> }) {
    return {
      id: `company-${Date.now()}`,
      score: 87,
      riskLevel: "low" as const,
      summary: "The company profile appears registered and publicly identifiable.",
      recommendation: "Company signals are positive.",
      signals: ["Company records found", "Web presence detected"],
      redFlags: ["Website age is short"],
      sourceType: payload.sourceType,
      createdAt: new Date().toISOString(),
    };
  }
}
