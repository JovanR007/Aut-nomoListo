export interface CalculatorInputs {
    revenue: number;
    expenses: number;
    isNewFreelancer: boolean;
    isBeckhamLaw: boolean;
    period: 'monthly' | 'annual';
}

export interface SocialSecurityBreakdown {
    monthly: number;
    description: string;
}

export interface TaxResult {
    grossIncome: number;
    expenses: number;
    socialSecurity: number;
    irpf: number;
    netIncome: number;
    socialSecurityBreakdown: SocialSecurityBreakdown;
    effectiveRate: number; // Percentage (0-100)
    marginalRate: number; // Percentage (0-100)
}
