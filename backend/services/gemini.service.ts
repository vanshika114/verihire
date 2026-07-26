import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found");
    }

    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async buildAnalysis(
    sourceType: string,
    metadata?: Record<string, unknown>
  ) {
    const prompt = `
You are an AI job verification expert.

Return ONLY valid JSON.

${JSON.stringify(metadata ?? {}, null, 2)}
`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const cleaned = (response.text ?? "")
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);
    } catch (err) {
      console.error(err);

      return {
        company: "",
        recruiterEmail: "",
        website: "",
        salary: "",
        location: "",
        jobRole: "",
        skills: [],
        redFlags: ["Gemini analysis failed"],
        positiveSignals: [],
        summary: "Unable to analyze the offer.",
      };
    }
  }
}