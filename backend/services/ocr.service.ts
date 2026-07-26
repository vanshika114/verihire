import Tesseract from 'tesseract.js';

export interface OcrResult {
  text: string;
  confidence: number;
}

export interface OcrError extends Error {
  name: string;
  message: string;
  code?: string;
}

export class OcrService {
  private worker: Tesseract.Worker | null = null;
  private isInitialized: boolean = false;

  /**
   * Initializes the Tesseract worker for OCR processing.
   * Call this once before using the extract method.
   * @throws OcrError if initialization fails
   */
  async initialize(): Promise<void> {
    try {
      if (this.isInitialized && this.worker) {
        return;
      }

      this.worker = await Tesseract.createWorker("eng");
      

      this.isInitialized = true;
    } catch (error) {
      const initError = new Error(
        `Failed to initialize OCR worker: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      initError.name = 'OcrInitializationError';
      throw initError;
    }
  }

  /**
   * Extracts text from an image buffer using OCR.
   * @param imageBuffer - The image file as a Buffer (PNG, JPG, etc.)
   * @param language - Language code for OCR (default: 'eng')
   * @returns Extracted and trimmed text content with confidence score
   * @throws OcrError if extraction fails
   */
  async extract(imageBuffer: Buffer, language: string = 'eng'): Promise<string> {
    try {
      // Validate buffer input
      if (!imageBuffer || imageBuffer.length === 0) {
        const error = new Error('Image buffer is empty or invalid');
        error.name = 'InvalidImageBuffer';
        throw error;
      }

      // Ensure worker is initialized
      if (!this.worker || !this.isInitialized) {
        await this.initialize();
      }

      // Validate worker
      if (!this.worker) {
        const error = new Error('OCR worker failed to initialize');
        error.name = 'WorkerInitializationFailed';
        throw error;
      }

      // Validate language parameter
      if (typeof language !== 'string' || language.trim().length === 0) {
        const error = new Error('Language parameter must be a non-empty string');
        error.name = 'InvalidLanguageParameter';
        throw error;
      }

      // Load language if not already loaded
      

      // Convert buffer to data URL for Tesseract.js
      const base64Image = imageBuffer.toString('base64');
      const mimeType = this.detectImageMimeType(imageBuffer);
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      // Perform OCR
      const result = await this.worker.recognize(dataUrl);

      // Validate recognition result
      if (!result || !result.data) {
        const error = new Error('OCR recognition failed: no data returned');
        error.name = 'OcrRecognitionFailed';
        throw error;
      }

      // Extract text and trim whitespace
      const extractedText = (result.data.text || '').trim();

      // Return extracted text
      return extractedText;
    } catch (error) {
      // Handle specific error types
      if (error instanceof Error) {
        // If it's already our custom error, rethrow
        if (error.name === 'InvalidImageBuffer' || 
            error.name === 'WorkerInitializationFailed' || 
            error.name === 'InvalidLanguageParameter' ||
            error.name === 'LanguageLoadError' ||
            error.name === 'OcrRecognitionFailed') {
          throw error;
        }

        // Handle Tesseract.js specific errors
        if (error.message.includes('Worker') || error.message.includes('worker')) {
          const workerError = new Error(
            `OCR worker error: ${error.message}`
          );
          workerError.name = 'OcrWorkerError';
          throw workerError;
        }

        // Handle timeout errors
        if (error.message.includes('timeout') || error.message.includes('Timeout')) {
          const timeoutError = new Error(
            'OCR processing timed out. The image may be too large or complex.'
          );
          timeoutError.name = 'OcrTimeout';
          throw timeoutError;
        }

        // Generic error handling
        const genericError = new Error(
          `Failed to extract text from image: ${error.message}`
        );
        genericError.name = 'OcrExtractionError';
        throw genericError;
      }

      // Handle unknown error types
      const unknownError = new Error(
        'An unknown error occurred during OCR processing'
      );
      unknownError.name = 'UnknownOcrError';
      throw unknownError;
    }
  }

  /**
   * Terminates the OCR worker and cleans up resources.
   * Call this when you're done using the OCR service.
   */
  async terminate(): Promise<void> {
    try {
      if (this.worker) {
        await this.worker.terminate();
        this.worker = null;
        this.isInitialized = false;
      }
    } catch (error) {
      console.error(
        'Error terminating OCR worker:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  /**
   * Detects the MIME type of an image buffer based on magic bytes.
   * @param buffer - The image buffer
   * @returns MIME type string
   * @throws Error if MIME type cannot be detected
   */
  private detectImageMimeType(buffer: Buffer): string {
    // Check for PNG signature
    if (buffer.length >= 8 &&
        buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      return 'image/png';
    }

    // Check for JPEG signature
    if (buffer.length >= 3 &&
        buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return 'image/jpeg';
    }

    // Check for GIF signature
    if (buffer.length >= 6 &&
        buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      return 'image/gif';
    }

    // Check for WebP signature
    if (buffer.length >= 12 &&
        buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
        buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
      return 'image/webp';
    }

    // Default to JPEG if cannot detect
    return 'image/jpeg';
  }
}