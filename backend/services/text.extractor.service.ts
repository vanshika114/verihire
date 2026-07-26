import { PdfParserService } from './pdf-parser.service.js';
import { OcrService } from './ocr.service.js';

export interface ExtractionResult {
  text: string;
  source: 'pdf' | 'ocr';
  confidence?: number;
  error?: string;
}

export interface TextExtractorError extends Error {
  name: string;
  message: string;
  code?: string;
}

export class TextExtractorService {
  private pdfParser: PdfParserService;
  private ocrService: OcrService;

  constructor() {
    this.pdfParser = new PdfParserService();
    this.ocrService = new OcrService();
  }

  /**
   * Extracts text from a file buffer (PDF or image).
   * Automatically detects file type and uses appropriate extraction method.
   * @param fileBuffer - The file as a Buffer
   * @param fileType - File type: 'pdf' or 'image' (optional, auto-detected if not provided)
   * @returns Extracted text and metadata about the extraction
   * @throws TextExtractorError if extraction fails
   */
  async extract(fileBuffer: Buffer, fileType?: 'pdf' | 'image'): Promise<ExtractionResult> {
    try {
      // Validate buffer
      if (!fileBuffer || fileBuffer.length === 0) {
        const error = new Error('File buffer is empty or invalid');
        error.name = 'InvalidFileBuffer';
        throw error;
      }

      // Determine file type if not provided
      let detectedType = fileType;
      if (!detectedType) {
        detectedType = this.detectFileType(fileBuffer);
      }

      // Validate detected type
      if (!detectedType || !['pdf', 'image'].includes(detectedType)) {
        const error = new Error(
          'Unable to determine file type. Ensure file is a valid PDF or image.'
        );
        error.name = 'UnknownFileType';
        throw error;
      }

      // Extract based on file type
      if (detectedType === 'pdf') {
        return await this.extractFromPdf(fileBuffer);
      } else {
        return await this.extractFromImage(fileBuffer);
      }
    } catch (error) {
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'InvalidFileBuffer' || error.name === 'UnknownFileType') {
          throw error;
        }

        // Re-throw if already a TextExtractorError
        if (error.name && error.name.includes('Extractor')) {
          throw error;
        }

        // Wrap unknown errors
        const extractorError = new Error(
          `Text extraction failed: ${error.message}`
        );
        extractorError.name = 'TextExtractionError';
        throw extractorError;
      }

      const unknownError = new Error(
        'An unknown error occurred during text extraction'
      );
      unknownError.name = 'UnknownExtractionError';
      throw unknownError;
    }
  }

  /**
   * Extracts text from a PDF file.
   * @param fileBuffer - The PDF file as a Buffer
   * @returns Extracted text with 'pdf' source
   * @throws TextExtractorError if PDF extraction fails
   */
  private async extractFromPdf(fileBuffer: Buffer): Promise<ExtractionResult> {
    try {
      const text = await this.pdfParser.extract(fileBuffer);

      return {
        text,
        source: 'pdf',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const extractorError = new Error(
        `PDF extraction failed: ${errorMessage}`
      );
      extractorError.name = 'PdfExtractionError';
      throw extractorError;
    }
  }

  /**
   * Extracts text from an image file using OCR.
   * @param fileBuffer - The image file as a Buffer
   * @returns Extracted text with 'ocr' source
   * @throws TextExtractorError if image extraction fails
   */
  private async extractFromImage(fileBuffer: Buffer): Promise<ExtractionResult> {
    try {
      // Initialize OCR service
      await this.ocrService.initialize();

      // Extract text from image
      const text = await this.ocrService.extract(fileBuffer);

      return {
        text,
        source: 'ocr',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const extractorError = new Error(
        `Image extraction failed: ${errorMessage}`
      );
      extractorError.name = 'ImageExtractionError';
      throw extractorError;
    }
  }

  /**
   * Detects file type based on magic bytes (file signatures).
   * @param buffer - The file buffer
   * @returns 'pdf' or 'image' or undefined if cannot detect
   */
  private detectFileType(buffer: Buffer): 'pdf' | 'image' | undefined {
    if (!buffer || buffer.length < 4) {
      return undefined;
    }

    // Check for PDF signature
    const pdfSignature = buffer.subarray(0, 4).toString('ascii', 0, 4);
    if (pdfSignature === '%PDF') {
      return 'pdf';
    }

    // Check for PNG signature
    if (buffer.length >= 8 &&
        buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      return 'image';
    }

    // Check for JPEG signature
    if (buffer.length >= 3 &&
        buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return 'image';
    }

    // Check for GIF signature
    if (buffer.length >= 6 &&
        buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      return 'image';
    }

    // Check for WebP signature
    if (buffer.length >= 12 &&
        buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
        buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
      return 'image';
    }

    // Check for BMP signature
    if (buffer.length >= 2 &&
        buffer[0] === 0x42 && buffer[1] === 0x4d) {
      return 'image';
    }

    return undefined;
  }

  /**
   * Extracts text from a file with fallback mechanism.
   * If primary extraction method fails, attempts alternative method.
   * @param fileBuffer - The file as a Buffer
   * @returns Extracted text with source information
   * @throws TextExtractorError if all extraction methods fail
   */
  async extractWithFallback(fileBuffer: Buffer): Promise<ExtractionResult> {
    try {
      // Try standard extraction first
      return await this.extract(fileBuffer);
    } catch (primaryError) {
      try {
        // If detection failed, try both methods
        const detectedType = this.detectFileType(fileBuffer);

        if (detectedType === 'pdf') {
          // Try image extraction as fallback
          return await this.extractFromImage(fileBuffer);
        } else if (detectedType === 'image') {
          // Try PDF extraction as fallback
          return await this.extractFromPdf(fileBuffer);
        } else {
          // Try both methods when type is unknown
          try {
            return await this.extractFromPdf(fileBuffer);
          } catch {
            return await this.extractFromImage(fileBuffer);
          }
        }
      } catch (fallbackError) {
        const errorMessage = primaryError instanceof Error ? primaryError.message : 'Unknown error';
        const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : 'Unknown error';
        const extractorError = new Error(
          `Text extraction failed with all methods. Primary: ${errorMessage}. Fallback: ${fallbackMessage}`
        );
        extractorError.name = 'AllExtractionMethodsFailed';
        throw extractorError;
      }
    }
  }

  /**
   * Terminates OCR service and cleans up resources.
   * Call this when done using the service.
   */
  async cleanup(): Promise<void> {
    try {
      await this.ocrService.terminate();
    } catch (error) {
      console.error(
        'Error during cleanup:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}