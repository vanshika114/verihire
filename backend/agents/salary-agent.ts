interface SalaryMetadata {
  extractedText: string;
  salary?: number;
  currency?: string;
  benefits?: string[];
  experience?: string;
  joiningBonus?: number;
  workLocation?: string;
  paymentTerms?: string;
}

interface FraudSignal {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

interface SalaryAnalysisResult {
  score: number;
  signals: FraudSignal[];
  redFlags: string[];
}

class SalaryAgent {
  private readonly SALARY_THRESHOLDS = {
    UNREALISTIC_MONTHLY: 500000,
    UNREALISTIC_ANNUAL: 5000000,
    ENTRY_LEVEL_MAX: 800000,
    MID_LEVEL_MAX: 1500000,
  };

  private readonly IMPOSSIBLE_BENEFITS = [
    'free house',
    'free car every month',
    'unlimited vacation 365 days',
    'guaranteed promotion',
    'guaranteed bonus',
    'work 0 hours',
    'paid sabbatical every month',
  ];

  private readonly SCAM_KEYWORDS = [
    'payment before joining',
    'upfront fee',
    'registration fee',
    'processing fee',
    'security deposit',
    'wire money',
    'bank transfer required',
  ];

  analyze(metadata: SalaryMetadata): SalaryAnalysisResult {
    const signals: FraudSignal[] = [];
    const redFlags: string[] = [];
    let score = 100;

    const extractedText = metadata.extractedText.toLowerCase();

    // Check for payment before joining scams
    const paymentScamScore = this.detectPaymentBeforeJoining(
      extractedText,
      signals,
      redFlags
    );
    score -= paymentScamScore;

    // Check for unrealistic salary
    const salaryScore = this.detectUnrealisticSalary(
      metadata,
      extractedText,
      signals,
      redFlags
    );
    score -= salaryScore;

    // Check for impossible benefits
    const benefitsScore = this.detectImpossibleBenefits(
      extractedText,
      signals,
      redFlags
    );
    score -= benefitsScore;

    // Check for work from home + huge salary mismatch
    const wfhScore = this.detectWorkFromHomeScam(
      metadata,
      extractedText,
      signals,
      redFlags
    );
    score -= wfhScore;

    // Check for no experience + very high pay
    const experienceScore = this.detectExperienceMismatch(
      metadata,
      extractedText,
      signals,
      redFlags
    );
    score -= experienceScore;

    // Check for joining bonus scams
    const bonusScore = this.detectJoiningBonusScam(
      metadata,
      extractedText,
      signals,
      redFlags
    );
    score -= bonusScore;

    score = Math.max(0, score);

    return {
      score,
      signals,
      redFlags,
    };
  }

  private detectPaymentBeforeJoining(
    text: string,
    signals: FraudSignal[],
    redFlags: string[]
  ): number {
    let score = 0;

    for (const keyword of this.SCAM_KEYWORDS) {
      if (text.includes(keyword)) {
        signals.push({
          type: 'PAYMENT_BEFORE_JOINING',
          severity: 'high',
          description: `Found keyword: "${keyword}" - legitimate jobs never require payment before employment`,
        });
        redFlags.push(`Payment demand detected: "${keyword}"`);
        score += 40;
      }
    }

    const paymentPatterns = [
      /pay.*before.*join/gi,
      /send.*money.*before/gi,
      /advance.*payment/gi,
      /processing.*fee.*before/gi,
    ];

    for (const pattern of paymentPatterns) {
      if (pattern.test(text)) {
        signals.push({
          type: 'PAYMENT_BEFORE_JOINING',
          severity: 'high',
          description:
            'Text indicates payment required before joining - major red flag',
        });
        redFlags.push('Payment required before employment');
        score += 40;
        break;
      }
    }

    return score;
  }

  private detectUnrealisticSalary(
    metadata: SalaryMetadata,
    text: string,
    signals: FraudSignal[],
    redFlags: string[]
  ): number {
    let score = 0;

    const salary = this.extractSalary(text);

    if (salary) {
      const monthlyEquivalent = salary / 12;

      if (monthlyEquivalent > this.SALARY_THRESHOLDS.UNREALISTIC_MONTHLY) {
        signals.push({
          type: 'UNREALISTIC_SALARY',
          severity: 'high',
          description: `Monthly equivalent salary ₹${monthlyEquivalent.toLocaleString()} exceeds realistic threshold`,
        });
        redFlags.push(
          `Unrealistic salary: ₹${monthlyEquivalent.toLocaleString()}/month`
        );
        score += 35;
      } else if (salary > this.SALARY_THRESHOLDS.UNREALISTIC_ANNUAL) {
        signals.push({
          type: 'UNREALISTIC_SALARY',
          severity: 'medium',
          description: `Annual salary ₹${salary.toLocaleString()} is exceptionally high for most positions`,
        });
        redFlags.push(`Very high salary: ₹${salary.toLocaleString()}/year`);
        score += 25;
      }
    }

    return score;
  }

  private detectImpossibleBenefits(
    text: string,
    signals: FraudSignal[],
    redFlags: string[]
  ): number {
    let score = 0;

    for (const benefit of this.IMPOSSIBLE_BENEFITS) {
      if (text.includes(benefit)) {
        signals.push({
          type: 'IMPOSSIBLE_BENEFITS',
          severity: 'high',
          description: `Impossible benefit found: "${benefit}" - no legitimate company offers this`,
        });
        redFlags.push(`Impossible benefit: "${benefit}"`);
        score += 30;
      }
    }

    return score;
  }

  private detectWorkFromHomeScam(
    metadata: SalaryMetadata,
    text: string,
    signals: FraudSignal[],
    redFlags: string[]
  ): number {
    let score = 0;

    const isRemote =
      text.includes('work from home') ||
      text.includes('remote') ||
      text.includes('wfh') ||
      metadata.workLocation?.toLowerCase().includes('remote');

    if (isRemote) {
      const salary = this.extractSalary(text);
      const monthlyEquivalent = salary ? salary / 12 : 0;

      if (
        monthlyEquivalent > this.SALARY_THRESHOLDS.ENTRY_LEVEL_MAX * 0.8 &&
        monthlyEquivalent < this.SALARY_THRESHOLDS.UNREALISTIC_MONTHLY
      ) {
        if (!this.hasRealisticSkillsRequired(text)) {
          signals.push({
            type: 'WFH_HIGH_SALARY_MISMATCH',
            severity: 'medium',
            description: `High salary (₹${monthlyEquivalent.toLocaleString()}/month) with remote work and no clear skill requirements`,
          });
          redFlags.push(
            `Remote job with unusually high salary: ₹${monthlyEquivalent.toLocaleString()}/month`
          );
          score += 20;
        }
      }
    }

    return score;
  }

  private detectExperienceMismatch(
    metadata: SalaryMetadata,
    text: string,
    signals: FraudSignal[],
    redFlags: string[]
  ): number {
    let score = 0;

    const isEntryLevel =
      text.includes('fresher') ||
      text.includes('entry level') ||
      text.includes('no experience required') ||
      text.includes('0-1 years') ||
      text.includes('0 years');

    if (isEntryLevel) {
      const salary = this.extractSalary(text);
      const monthlyEquivalent = salary ? salary / 12 : 0;

      if (monthlyEquivalent > this.SALARY_THRESHOLDS.ENTRY_LEVEL_MAX) {
        signals.push({
          type: 'EXPERIENCE_SALARY_MISMATCH',
          severity: 'high',
          description: `Entry-level position with unrealistically high salary ₹${monthlyEquivalent.toLocaleString()}/month`,
        });
        redFlags.push(
          `Fresher/Entry-level position offering ₹${monthlyEquivalent.toLocaleString()}/month`
        );
        score += 35;
      }
    }

    return score;
  }

  private detectJoiningBonusScam(
    metadata: SalaryMetadata,
    text: string,
    signals: FraudSignal[],
    redFlags: string[]
  ): number {
    let score = 0;

    const bonusPatterns = [
      /joining bonus.*₹?[\d,]+/gi,
      /sign.*bonus.*₹?[\d,]+/gi,
      /immediately.*bonus/gi,
    ];

    let foundBonus = false;
    for (const pattern of bonusPatterns) {
      if (pattern.test(text)) {
        foundBonus = true;
        break;
      }
    }

    if (foundBonus) {
      const bonus = this.extractJoiningBonus(text);

      if (bonus && bonus > 500000) {
        signals.push({
          type: 'JOINING_BONUS_SCAM',
          severity: 'medium',
          description: `Unusually large joining bonus ₹${bonus.toLocaleString()} - common scam tactic`,
        });
        redFlags.push(`Large joining bonus offered: ₹${bonus.toLocaleString()}`);
        score += 20;
      }

      if (text.includes('bonus') && text.includes('before joining')) {
        signals.push({
          type: 'JOINING_BONUS_SCAM',
          severity: 'high',
          description: 'Bonus payment required before joining - clear scam indicator',
        });
        redFlags.push('Bonus payment required before joining');
        score += 30;
      }
    }

    return score;
  }

  private extractSalary(text: string): number {
    const salaryPatterns = [
      /(?:salary|ctc|pay|compensation)[\s:]*₹?([\d,]+)/gi,
      /₹\s*([\d,]+)\s*(?:per month|\/month|pm|monthly|per annum|annually)/gi,
      /₹?([\d,]+)\s*(?:per month|\/month|pm|monthly)/gi,
    ];

    for (const pattern of salaryPatterns) {
      const match = text.match(pattern);
      if (match) {
        for (const m of match) {
          const numberStr = m.replace(/[^\d]/g, '');
          const num = parseInt(numberStr, 10);
          if (num > 0) {
            return num;
          }
        }
      }
    }

    return 0;
  }

  private extractJoiningBonus(text: string): number {
    const bonusPatterns = [
      /joining bonus[\s:]*₹?([\d,]+)/gi,
      /sign.*bonus[\s:]*₹?([\d,]+)/gi,
      /₹\s*([\d,]+)\s*(?:joining|sign).*bonus/gi,
    ];

    for (const pattern of bonusPatterns) {
      const match = text.match(pattern);
      if (match) {
        for (const m of match) {
          const numberStr = m.replace(/[^\d]/g, '');
          const num = parseInt(numberStr, 10);
          if (num > 0) {
            return num;
          }
        }
      }
    }

    return 0;
  }

  private hasRealisticSkillsRequired(text: string): boolean {
    const skillKeywords = [
      'experience',
      'technical',
      'proficiency',
      'expertise',
      'certification',
      'degree',
      'qualification',
      'years of',
    ];

    return skillKeywords.some((keyword) => text.includes(keyword));
  }
}

export default SalaryAgent;
export type { SalaryAnalysisResult, 
    SalaryMetadata, 
    FraudSignal 
};