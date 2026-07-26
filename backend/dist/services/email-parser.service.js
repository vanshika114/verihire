export class EmailParserService {
    static MAX_EMAIL_LENGTH = 254;
    static MAX_LOCAL_PART_LENGTH = 64;
    static MAX_DOMAIN_LENGTH = 255;
    static EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static STRICT_EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    /**
     * Parses and validates an email address.
     * @param emailString - The email to parse
     * @param strict - If true, use strict RFC 5322 validation (default: false)
     * @returns Parsed email object with validation details
     * @throws EmailParserError if email is invalid or malformed
     */
    parse(emailString, strict = false) {
        try {
            // Validate input
            if (!emailString || typeof emailString !== 'string') {
                const error = new Error('Email must be a non-empty string');
                error.name = 'InvalidEmailInput';
                throw error;
            }
            // Trim whitespace and convert to lowercase
            const trimmedEmail = emailString.trim().toLowerCase();
            // Check if empty after trimming
            if (trimmedEmail.length === 0) {
                const error = new Error('Email cannot be empty');
                error.name = 'EmptyEmailString';
                throw error;
            }
            // Check length
            if (trimmedEmail.length > EmailParserService.MAX_EMAIL_LENGTH) {
                const error = new Error(`Email exceeds maximum length of ${EmailParserService.MAX_EMAIL_LENGTH} characters`);
                error.name = 'EmailTooLong';
                throw error;
            }
            // Check for exactly one @ symbol
            const atCount = (trimmedEmail.match(/@/g) || []).length;
            if (atCount !== 1) {
                const error = new Error(`Email must contain exactly one '@' symbol, found ${atCount}`);
                error.name = 'InvalidAtSymbolCount';
                throw error;
            }
            // Split into local and domain parts
            const [localPart, domain] = trimmedEmail.split('@');
            // Validate local part
            if (!localPart || localPart.length === 0) {
                const error = new Error('Email local part (before @) cannot be empty');
                error.name = 'EmptyLocalPart';
                throw error;
            }
            if (localPart.length > EmailParserService.MAX_LOCAL_PART_LENGTH) {
                const error = new Error(`Email local part exceeds maximum length of ${EmailParserService.MAX_LOCAL_PART_LENGTH} characters`);
                error.name = 'LocalPartTooLong';
                throw error;
            }
            // Validate domain
            if (!domain || domain.length === 0) {
                const error = new Error('Email domain (after @) cannot be empty');
                error.name = 'EmptyDomain';
                throw error;
            }
            if (domain.length > EmailParserService.MAX_DOMAIN_LENGTH) {
                const error = new Error(`Email domain exceeds maximum length of ${EmailParserService.MAX_DOMAIN_LENGTH} characters`);
                error.name = 'DomainTooLong';
                throw error;
            }
            // Validate domain format
            if (!domain.includes('.')) {
                const error = new Error('Email domain must contain at least one dot');
                error.name = 'InvalidDomainFormat';
                throw error;
            }
            // Validate domain parts
            const domainParts = domain.split('.');
            if (domainParts.some(part => !part || part.length === 0)) {
                const error = new Error('Email domain contains invalid empty parts');
                error.name = 'InvalidDomainParts';
                throw error;
            }
            // Check TLD (top-level domain)
            const tld = domainParts[domainParts.length - 1];
            if (tld.length < 2) {
                const error = new Error('Email TLD must be at least 2 characters');
                error.name = 'InvalidTld';
                throw error;
            }
            // Use regex validation based on strictness
            const regex = strict ? EmailParserService.STRICT_EMAIL_REGEX : EmailParserService.EMAIL_REGEX;
            if (!regex.test(trimmedEmail)) {
                const error = new Error(`Email format is invalid: ${trimmedEmail}`);
                error.name = 'InvalidEmailFormat';
                throw error;
            }
            // Check for common disposable/temporary email domains
            const isDisposable = this.isDisposableEmail(domain);
            // Return parsed email object
            return {
                original: emailString,
                localPart,
                domain,
                isValid: true,
            };
        }
        catch (error) {
            // Handle specific error types
            if (error instanceof Error) {
                if (error.name === 'InvalidEmailInput' ||
                    error.name === 'EmptyEmailString' ||
                    error.name === 'EmailTooLong' ||
                    error.name === 'InvalidAtSymbolCount' ||
                    error.name === 'EmptyLocalPart' ||
                    error.name === 'LocalPartTooLong' ||
                    error.name === 'EmptyDomain' ||
                    error.name === 'DomainTooLong' ||
                    error.name === 'InvalidDomainFormat' ||
                    error.name === 'InvalidDomainParts' ||
                    error.name === 'InvalidTld' ||
                    error.name === 'InvalidEmailFormat') {
                    throw error;
                }
                // Generic error handling
                const parseError = new Error(`Email parsing failed: ${error.message}`);
                parseError.name = 'EmailParsingError';
                throw parseError;
            }
            // Handle unknown errors
            const unknownError = new Error('An unknown error occurred while parsing the email');
            unknownError.name = 'UnknownEmailError';
            throw unknownError;
        }
    }
    /**
     * Validates if an email string is valid without throwing errors.
     * @param emailString - The email to validate
     * @param strict - If true, use strict RFC 5322 validation (default: false)
     * @returns Boolean indicating if email is valid
     */
    isValid(emailString, strict = false) {
        try {
            this.parse(emailString, strict);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Normalizes an email address.
     * @param emailString - The email to normalize
     * @returns Normalized email string (lowercase, trimmed)
     * @throws EmailParserError if email is invalid
     */
    normalize(emailString) {
        try {
            const parsed = this.parse(emailString);
            return `${parsed.localPart}@${parsed.domain}`.toLowerCase();
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const normalizeError = new Error('Failed to normalize email');
            normalizeError.name = 'NormalizationError';
            throw normalizeError;
        }
    }
    /**
     * Extracts all email addresses from a text string.
     * @param text - The text to search for emails
     * @returns Array of found email strings
     */
    extractEmails(text) {
        try {
            if (!text || typeof text !== 'string') {
                return [];
            }
            // Email regex pattern for extraction
            const emailRegex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g;
            const matches = text.match(emailRegex) || [];
            // Filter and deduplicate
            const emails = Array.from(new Set(matches
                .map(email => email.trim().toLowerCase())
                .filter(email => this.isValid(email))));
            return emails;
        }
        catch (error) {
            console.error('Error extracting emails:', error instanceof Error ? error.message : 'Unknown error');
            return [];
        }
    }
    /**
     * Gets the local part of an email (before @).
     * @param emailString - The email
     * @returns Local part string
     * @throws EmailParserError if email is invalid
     */
    getLocalPart(emailString) {
        try {
            const parsed = this.parse(emailString);
            return parsed.localPart;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const localError = new Error('Failed to get local part from email');
            localError.name = 'LocalPartExtractionError';
            throw localError;
        }
    }
    /**
     * Gets the domain part of an email (after @).
     * @param emailString - The email
     * @returns Domain string
     * @throws EmailParserError if email is invalid
     */
    getDomain(emailString) {
        try {
            const parsed = this.parse(emailString);
            return parsed.domain;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const domainError = new Error('Failed to get domain from email');
            domainError.name = 'DomainExtractionError';
            throw domainError;
        }
    }
    /**
     * Compares two emails for equality after normalization.
     * @param email1 - First email
     * @param email2 - Second email
     * @returns Boolean indicating if emails are equivalent
     */
    areEqual(email1, email2) {
        try {
            const normalized1 = this.normalize(email1);
            const normalized2 = this.normalize(email2);
            return normalized1 === normalized2;
        }
        catch {
            return false;
        }
    }
    /**
     * Checks if an email domain is a disposable/temporary email service.
     * @param domain - The email domain
     * @returns Boolean indicating if domain is disposable
     */
    isDisposableEmail(domain) {
        const disposableDomains = [
            'tempmail.com',
            'throwaway.email',
            'guerrillamail.com',
            '10minutemail.com',
            'temp-mail.org',
            'mailinator.com',
            'maildrop.cc',
            'spam4.me',
            'trashmail.com',
        ];
        return disposableDomains.includes(domain.toLowerCase());
    }
    /**
     * Validates email domain quality and safety.
     * @param emailString - The email to validate
     * @returns Boolean indicating if domain is safe
     */
    isDomainSafe(emailString) {
        try {
            const parsed = this.parse(emailString);
            return !this.isDisposableEmail(parsed.domain);
        }
        catch {
            return false;
        }
    }
    /**
     * Masks an email for display purposes (e.g., us*****@example.com).
     * @param emailString - The email to mask
     * @returns Masked email string
     * @throws EmailParserError if email is invalid
     */
    maskEmail(emailString) {
        try {
            const parsed = this.parse(emailString);
            const { localPart, domain } = parsed;
            // Show first character and last 2 characters of local part
            const maskedLocalPart = localPart.length <= 2
                ? '*'.repeat(Math.max(1, localPart.length - 1))
                : `${localPart[0]}${'*'.repeat(localPart.length - 3)}${localPart.slice(-2)}`;
            return `${maskedLocalPart}@${domain}`;
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            const maskError = new Error('Failed to mask email');
            maskError.name = 'MaskingError';
            throw maskError;
        }
    }
}
