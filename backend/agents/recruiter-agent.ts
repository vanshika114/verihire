import type { VerificationResult } from "../types/index.js";

export class RecruiterAgent {
  async analyze(payload: { sourceType: VerificationResult["sourceType"]; metadata?: Record<string, unknown> }) {
    const extractedText = (payload.metadata?.extractedText as string) || "";
    const signals: string[] = [];
    const redFlags: string[] = [];
    let score = 100;

    // Check for professional email domain
    const emailMatch = extractedText.match(/[\w\.-]+@([\w\.-]+)/i);
    const emailDomain = emailMatch?.[1]?.toLowerCase() || "";
    
    if (emailDomain) {
      const suspiciousDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
      if (suspiciousDomains.includes(emailDomain)) {
        redFlags.push("Personal email domain used");
        score -= 15;
      } else if (emailDomain.length > 0) {
        signals.push("Corporate email domain");
        score += 5;
      }
    } else {
      redFlags.push("No email domain found");
      score -= 10;
    }

    // Check recruiter name presence
    const hasRecruiterName = /(?:recruiter|hiring|hr|human resources)[\s:]+([A-Z][a-z]+)/i.test(extractedText);
    if (hasRecruiterName) {
      signals.push("Recruiter name provided");
      score += 5;
    } else {
      redFlags.push("No recruiter name identified");
      score -= 10;
    }

    // Check for professional language
    const professionalKeywords = ["opportunity", "position", "qualifications", "experience", "company", "team"];
    const unprofessionalKeywords = ["asap", "urgent", "quickly", "immediately", "hurry"];
    
    const professionalCount = professionalKeywords.filter(kw => 
      extractedText.toLowerCase().includes(kw)
    ).length;
    
    if (professionalCount >= 2) {
      signals.push("Professional language detected");
      score += 10;
    }

    // Check for urgency indicators
    const urgencyIndicators = unprofessionalKeywords.filter(kw => 
      extractedText.toLowerCase().includes(kw)
    );
    
    if (urgencyIndicators.length > 0) {
      redFlags.push(`Excessive urgency language detected (${urgencyIndicators.join(", ")})`);
      score -= 20;
    }

    // Check for payment requests
    if (/payment|fee|charge|deposit|transfer|cryptocurrency|bitcoin/.test(extractedText.toLowerCase())) {
      redFlags.push("Payment request detected");
      score -= 25;
    }

    // Check for messaging app links (Telegram, WhatsApp)
    if (/telegram|whatsapp|t\.me|wa\.me/.test(extractedText.toLowerCase())) {
      redFlags.push("Communication via messaging apps requested");
      score -= 20;
    }

    // Check for fake HR wording
    const fakeHRPatterns = [
      /congratulations.*you.*selected/i,
      /final round|final interview/i,
      /verify.*identity|confirm.*details/i,
      /hire you immediately/i,
      /guaranteed.*position/i,
    ];
    
    const fakeHRCount = fakeHRPatterns.filter(pattern => pattern.test(extractedText)).length;
    if (fakeHRCount > 0) {
      redFlags.push("Suspicious HR terminology detected");
      score -= 20;
    }

    // Check interview process clarity
    if (/interview|assessment|evaluation|round|stage/.test(extractedText.toLowerCase())) {
      signals.push("Interview process mentioned");
      score += 5;
    } else {
      redFlags.push("No clear interview process outlined");
      score -= 10;
    }

    // Ensure score stays within bounds
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      signals,
      redFlags,
    };
  }
}