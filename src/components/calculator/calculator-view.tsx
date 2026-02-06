"use client";

import { useMemo, useState } from "react";
import { InputForm } from "./input-form";
import { ResultCard } from "./result-card";
import { ExpenseCheatSheet } from "./expense-cheat-sheet";
import { CalculatorInputs } from "@/types/calculator";
import { calculateNetIncome } from "@/lib/tax-logic";

export function CalculatorView() {
    const [inputs, setInputs] = useState<CalculatorInputs>({
        revenue: 0,
        expenses: 0,
        isNewFreelancer: false,
        isBeckhamLaw: false,
        period: 'monthly' // Default to monthly as it's more common mental model
    });

    const calculationResult = useMemo(() => {
        // Normalize to Annual for Logic
        const annualRevenue = inputs.period === 'monthly' ? inputs.revenue * 12 : inputs.revenue;
        const annualExpenses = inputs.period === 'monthly' ? inputs.expenses * 12 : inputs.expenses;

        return calculateNetIncome(annualRevenue, annualExpenses, inputs.isNewFreelancer, inputs.isBeckhamLaw);
    }, [inputs]);

    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto w-full">
            <div className="order-2 lg:order-1">
                <InputForm values={inputs} onChange={setInputs} />

                {/* SEO Content / Notes */}
                <div className="mt-8 text-slate-400 text-sm space-y-2 px-4">
                    <p>* Cálculos basados en tablas IRPF Estatal 2026.</p>
                    <p>* Cuotas Seguridad Social <strong>congeladas a niveles de 2025</strong>.</p>
                </div>

                {/* Deductible Expense Cheat Sheet */}
                <ExpenseCheatSheet />
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-8">
                <ResultCard result={calculationResult} period={inputs.period} />
            </div>
        </div>
    );
}
