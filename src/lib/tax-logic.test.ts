import { describe, it, expect } from 'vitest';
import { calculateSocialSecurity, calculateIRPF, calculateNetIncome } from './tax-logic';

describe('Spain Tax Logic 2025', () => {

    describe('Social Security Quota (Income-based)', () => {
        it('should return Tarifa Plana for new freelancers', () => {
            const result = calculateSocialSecurity(2000, true);
            expect(result.monthly).toBe(80);
            expect(result.description).toContain('Tarifa Plana');
        });

        it('should return correct quota for low income (€600)', () => {
            // Bracket <= 670 -> 205 (from our code)
            const result = calculateSocialSecurity(600, false);
            expect(result.monthly).toBe(205);
        });

        it('should return correct quota for mid income (€1500)', () => {
            // Bracket €1500 limit -> 302
            // Code logic: find(b => net <= b.limit). 
            // 1500 <= 1500 is true. So it should match the 1500 limit bracket.
            const result = calculateSocialSecurity(1500, false);
            expect(result.monthly).toBe(302);
        });

        it('should return correct quota for high income (> €6000)', () => {
            const result = calculateSocialSecurity(7000, false);
            expect(result.monthly).toBe(605); // Search result confirmed 605
        });
    });

    describe('IRPF (Income Tax)', () => {
        it('should calculate 0 tax for 0 income', () => {
            expect(calculateIRPF(0)).toBe(0);
        });

        it('should calculate 19% for income within first bracket', () => {
            // 10,000 * 0.19 = 1900
            expect(calculateIRPF(10000)).toBe(1900);
        });

        it('should calculate progressive tax correctly', () => {
            // Income 20,000
            // 12,450 * 0.19 = 2365.5
            // Remainder (20,000 - 12,450) = 7,550
            // 7,550 * 0.24 = 1812
            // Total = 4177.5
            const tax = calculateIRPF(20000);
            expect(tax).toBeCloseTo(4177.5, 1);
        });
    });

    describe('Net Income Integration', () => {
        it('should calculate net income correctly for a standard case', () => {
            // Revenue: 2500/mo = 30000/yr
            // Expenses: 200/mo = 2400/yr
            // Net Pre Quota: 2300/mo -> Bracket €2030-€2330 -> €400 quota
            // Annual SS: 4800
            // Taxable Base IRPF: 30000 - 2400 - 4800 = 22800

            // IRPF Calc for 22800:
            // 0-12450 @ 19% = 2365.5
            // 12450-20200 @ 24% = 1860
            // 20200-22800 @ 30% = 780
            // Total IRPF = 5005.5

            // Expected Net = 30000 - 2400 - 4800 - 5005.5 = 17794.5

            const result = calculateNetIncome(30000, 2400, false);

            expect(result.grossIncome).toBe(30000);
            expect(result.socialSecurity).toBe(4800);
            expect(result.irpf).toBeCloseTo(5005.5, 1);
            expect(result.netIncome).toBeCloseTo(17794.5, 1);

            // New Rates Checks
            // Marginal Rate should be 30% (top dollar fell in 20200-35200 bracket)
            expect(result.marginalRate).toBe(30);

            // Effective Rate = (4800 + 5005.5) / (30000 - 2400) * 100
            // Total Tax = 9805.5
            // Gross Profit = 27600
            // Rate = 35.52%
            expect(result.effectiveRate).toBeCloseTo(35.52, 1);
        });
    });

    describe('Beckham Law (Special Expats Regime)', () => {
        it('should apply flat 24% rate for income <= 600k', () => {
            // Revenue 100k, Expenses 0.
            // SS (Max Base): 605 * 12 = 7260.
            // Taxable Base: 100,000 - 7,260 = 92,740.
            // IRPF (24%): 92,740 * 0.24 = 22,257.6

            const result = calculateNetIncome(100000, 0, false, true);

            expect(result.socialSecurity).toBe(7260); // Max Base
            expect(result.irpf).toBeCloseTo(22257.6, 1);
            expect(result.marginalRate).toBe(24);
        });

        it('should apply 47% rate for income > 600k', () => {
            // Revenue 700k. Expenses 0.
            // SS: 7260.
            // Taxable Base: 692,740.
            // First 600k @ 24% = 144,000.
            // Remainder 92,740 @ 47% = 43,587.8.
            // Total IRPF = 187,587.8

            const result = calculateNetIncome(700000, 0, false, true);

            expect(result.irpf).toBeCloseTo(187587.8, 1);
            expect(result.marginalRate).toBe(47);
        });
    });


});
