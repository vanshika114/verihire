import { AuthenticityAgent } from "../agents/authenticity-agent.js";
import { CompanyAgent } from "../agents/company-agent.js";
import { RecruiterAgent } from "../agents/recruiter-agent.js";
import { GeminiService } from "./gemini.service.js";
import { TextExtractorService } from "./text.extractor.service.js";
import { UrlParserService } from "./url-parser.service.js";
import { EmailParserService } from "./email-parser.service.js";
import { PdfParserService } from "./pdf-parser.service.js";
import { OcrService } from "./ocr.service.js";
import type { VerificationResult } from "../types/index.js";

export interface ExtractedContent {
  text: string;
  source: "pdf" | "ocr" | "text";
  confidence?: number;
}

export interface ParsedMetadata {
  emails: string[];
  urls: string[];
  normalizedContent: string;
  extractedText?: string;
}

export interface EnhancedAnalysisResult extends Record<string, any> {
  id: string;
  score: number;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  recommendation: string;
  positiveSignals: string[];
  redFlags: string[];
  company?: string;
  recruiterEmail?: string;
  website?: string;
  jobRole?: string;
  salary?: string;
  location?: string;
  skills?: string[];
  sourceType: VerificationResult["sourceType"];
  createdAt: string;
  extractedContent?: ExtractedContent;
  parsedMetadata?: ParsedMetadata;
  error?: string;
}

export class AnalysisService {
  private authenticityAgent = new AuthenticityAgent();
  private companyAgent = new CompanyAgent();
  private recruiterAgent = new RecruiterAgent();
  private geminiService = new GeminiService();
  private textExtractorService = new TextExtractorService();
  private urlParserService = new UrlParserService();
  private emailParserService = new EmailParserService();
  private pdfParserService = new PdfParserService();
  private ocrService = new OcrService();

  /**
   * Analyzes source material and returns comprehensive verification results.
   * @param sourceType - Type of source being verified
   * @param metadata - Additional metadata about the source
   * @param fileBuffer - Optional file buffer for document analysis
   * @returns Enhanced analysis result with extracted and parsed data
   */
  async analyze(
    sourceType: VerificationResult["sourceType"],
    metadata?: Record<string, unknown>,
    fileBuffer?: Buffer
  ): Promise<EnhancedAnalysisResult> {
    try {
      // Extract content from file if provided
      let extractedContent: ExtractedContent | undefined;
      if (fileBuffer) {
        try {
          extractedContent = await this.extractContentFromFile(fileBuffer);
        } catch (extractionError) {
          console.error(
            "Content extraction failed:",
            extractionError instanceof Error ? extractionError.message : "Unknown error"
          );
        }
      }

      // Parse metadata and extract emails/URLs
      const parsedMetadata = await this.parseMetadata(
        metadata,
        extractedContent?.text
      );

      // Enhance metadata with extracted information
      const enhancedMetadata = {
        ...metadata,
        ...parsedMetadata,
        extractedText: extractedContent?.text,
      };

      // Run parallel analysis agents
      const text =
      extractedContent?.text ??
      String(metadata?.text ?? "");

      const gemini =
      await this.geminiService.buildAnalysis(
        sourceType, {
          extractedText: text,
        }
      );

      const [authenticity, company, recruiter] =
      await Promise.all([
        this.authenticityAgent.analyze({
          sourceType,
          metadata: gemini,
        }),
        this.companyAgent.analyze({
          sourceType,
          metadata: gemini,
        }),
        this.recruiterAgent.analyze({
          sourceType,
          metadata: gemini,
        }),
      ]);



      // Calculate composite score
      let score = Math.round(
      (
      authenticity.score +
      company.score +
      recruiter.score
      ) / 3
      );

      // Gemini can override if it detected major issues

      if (
      gemini.redFlags?.some((flag: string) =>
      flag.toLowerCase().includes("payment") ||
      flag.toLowerCase().includes("upi") ||
      flag.toLowerCase().includes("telegram") ||
      flag.toLowerCase().includes("gift card")
      )
      ) {
      score = Math.min(score, 35);
      }

      // Determine risk level
      const riskLevel: "low" | "medium" | "high" =
        score >= 85 ? "low" : score >= 70 ? "medium" : "high";

      // Build recommendation
      const recommendation =
        riskLevel === "low"
          ? "Proceed"
          : riskLevel === "medium"
          ? "Proceed carefully"
          : "Avoid";

      // Return enhanced analysis result
      return {
        id: `result-${Date.now()}`,
        score,
        riskLevel,
        summary:
          gemini.summary ??
          `The ${sourceType} was analyzed successfully.`,
        recommendation,
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
        extractedContent,
        parsedMetadata,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Analysis failed:", errorMessage);

      return {
        id: `result-${Date.now()}`,
        score: 0,
        riskLevel: "high",
        summary: "Analysis could not be completed",
        recommendation: "Avoid",
        positiveSignals: [],
        redFlags: ["Analysis service encountered an error"],
        sourceType,
        createdAt: new Date().toISOString(),
        error: errorMessage,
      };
    }
  }

  /**
   * Extracts content from various file formats.
   * @param fileBuffer - The file buffer to extract from
   * @returns Extracted content with source information
   * @throws Error if extraction fails
   */
  private async extractContentFromFile(
    fileBuffer: Buffer
  ): Promise<ExtractedContent> {
    try {
      await this.ocrService.initialize();
      const result = await this.textExtractorService.extractWithFallback(
        fileBuffer
      );

      return {
        text: result.text,
        source: result.source,
        confidence: result.confidence,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown extraction error";
      throw new Error(`Failed to extract file content: ${errorMessage}`);
    }
  }

  /**
   * Parses metadata to extract emails, URLs, and normalize content.
   * @param metadata - Metadata to parse
   * @param extractedText - Optional extracted text content
   * @returns Parsed metadata object
   */
  private async parseMetadata(
    metadata?: Record<string, unknown>,
    extractedText?: string
  ): Promise<ParsedMetadata> {
    const parsedMetadata: ParsedMetadata = {
      emails: [],
      urls: [],
      normalizedContent: "",
    };

    if (!metadata && !extractedText) {
      return parsedMetadata;
    }

    // Combine metadata and extracted text
    const combinedText = [
      extractedText || "",
      JSON.stringify(metadata || {}),
    ].join(" ");

    try {
      // Extract emails
      const emails = this.emailParserService.extractEmails(combinedText);
      parsedMetadata.emails = emails;

      // Extract and validate URLs
      const urls = this.urlParserService.extractUrls(combinedText);
      parsedMetadata.urls = urls.filter(url =>
        this.urlParserService.isHostnameSafe(
          this.urlParserService.parse(url).hostname
        )
      );

      // Normalize extracted text
      if (extractedText) {
        parsedMetadata.normalizedContent = this.normalizeText(extractedText);
        parsedMetadata.extractedText = extractedText.substring(0, 5000);
      }

      return parsedMetadata;
    } catch (error) {
      console.error(
        "Metadata parsing failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return parsedMetadata;
    }
  }

  /**
   * Normalizes text by removing extra whitespace and standardizing formatting.
   * @param text - Text to normalize
   * @returns Normalized text
   */
  private normalizeText(text: string): string {
    return text
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .substring(0, 2000);
  }

  /**
   * Cleanup resources used by services.
   */
  async cleanup(): Promise<void> {
    try {
      await this.textExtractorService.cleanup();
      await this.ocrService.terminate();
    } catch (error) {
      console.error(
        "Cleanup failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
}