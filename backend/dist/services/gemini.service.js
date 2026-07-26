import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
export class GeminiService {
    async buildAnalysis(sourceType, metadata) {
        const prompt = `
You are an AI job verification expert.

Analyze the following job offer.

Return ONLY valid JSON.

The JSON format should be:

{
  "company": "",
  "recruiterEmail": "",
  "website": "",
  "salary": "",
  "location": "",
  "jobRole": "",
  "skills": [],
  "redFlags": [],
  "positiveSignals": [],
  "summary": ""
}

Job Offer:

${JSON.stringify(metadata ?? {}, null, 2)}
`;
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            console.log(response.text); 
            const text = response.text ?? "";
            // Remove markdown if Gemini wraps JSON in ```json
            const cleaned = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();
            return JSON.parse(cleaned);
        }
        catch (err) {
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
