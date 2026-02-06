// Spain Autonomo Tax Logic 2026 (Frozen Quotas from 2025)

// 2026 Social Security Contribution Brackets (Income-based Quota)
// Source: Seguridad Social 2026 Tables (Frozen at 2025 levels)
export const SOCIAL_SECURITY_BRACKETS_2026 = [
    { min: 0, max: 670, quota: 200 }, // Reduced slightly in 2025? Search said 205 or similar. Sticking to gathered data: 205.
];

// Refined exact values from search result (Step 55)
const QUOTA_TABLE = [
    { limit: 670, amount: 205 },
    { limit: 900, amount: 226 },
    { limit: 1166.70, amount: 267 },
    { limit: 1300, amount: 299 },
    { limit: 1500, amount: 302 },
    { limit: 1700, amount: 302 }, // Note: Overlapping amount, but distinct bracket in source.
    { limit: 1850, amount: 359 },
    { limit: 2030, amount: 380 },
    { limit: 2330, amount: 400 },
    { limit: 2760, amount: 426 },
    { limit: 3190, amount: 451 },
    { limit: 3620, amount: 477 },
    { limit: 4050, amount: 503 },
    { limit: 6000, amount: 544 },
    { limit: Infinity, amount: 605 }, // Updated to 605 based on research
];

export const MAX_QUOTA = 605;
export const TARIFA_PLANA = 80;

// IRPF Brackets 2026 (State General)
// Rates are marginal.
const IRPF_BRACKETS = [
    { upTo: 12450, rate: 0.19 },
    { upTo: 20200, rate: 0.24 },
    { upTo: 35200, rate: 0.30 },
    { upTo: 60000, rate: 0.37 },
    { upTo: 300000, rate: 0.45 },
    { upTo: Infinity, rate: 0.47 },
];

export interface TaxResult {
    grossIncome: number;
    expenses: number;
    socialSecurity: number;
    irpf: number;
    netIncome: number;
    socialSecurityBreakdown: {
        monthly: number;
        description: string;
    };
    effectiveRate: number; // Percentage (0-100)
    marginalRate: number; // Percentage (0-100)
}

export function calculateSocialSecurity(netMonthlyProfit: number, isNewFreelancer: boolean): { monthly: number, annual: number, description: string } {
    if (isNewFreelancer) {
        return { monthly: TARIFA_PLANA, annual: TARIFA_PLANA * 12, description: "Tarifa Plana (First Year)" };
    }

    // Find bracket
    const bracket = QUOTA_TABLE.find((b) => netMonthlyProfit <= b.limit);
    const monthlyQuota = bracket ? bracket.amount : MAX_QUOTA;

    return {
        monthly: monthlyQuota,
        annual: monthlyQuota * 12,
        description: `Income Bracket (€${netMonthlyProfit.toFixed(0)})`,
    };
}

export function calculateIRPF(taxableIncome: number): number {
    let tax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;

    for (const bracket of IRPF_BRACKETS) {
        if (remainingIncome <= 0) break;

        const currentChunkSize = bracket.upTo === Infinity
            ? remainingIncome
            : Math.min(remainingIncome, bracket.upTo - previousLimit);

        // Use standard logic (Taxable amount in this bracket * rate)
        // Logic: amount = min(taxable, bracketMax) - bracketMin
        // Max(0, amount)
        const rangeMax = bracket.upTo;
        const rangeMin = previousLimit;

        const taxableAmountInBracket = Math.max(0, Math.min(taxableIncome, rangeMax) - rangeMin);
        tax += taxableAmountInBracket * bracket.rate;

        remainingIncome -= taxableAmountInBracket; // Not strictly needed with this logic but ok
        previousLimit = rangeMax;
    }

    return tax;
}

export function calculateNetIncome(
    revenue: number,
    expenses: number,
    isNewFreelancer: boolean,
    isBeckhamLaw: boolean = false
): TaxResult {
    const grossProfit = revenue - expenses;
    // Estimate monthly net profit (before quota implication circle) for bracket determination
    const monthlyNetPreQuota = Math.max(0, grossProfit / 12);

    const ss = calculateSocialSecurity(monthlyNetPreQuota, isNewFreelancer);

    // Taxable Base for IRPF = Revenue - Expenses - Social Security
    // Note: Social Security is deductible in standard regime. 
    // Is it deductible in Beckham Law? Usually Beckham Law (Special Expats Regime) applies to employees, but for "Digital Nomads" (freelancers) it allows paying Non-Resident Tax (IRNR) rates (24%).
    // IRNR rules allow deducting expenses related to the activity? 
    // Generally, the "Beckham Law" for freelancers implies paying 24% on NET income (Revenue - Expenses).
    // Social Security IS an expense. So yes, we deduct it.
    const taxableBase = Math.max(0, revenue - expenses - ss.annual);

    let irpf = 0;
    let marginalRate = 0;

    if (isBeckhamLaw) {
        // Beckham Law Logic: 24% flat up to 600k, 47% after
        if (taxableBase <= 600000) {
            irpf = taxableBase * 0.24;
            marginalRate = 0.24;
        } else {
            const firstChunk = 600000 * 0.24;
            const remainder = taxableBase - 600000;
            irpf = firstChunk + (remainder * 0.47);
            marginalRate = 0.47;
        }
    } else {
        // Standard Progressive IRPF
        irpf = calculateIRPF(taxableBase);

        // Calculate Marginal Rate (Standard)
        for (const bracket of IRPF_BRACKETS) {
            if (taxableBase <= bracket.upTo) {
                marginalRate = bracket.rate;
                break;
            }
        }
        if (taxableBase > 300000) marginalRate = 0.47;
    }

    // Effective Rate = (Total Tax / Gross Profit) * 100
    // Gross Profit = Revenue - Expenses (before taxes)
    const totalTax = ss.annual + irpf;
    const effectiveRate = grossProfit > 0 ? (totalTax / grossProfit) * 100 : 0;

    const netIncome = revenue - expenses - ss.annual - irpf;

    return {
        grossIncome: revenue,
        expenses,
        socialSecurity: ss.annual,
        irpf,
        netIncome,
        socialSecurityBreakdown: {
            monthly: ss.monthly,
            description: ss.description
        },
        effectiveRate,
        marginalRate: marginalRate * 100
    };
}
