import { AuthenticityAgent } from "../agents/authenticity-agent.js";
import { CompanyAgent } from "../agents/company-agent.js";
import { RecruiterAgent } from "../agents/recruiter-agent.js";
import { GeminiService } from "./gemini.service.js";
import type { VerificationResult } from "../types/index.js";

export class AnalysisService {
  private authenticityAgent = new AuthenticityAgent();
  private companyAgent = new CompanyAgent();
  private recruiterAgent = new RecruiterAgent();
  private geminiService = new GeminiService();

  async analyze(
    sourceType: VerificationResult["sourceType"],
    metadata?: Record<string, unknown>
  ) {
    const [authenticity, company, recruiter, gemini] =
      await Promise.all([
        this.authenticityAgent.analyze({ sourceType, metadata }),
        this.companyAgent.analyze({ sourceType, metadata }),
        this.recruiterAgent.analyze({ sourceType, metadata }),
        this.geminiService.buildAnalysis(sourceType, metadata),
      ]);

    const score = Math.round(
      (authenticity.score + company.score + recruiter.score) / 3
    );

    const riskLevel =
      score >= 85 ? "low" : score >= 70 ? "medium" : "high";

    return {
      id: `result-${Date.now()}`,
      score,
      riskLevel,
      summary:
        gemini.summary ??
        `The ${sourceType} was analyzed successfully.`,
      recommendation:
        riskLevel === "low"
          ? "Proceed"
          : riskLevel === "medium"
          ? "Proceed carefully"
          : "Avoid",

      positiveSignals: gemini.positiveSignals ?? [],
      redFlags: gemini.redFlags ?? [],

      company: gemini.company,
      recruiterEmail: gemini.recruiterEmail,
      website: gemini.website,
      jobRole: gemini.jobRole,
      salary: gemini.salary,
      location: gemini.location,
      skills: gemini.skills,

      sourceType,
      createdAt: new Date().toISOString(),
    };
  }
}