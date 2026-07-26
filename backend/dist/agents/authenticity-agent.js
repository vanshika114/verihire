export class AuthenticityAgent {
    AUTHENTICITY_WEIGHTS = {
        documentAuthenticity: 0.4,
        sourceCredibility: 0.35,
        contentQuality: 0.25,
    };
    PAYMENT_KEYWORDS = [
        "registration fee",
        "processing fee",
        "training fee",
        "security deposit",
        "interview fee",
        "pay now",
        "upi",
        "google pay",
        "phonepe",
        "paytm",
        "bank transfer",
        "wire transfer",
        "advance payment",
        "upfront payment",
    ];
    PHISHING_KEYWORDS = [
        "verify account",
        "confirm password",
        "update payment",
        "click here immediately",
        "unusual activity",
        "confirm identity",
        "re-activate",
        "expire",
        "suspended",
        "urgent action required",
        "validate account",
    ];
    URGENT_KEYWORDS = [
        "immediate joining",
        "limited seats",
        "urgent",
        "asap",
        "today",
        "immediately",
        "limited time",
        "hurry",
        "don't miss",
        "act now",
        "last chance",
        "final opportunity",
        "expire today",
    ];
    UNREALISTIC_SALARY_PATTERNS = [
        "₹1,00,000+",
        "₹2,00,000+",
        "lakh per month",
        "2 lakh",
        "3 lakh",
        "4 lakh",
        "5 lakh per month",
        "$10,000 per month",
        "$5,000 per week",
        "$1000 per day",
        "₹50,000 per day",
    ];
    DISPOSABLE_EMAIL_DOMAINS = [
        "tempmail.com",
        "throwaway.email",
        "guerrillamail.com",
        "mailinator.com",
        "10minutemail.com",
        "maildrop.cc",
        "temp-mail.org",
        "yopmail.com",
        "sharklasers.com",
        "temp.email",
        "tempmail.org",
    ];
    FREE_EMAIL_DOMAINS = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "rediffmail.com",
        "aol.com",
    ];
    SUSPICIOUS_WORDING = [
        "guaranteed",
        "no experience needed",
        "work from home",
        "easy money",
        "make $",
        "passive income",
        "minimum work",
        "no interview",
        "no qualifications",
        "no skill required",
        "unlimited earnings",
        "get rich quick",
    ];
    KNOWN_COMPANIES = [
        "google",
        "microsoft",
        "amazon",
        "apple",
        "meta",
        "netflix",
        "uber",
        "airbnb",
        "stripe",
        "twilio",
        "figma",
        "notion",
        "slack",
        "github",
        "coinbase",
        "atlassian",
        "adobe",
        "salesforce",
        "oracle",
        "ibm",
        "intel",
        "cisco",
        "nvidia",
        "tesla",
        "spacex",
    ];
    FAKE_OFFER_INDICATORS = [
        "congratulations you are selected",
        "you have been shortlisted",
        "without interview",
        "no assessment needed",
        "no evaluation required",
        "direct joining",
        "no written test",
        "fast track",
        "special opportunity",
        "referral bonus",
    ];
    async analyze(input) {
        try {
            const text = this.extractText(input.metadata);
            const textLower = text.toLowerCase();
            const analysis = {
                score: 50,
                isAuthentic: false,
                signals: {
                    verified: [],
                    suspicious: [],
                },
                redFlags: [],
                details: {
                    documentAuthenticity: 50,
                    sourceCredibility: 50,
                    contentQuality: 50,
                },
            };
            // Return early if no content
            if (!text || text.trim().length === 0) {
                analysis.redFlags.push("No content available for analysis");
                analysis.score = 10;
                analysis.details.documentAuthenticity = 10;
                return analysis;
            }
            // Analyze based on source type
            switch (input.sourceType) {
                case "email":
                    this.analyzeEmailContent(analysis, textLower, input.metadata);
                    break;
                case "pdf":
                case "image":
                    this.analyzeDocumentContent(analysis, textLower, input.metadata);
                    break;
                case "url":
                    this.analyzeUrlContent(analysis, textLower, input.metadata);
                    break;
                default:
                    this.analyzeGenericContent(analysis, textLower, input.metadata);
            }
            // Clamp all detail scores
            analysis.details.documentAuthenticity = Math.max(0, Math.min(100, analysis.details.documentAuthenticity));
            analysis.details.sourceCredibility = Math.max(0, Math.min(100, analysis.details.sourceCredibility));
            analysis.details.contentQuality = Math.max(0, Math.min(100, analysis.details.contentQuality));
            // Calculate weighted score
            analysis.score = this.calculateWeightedScore(analysis.details);
            analysis.isAuthentic = analysis.score >= 70;
            return analysis;
        }
        catch (err) {
            return {
                score: 5,
                isAuthentic: false,
                signals: {
                    verified: [],
                    suspicious: ["Authenticity analysis failed"],
                },
                redFlags: ["Analysis error occurred"],
                details: {
                    documentAuthenticity: 5,
                    sourceCredibility: 5,
                    contentQuality: 5,
                },
            };
        }
    }
    extractText(metadata) {
        if (!metadata)
            return "";
        const text = String(metadata.extractedText ??
            metadata.body ??
            metadata.content ??
            metadata.text ??
            "");
        return text.trim();
    }
    analyzeEmailContent(analysis, text, metadata) {
        // Check sender email domain
        if (metadata?.senderEmail && typeof metadata.senderEmail === "string") {
            const domain = metadata.senderEmail.split("@")[1]?.toLowerCase();
            if (domain && this.DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
                analysis.signals.suspicious.push("Uses disposable email domain");
                analysis.details.sourceCredibility -= 35;
                analysis.redFlags.push("Disposable email detected");
            }
            else if (domain && this.FREE_EMAIL_DOMAINS.includes(domain)) {
                analysis.signals.suspicious.push(`Uses free email provider (${domain})`);
                analysis.details.sourceCredibility -= 20;
            }
            if (domain && this.isOfficialDomain(domain)) {
                analysis.signals.verified.push("Uses official company email domain");
                analysis.details.sourceCredibility += 25;
            }
        }
        // Check for SPF, DKIM, DMARC
        if (metadata?.hasSpfRecord === true || metadata?.hasDkimSignature === true) {
            analysis.signals.verified.push("Email headers contain authentication records");
            analysis.details.documentAuthenticity += 20;
        }
        else if (metadata?.hasSpfRecord === false ||
            metadata?.hasDkimSignature === false) {
            analysis.signals.suspicious.push("Missing email authentication records");
            analysis.details.documentAuthenticity -= 20;
            analysis.redFlags.push("No SPF/DKIM authentication");
        }
        // Analyze email content for red flags
        this.detectPaymentRequests(analysis, text);
        this.detectUrgencyLanguage(analysis, text);
        this.detectPhishingPatterns(analysis, text);
        this.detectContactIssues(analysis, text);
        this.detectGrammarQuality(analysis, metadata);
        this.detectSuspiciousWording(analysis, text);
    }
    analyzeJobPostingContent(analysis, text, metadata) {
        // Check for job posting structure
        const hasJobTitle = text.includes("job title") ||
            text.includes("position") ||
            text.includes("role") ||
            text.includes("designation");
        const hasCompanyInfo = text.includes("company") || metadata?.company;
        const hasSalary = text.includes("salary") || text.includes("₹") || text.includes("$");
        const hasLocation = text.includes("location") || text.includes("city") || text.includes("office");
        if (hasJobTitle && hasCompanyInfo && hasSalary && hasLocation) {
            analysis.signals.verified.push("Contains complete job posting structure");
            analysis.details.documentAuthenticity += 15;
        }
        else {
            analysis.signals.suspicious.push("Missing standard job posting elements");
            analysis.details.documentAuthenticity -= 25;
            analysis.redFlags.push("Incomplete job posting information");
        }
        // Check for fake offer indicators
        const fakeOfferCount = this.FAKE_OFFER_INDICATORS.filter((indicator) => text.includes(indicator)).length;
        if (fakeOfferCount >= 2) {
            analysis.signals.suspicious.push("Multiple fake offer indicators detected");
            analysis.details.contentQuality -= 40;
            analysis.redFlags.push("Possible fake offer letter");
        }
        else if (fakeOfferCount === 1) {
            analysis.signals.suspicious.push("Contains potential fake offer language");
            analysis.details.contentQuality -= 20;
        }
        // Check company legitimacy
        if (metadata?.company && typeof metadata.company === "string") {
            if (this.isKnownCompany(metadata.company)) {
                analysis.signals.verified.push("Company is known/legitimate");
                analysis.details.sourceCredibility += 30;
            }
            else {
                analysis.signals.suspicious.push("Company cannot be verified");
                analysis.details.sourceCredibility -= 15;
                analysis.redFlags.push("Unverified company");
            }
        }
        // Check for interview fee or payment
        if (text.includes("interview fee") || text.includes("interview cost")) {
            analysis.signals.suspicious.push("Requests payment for interview");
            analysis.details.sourceCredibility -= 45;
            analysis.redFlags.push("Interview fee requested - likely scam");
        }
        // Check for realistic salary
        if (this.hasUnrealisticSalary(text)) {
            analysis.signals.suspicious.push("Salary claims appear unrealistic");
            analysis.details.contentQuality -= 30;
            analysis.redFlags.push("Unrealistic salary offer");
        }
        // Check content quality
        this.detectGrammarQuality(analysis, { content: text });
        this.detectPaymentRequests(analysis, text);
        this.detectUrgencyLanguage(analysis, text);
        this.detectPhishingPatterns(analysis, text);
        this.detectContactIssues(analysis, text);
        this.detectSuspiciousWording(analysis, text);
    }
    analyzeDocumentContent(analysis, text, metadata) {
        // Check document structure
        const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
        const hasTitle = wordCount > 10;
        const hasContent = wordCount > 100;
        if (hasTitle && hasContent) {
            analysis.signals.verified.push("Document has proper structure");
            analysis.details.documentAuthenticity += 15;
        }
        else if (wordCount < 50) {
            analysis.signals.suspicious.push("Document content too brief");
            analysis.details.documentAuthenticity -= 20;
            analysis.redFlags.push("Content too brief for legitimacy");
        }
        // Check for formatting and professional appearance
        if (metadata?.isWellFormatted === true) {
            analysis.signals.verified.push("Professional formatting detected");
            analysis.details.contentQuality += 15;
        }
        // Check grammar and spelling
        this.detectGrammarQuality(analysis, metadata);
        this.detectPaymentRequests(analysis, text);
        this.detectUrgencyLanguage(analysis, text);
        this.detectPhishingPatterns(analysis, text);
        this.detectFakeOffers(analysis, text);
    }
    analyzeUrlContent(analysis, text, metadata) {
        const url = metadata?.url;
        if (url) {
            const hasHttps = url.startsWith("https://");
            const hasSuspiciousShortener = url.includes("bit.ly") ||
                url.includes("tinyurl") ||
                url.includes("short.link") ||
                url.includes("goo.gl");
            if (hasHttps) {
                analysis.signals.verified.push("Uses secure HTTPS connection");
                analysis.details.documentAuthenticity += 15;
            }
            else {
                analysis.signals.suspicious.push("Does not use HTTPS");
                analysis.details.documentAuthenticity -= 30;
                analysis.redFlags.push("Insecure URL (HTTP)");
            }
            if (hasSuspiciousShortener) {
                analysis.signals.suspicious.push("Uses URL shortener");
                analysis.details.documentAuthenticity -= 20;
                analysis.redFlags.push("Suspicious URL shortener detected");
            }
            // Check for suspicious domain patterns
            const domain = url.split("/")[2]?.toLowerCase() || "";
            if (this.hasSuspiciousDomain(domain)) {
                analysis.signals.suspicious.push("URL domain appears suspicious");
                analysis.details.sourceCredibility -= 25;
                analysis.redFlags.push("Suspicious domain pattern");
            }
        }
        this.detectPaymentRequests(analysis, text);
        this.detectUrgencyLanguage(analysis, text);
        this.detectPhishingPatterns(analysis, text);
    }
    analyzeGenericContent(analysis, text, metadata) {
        this.detectPaymentRequests(analysis, text);
        this.detectUrgencyLanguage(analysis, text);
        this.detectPhishingPatterns(analysis, text);
        this.detectContactIssues(analysis, text);
        this.detectGrammarQuality(analysis, metadata);
        this.detectSuspiciousWording(analysis, text);
        this.detectFakeOffers(analysis, text);
    }
    detectPaymentRequests(analysis, text) {
        const paymentMatches = this.PAYMENT_KEYWORDS.filter((keyword) => text.includes(keyword));
        if (paymentMatches.length > 0) {
            analysis.signals.suspicious.push(`Mentions payment: ${paymentMatches.join(", ")}`);
            analysis.details.sourceCredibility -= 40;
            analysis.redFlags.push("Payment request detected - potential scam");
        }
    }
    detectUrgencyLanguage(analysis, text) {
        const urgentMatches = this.URGENT_KEYWORDS.filter((keyword) => text.includes(keyword));
        if (urgentMatches.length >= 3) {
            analysis.signals.suspicious.push("Excessive urgency language detected");
            analysis.details.contentQuality -= 30;
            analysis.redFlags.push("High-pressure tactics detected");
        }
        else if (urgentMatches.length === 2) {
            analysis.signals.suspicious.push("Contains multiple urgency indicators");
            analysis.details.contentQuality -= 20;
        }
        else if (urgentMatches.length === 1) {
            analysis.signals.suspicious.push("Contains urgency language");
            analysis.details.contentQuality -= 10;
        }
    }
    detectPhishingPatterns(analysis, text) {
        const phishingMatches = this.PHISHING_KEYWORDS.filter((keyword) => text.includes(keyword));
        if (phishingMatches.length >= 2) {
            analysis.signals.suspicious.push("Multiple phishing patterns detected");
            analysis.details.sourceCredibility -= 45;
            analysis.redFlags.push("Phishing attempt detected");
        }
        else if (phishingMatches.length === 1) {
            analysis.signals.suspicious.push(`Potential phishing pattern: ${phishingMatches[0]}`);
            analysis.details.sourceCredibility -= 20;
        }
    }
    detectSuspiciousWording(analysis, text) {
        const suspiciousMatches = this.SUSPICIOUS_WORDING.filter((keyword) => text.includes(keyword));
        if (suspiciousMatches.length >= 3) {
            analysis.signals.suspicious.push("Multiple suspicious phrases detected");
            analysis.details.contentQuality -= 35;
            analysis.redFlags.push("Suspicious job offer language");
        }
        else if (suspiciousMatches.length >= 1) {
            analysis.signals.suspicious.push(`Contains suspicious phrase: ${suspiciousMatches[0]}`);
            analysis.details.contentQuality -= 15;
        }
    }
    detectContactIssues(analysis, text) {
        const hasEmail = /@/.test(text);
        const hasPhone = /\+?[\d\s\-()]{10,}/.test(text);
        const hasWhatsapp = text.includes("whatsapp");
        const hasTelegram = text.includes("telegram");
        const hasFormalContact = hasEmail || hasPhone;
        if (!hasFormalContact && (hasWhatsapp || hasTelegram)) {
            analysis.signals.suspicious.push("Only WhatsApp/Telegram contact, no email/phone");
            analysis.details.sourceCredibility -= 35;
            analysis.redFlags.push("Only informal contact methods provided");
        }
        else if (!hasFormalContact && !hasWhatsapp && !hasTelegram) {
            analysis.signals.suspicious.push("No contact information provided");
            analysis.details.sourceCredibility -= 30;
            analysis.redFlags.push("Missing contact details");
        }
        if (hasEmail && text.includes("@gmail.com")) {
            if (!text.toLowerCase().includes("google")) {
                analysis.signals.suspicious.push("Gmail address used for corporate communication");
                analysis.details.sourceCredibility -= 15;
            }
        }
    }
    detectGrammarQuality(analysis, metadata) {
        if (metadata?.hasGrammarIssues === true) {
            analysis.signals.suspicious.push("Multiple grammar and spelling errors");
            analysis.details.contentQuality -= 25;
            analysis.redFlags.push("Poor grammar quality");
        }
        else if (metadata?.hasGrammarIssues === false) {
            analysis.signals.verified.push("Professional grammar and spelling");
            analysis.details.contentQuality += 20;
        }
        // Count potential grammar issues if content is provided
        const content = metadata?.content ||
            metadata?.extractedText ||
            "";
        if (content) {
            const grammarIssueCount = this.analyzeGrammarIssues(content);
            if (grammarIssueCount >= 5) {
                analysis.signals.suspicious.push("Detected multiple grammar issues");
                analysis.details.contentQuality -= 20;
            }
        }
        if (metadata?.contentLength && typeof metadata.contentLength === "number") {
            if (metadata.contentLength > 500) {
                analysis.signals.verified.push("Contains substantial detailed content");
                analysis.details.contentQuality += 10;
            }
            else if (metadata.contentLength < 100) {
                analysis.signals.suspicious.push("Content is too brief");
                analysis.details.contentQuality -= 15;
                analysis.redFlags.push("Content too brief");
            }
        }
    }
    detectFakeOffers(analysis, text) {
        const fakeIndicators = this.FAKE_OFFER_INDICATORS.filter((indicator) => text.includes(indicator));
        if (fakeIndicators.length >= 2) {
            analysis.signals.suspicious.push("Multiple fake offer indicators");
            analysis.details.sourceCredibility -= 40;
            analysis.redFlags.push("Likely fake offer letter");
        }
        else if (fakeIndicators.length === 1) {
            analysis.signals.suspicious.push("Potential fake offer language detected");
            analysis.details.sourceCredibility -= 20;
        }
    }
    hasSuspiciousDomain(domain) {
        const domainLower = domain.toLowerCase();
        // Check for common phishing domain patterns
        const suspiciousDomains = [
            "bit.ly",
            "tinyurl.com",
            "goo.gl",
            "short.link",
            "paypal-verify",
            "amazon-security",
            "google-verify",
            "microsoft-update",
        ];
        return suspiciousDomains.some((susp) => domainLower.includes(susp));
    }
    analyzeGrammarIssues(text) {
        let issues = 0;
        // Check for common grammar patterns
        if (/u r |ur [a-z]/.test(text))
            issues++; // "u r" instead of "you are"
        if (/\b(teh|recieved|occured|bussiness)\b/i.test(text))
            issues++; // Common misspellings
        if (/[!]{2,}|[\?]{2,}/.test(text))
            issues++; // Multiple exclamation/question marks
        if (/\b([a-z])\1{2,}\b/i.test(text))
            issues++; // Repeated characters
        if (!/[.!?]$/.test(text.trim()))
            issues++; // No ending punctuation
        return issues;
    }
    hasUnrealisticSalary(text) {
        const textLower = text.toLowerCase();
        return this.UNREALISTIC_SALARY_PATTERNS.some((pattern) => textLower.includes(pattern.toLowerCase()));
    }
    isKnownCompany(company) {
        const companyLower = company.toLowerCase().trim();
        return this.KNOWN_COMPANIES.some((known) => companyLower.includes(known) || known.includes(companyLower));
    }
    isOfficialDomain(domain) {
        const domainLower = domain.toLowerCase();
        const knownOfficialDomains = [
            "microsoft.com",
            "google.com",
            "apple.com",
            "amazon.com",
            "meta.com",
            "netflix.com",
            "uber.com",
            "airbnb.com",
            "stripe.com",
            "twilio.com",
            "figma.com",
            "notion.com",
            "slack.com",
            "github.com",
            "adobe.com",
            "salesforce.com",
            "oracle.com",
            "ibm.com",
            "intel.com",
            "cisco.com",
            "nvidia.com",
        ];
        return knownOfficialDomains.some((official) => domainLower.endsWith(official));
    }
    calculateWeightedScore(details) {
        const rawScore = details.documentAuthenticity *
            this.AUTHENTICITY_WEIGHTS.documentAuthenticity +
            details.sourceCredibility *
                this.AUTHENTICITY_WEIGHTS.sourceCredibility +
            details.contentQuality * this.AUTHENTICITY_WEIGHTS.contentQuality;
        return Math.min(100, Math.max(0, Math.round(rawScore)));
    }
}
