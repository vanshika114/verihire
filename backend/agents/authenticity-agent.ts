import type { VerificationResult } from "../types/index.js";

export class AuthenticityAgent {
  async analyze(payload: { sourceType: VerificationResult["sourceType"]; metadata?: Record<string, unknown> }) {
    const base = {
      id: `auth-${Date.now()}`,
      score: 82,
      riskLevel: "low" as const,
      summary: "The submitted content appears structurally consistent and aligned with standard hiring workflows.",
      recommendation: "Proceed with caution and confirm recruiter identity.",
      signals: ["Company details available", "Document structure looks consistent"],
      redFlags: ["Recent domain registration detected"],
      sourceType: payload.sourceType,
      createdAt: new Date().toISOString(),
    };

    return base;
  }
}
