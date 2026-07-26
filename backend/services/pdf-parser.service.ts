// @ts-ignore
import pdfParse from "pdf-parse";

export interface PdfParseError extends Error {
  name: string;
  message: string;
  code?: string;
}

export class PdfParserService {
  /**
   * Extracts text content from a PDF buffer.
   * @param buffer - The PDF file as a Buffer
   * @returns Extracted and trimmed text content
   * @throws PdfParseError if the PDF is invalid or parsing fails
   */
  async extract(buffer: Buffer): Promise<string> {
    try {
      // Validate buffer input
      if (!buffer || buffer.length === 0) {
        const error = new Error('PDF buffer is empty or invalid');
        error.name = 'InvalidPdfBuffer';
        throw error;
      }

      // Check for PDF file signature (magic bytes)
      const pdfSignature = buffer.subarray(0, 4).toString('ascii', 0, 4);
      if (pdfSignature !== '%PDF') {
        const error = new Error(
          'Invalid PDF file: missing PDF file signature. File does not start with %PDF'
        );
        error.name = 'InvalidPdfSignature';
        throw error;
      }

      // Parse the PDF
      const data = await pdfParse(buffer);

      // Validate extraction result
      if (!data || !data.text) {
        const error = new Error('PDF parsing completed but no text content was extracted');
        error.name = 'NoTextExtracted';
        throw error;
      }

      // Extract and clean text
      const extractedText = data.text.trim();

      // Return empty string if no meaningful content found (instead of throwing)
      if (extractedText.length === 0) {
        return '';
      }

      return extractedText;
    } catch (error) {
      // Handle specific error types
      if (error instanceof Error) {
        // If it's already our custom error, rethrow
        if (error.name === 'InvalidPdfBuffer' || 
            error.name === 'InvalidPdfSignature' || 
            error.name === 'NoTextExtracted') {
          throw error;
        }

        // Handle pdf-parse specific errors
        if (error.message.includes('PDF file not found') || 
            error.message.includes('Invalid PDF structure')) {
          const parsedError = new Error(
            `PDF parsing failed: ${error.message}`
          );
          parsedError.name = 'PdfParsingFailed';
          throw parsedError;
        }

        // Handle file corruption or encoding issues
        if (error.message.includes('EOF') || 
            error.message.includes('unexpected end of file')) {
          const corruptError = new Error(
            'PDF file appears to be corrupted or truncated'
          );
          corruptError.name = 'CorruptedPdfFile';
          throw corruptError;
        }

        // Generic error handling
        const genericError = new Error(
          `Failed to extract PDF text: ${error.message}`
        );
        genericError.name = 'PdfExtractionError';
        throw genericError;
      }

      // Handle unknown error types
      const unknownError = new Error(
        'An unknown error occurred while parsing the PDF'
      );
      unknownError.name = 'UnknownPdfError';
      throw unknownError;
    }
  }
}