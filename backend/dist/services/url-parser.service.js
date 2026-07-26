import { URL } from 'url';
export class UrlParserService {
    static VALID_PROTOCOLS = ['http:', 'https:', 'ftp:', 'ftps:'];
    static MAX_URL_LENGTH = 2048;
    static URL_PATTERN = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i;
    /**
     * Parses and validates a URL string.
     * @param urlString - The URL to parse
     * @param allowedProtocols - Array of allowed protocols (default: http, https)
     * @returns Parsed URL object with validation details
     * @throws UrlParserError if URL is invalid or malformed
     */
    parse(urlString, allowedProtocols = ['http:', 'https:']) {
        try {
            // Validate input
            if (!urlString || typeof urlString !== 'string') {
                const error = new Error('URL must be a non-empty string');
                error.name = 'InvalidUrlInput';
                throw error;
            }
            // Trim whitespace
            const trimmedUrl = urlString.trim();
            // Check length
            if (trimmedUrl.length === 0) {
                const error = new Error('URL cannot be empty');
                error.name = 'EmptyUrlString';
                throw error;
            }
            if (trimmedUrl.length > UrlParserService.MAX_URL_LENGTH) {
                const error = new Error(`URL exceeds maximum length of ${UrlParserService.MAX_URL_LENGTH} characters`);
                error.name = 'UrlTooLong';
                throw error;
            }
            // Add protocol if missing
            let urlToparse = trimmedUrl;
            if (!this.hasProtocol(trimmedUrl)) {
                urlToparse = `https://${trimmedUrl}`;
            }
            // Parse URL
            const parsedUrl = new URL(urlToparse);
            // Validate protocol
            if (!allowedProtocols.includes(parsedUrl.protocol)) {
                const error = new Error(`Protocol '${parsedUrl.protocol}' is not allowed. Allowed protocols: ${allowedProtocols.join(', ')}`);
                error.name = 'InvalidProtocol';
                throw error;
            }
            // Validate hostname
            if (!parsedUrl.hostname || parsedUrl.hostname.length === 0) {
                const error = new Error('URL must contain a valid hostname');
                error.name = 'InvalidHostname';
                throw error;
            }
            // Return parsed URL object
            return {
                original: trimmedUrl,
                protocol: parsedUrl.protocol,
                hostname: parsedUrl.hostname,
                port: parsedUrl.port ? parseInt(parsedUrl.port, 10) : undefined,
                pathname: parsedUrl.pathname,
                search: parsedUrl.search,
                hash: parsedUrl.hash,
                href: parsedUrl.href,
                isValid: true,
            };
        }
        catch (error) {
            // Handle specific error types
            if (error instanceof Error) {
                // If it's already our custom error, rethrow
                if (error.name === 'InvalidUrlInput' ||
                    error.name === 'EmptyUrlString' ||
                    error.name === 'UrlTooLong' ||
                    error.name === 'InvalidProtocol' ||
                    error.name === 'InvalidHostname') {
                    throw error;
                }
                // Handle URL parsing errors
                if (error.message.includes('Invalid URL')) {
                    const parseError = new Error(`Failed to parse URL: ${urlString}. The URL format is invalid.`);
                    parseError.name = 'MalformedUrl';
                    throw parseError;
                }
                // Handle other URL errors
                const urlError = new Error(`URL parsing failed: ${error.message}`);
                urlError.name = 'UrlParsingError';
                throw urlError;
            }
            // Handle unknown errors
            const unknownError = new Error('An unknown error occurred while parsing the URL');
            unknownError.name = 'UnknownUrlError';
            throw unknownError;
        }
    }
    /**
     * Validates if a URL string is valid without throwing errors.
     * @param urlString - The URL to validate
     * @param allowedProtocols - Array of allowed protocols (default: http, https)
     * @returns Boolean indicating if URL is valid
     */
    isValid(urlString, allowedProtocols = ['http:', 'https:']) {
        try {
            this.parse(urlString, allowedProtocols);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Extracts all URLs from a text string.
     * @param text - The text to search for URLs
     * @returns Array of found URL strings
     */
    extractUrls(text) {
        try {
            if (!text || typeof text !== 'string') {
                return [];
            }
            // URL regex pattern
            const urlRegex = /(https?|ftp):\/\/[^\s]+/gi;
            const matches = text.match(urlRegex) || [];
            // Filter and deduplicate
            const urls = Array.from(new Set(matches
                .map(url => url.trim())
                .filter(url => url.length > 0 && url.length <= UrlParserService.MAX_URL_LENGTH)));
            return urls;
        }
        catch (error) {
            console.error('Error extracting URLs:', error instanceof Error ? error.message : 'Unknown error');
            return [];
        }
    }
    /**
     * Normalizes a URL by removing trailing slashes, fragments, and standardizing format.
     * @param urlString - The URL to normalize
     * @returns Normalized URL string
     * @throws UrlParserError if URL is invalid
     */
    normalize(urlString) {
        try {
            const parsed = this.parse(urlString);
            // Reconstruct normalized URL
            let normalized = `${parsed.protocol}//${parsed.hostname}`;
            if (parsed.port) {
                normalized += `:${parsed.port}`;
            }
            normalized += parsed.pathname;
            if (parsed.search) {
                normalized += parsed.search;
            }
            // Don't include hash fragment in normalized URL
            return normalized;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const normalizeError = new Error('Failed to normalize URL');
            normalizeError.name = 'NormalizationError';
            throw normalizeError;
        }
    }
    /**
     * Compares two URLs for equality after normalization.
     * @param url1 - First URL
     * @param url2 - Second URL
     * @returns Boolean indicating if URLs are equivalent
     */
    areEqual(url1, url2) {
        try {
            const normalized1 = this.normalize(url1);
            const normalized2 = this.normalize(url2);
            return normalized1 === normalized2;
        }
        catch {
            return false;
        }
    }
    /**
     * Gets the domain from a URL (hostname without port).
     * @param urlString - The URL
     * @returns Domain string
     * @throws UrlParserError if URL is invalid
     */
    getDomain(urlString) {
        try {
            const parsed = this.parse(urlString);
            return parsed.hostname;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const domainError = new Error('Failed to get domain from URL');
            domainError.name = 'DomainExtractionError';
            throw domainError;
        }
    }
    /**
     * Gets the base URL (protocol + hostname + port).
     * @param urlString - The URL
     * @returns Base URL string
     * @throws UrlParserError if URL is invalid
     */
    getBaseUrl(urlString) {
        try {
            const parsed = this.parse(urlString);
            let baseUrl = `${parsed.protocol}//${parsed.hostname}`;
            if (parsed.port) {
                baseUrl += `:${parsed.port}`;
            }
            return baseUrl;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const baseError = new Error('Failed to get base URL');
            baseError.name = 'BaseUrlExtractionError';
            throw baseError;
        }
    }
    /**
     * Checks if URL has a protocol prefix.
     * @param urlString - The URL to check
     * @returns Boolean indicating if URL has protocol
     */
    hasProtocol(urlString) {
        return UrlParserService.VALID_PROTOCOLS.some(protocol => urlString.toLowerCase().startsWith(protocol));
    }
    /**
     * Validates if a hostname is safe (not localhost or private IP).
     * @param hostname - The hostname to validate
     * @returns Boolean indicating if hostname is safe for external access
     */
    isHostnameSafe(hostname) {
        try {
            if (!hostname || typeof hostname !== 'string') {
                return false;
            }
            const lowercaseHostname = hostname.toLowerCase();
            // Block localhost
            if (lowercaseHostname === 'localhost' || lowercaseHostname === '127.0.0.1') {
                return false;
            }
            // Block private IP ranges
            if (lowercaseHostname.startsWith('192.168.') ||
                lowercaseHostname.startsWith('10.') ||
                lowercaseHostname.startsWith('172.') ||
                lowercaseHostname === '0.0.0.0' ||
                lowercaseHostname.startsWith('fe80:') ||
                lowercaseHostname === '::1') {
                return false;
            }
            return true;
        }
        catch {
            return false;
        }
    }
}
