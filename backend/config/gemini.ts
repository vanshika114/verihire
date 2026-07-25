import dotenv from "dotenv";

dotenv.config();

export const geminiConfig = {
  apiKey: process.env.GEMINI_API_KEY ?? "demo-key",
  model: process.env.GEMINI_MODEL ?? "gemini-1.5-pro",
  enabled: Boolean(process.env.GEMINI_API_KEY),
};

export function getGeminiClient() {
  return {
    apiKey: geminiConfig.apiKey,
    model: geminiConfig.model,
    enabled: geminiConfig.enabled,
  };
}
