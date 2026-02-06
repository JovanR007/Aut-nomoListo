"use client";

import { TaxResult } from "@/types/calculator";
import { cn } from "@/lib/utils";
import { ArrowRight, Wallet, Building, PiggyBank } from "lucide-react";

interface ResultCardProps {
    result: TaxResult;
    period: 'monthly' | 'annual';
}

export function ResultCard({ result, period }: ResultCardProps) {
    const isMonthly = period === 'monthly';

    // Calculate display values
    const displayNet = result.netIncome / (isMonthly ? 12 : 1);
    const displaySS = result.socialSecurity / (isMonthly ? 12 : 1);
    const displayIRPF = result.irpf / (isMonthly ? 12 : 1);
    const displayGross = result.grossIncome / (isMonthly ? 12 : 1);

    // Percentages for Donut
    // If net is negative, chart logic needs to handle it (or just show 100% tax).
    // For simplicity V1: If net < 0, show 100% tax visual.
    const grossForCalc = Math.max(displayGross, 0.01); // avoid div by zero
    const ssPct = (displaySS / grossForCalc) * 100;
    const irpfPct = (displayIRPF / grossForCalc) * 100;
    // If net is negative, we can't show "Net Pct" easily in a pie. 
    // We'll just show SS + IRPF taking up the whole pie if they exceed income.
    const netPct = Math.max(0, 100 - ssPct - irpfPct);

    // Conic Gradient Logic
    // Color 1 (Net): Primary/Mint? Let's use Mint for Money/Keep.
    // Color 2 (SS): Violet (Primary)
    // Color 3 (IRPF): Orange (Secondary)

    // Steps:
    // Mint starts at 0deg, goes to netPct%.
    // Violet starts at netPct%, goes to netPct + ssPct %.
    // Orange starts at netPct + ssPct%, goes to 100%.

    const conicStyle = {
        background: `conic-gradient(
      var(--success) 0% ${netPct}%,
      var(--primary) ${netPct}% ${netPct + ssPct}%,
      #F97316 ${netPct + ssPct}% 100%
    )`
    };

    const netColor = "text-success"; // Mint
    const ssColor = "text-primary"; // Violet
    const irpfColor = "text-orange-500"; // Orange

    return (
        <div className="card-pastel p-8 space-y-8 relative overflow-hidden group">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <Wallet className="w-32 h-32 text-primary rotate-12 -translate-y-8 translate-x-8" />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

                {/* Donut Chart */}
                <div className="relative w-40 h-40 flex-shrink-0">
                    <div
                        className="w-full h-full rounded-full ring-8 ring-slate-50"
                        style={conicStyle}
                    />
                    {/* Inner White Circle */}
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                        <span className="text-xs text-slate-400 font-medium uppercase">Tu Neto</span>
                        <span className={cn("text-xl font-bold font-mono tracking-tight", netColor)}>
                            {netPct.toFixed(0)}%
                        </span>
                    </div>
                </div>

                {/* Big Number Display */}
                <div className="space-y-2 text-center md:text-left flex-1">
                    <p className="text-slate-400 font-medium tracking-wide text-sm uppercase">{isMonthly ? 'Mensual' : 'Anual'} Estimado</p>
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                        <span className={cn("text-5xl md:text-6xl font-bold tracking-tight text-slate-800", displayNet < 0 && "text-destructive")}>
                            €{displayNet.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-xl text-slate-400 font-medium">/{isMonthly ? 'mes' : 'año'}</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium flex items-center justify-center md:justify-start gap-1.5">
                        You keep <span className="text-success font-bold">{netPct.toFixed(1)}%</span> of your earnings
                    </p>
                </div>

            </div>

            {/* Breakdown Legend (Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-100">

                {/* Social Security */}
                <div className="flex flex-col p-3 rounded-xl bg-violet-50/50 border border-violet-100">
                    <span className="text-xs font-medium text-slate-500 mb-1">Seguridad Social</span>
                    <span className="text-lg font-mono font-semibold text-slate-700">€{displaySS.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</span>
                </div>

                {/* IRPF */}
                <div className="flex flex-col p-3 rounded-xl bg-orange-50/50 border border-orange-100">
                    <span className="text-xs font-medium text-slate-500 mb-1">IRPF (Impuesto)</span>
                    <span className="text-lg font-mono font-semibold text-slate-700">€{displayIRPF.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</span>
                </div>

                {/* Net */}
                <div className="flex flex-col p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-xs font-medium text-slate-500 mb-1">Sueldo Neto</span>
                    <span className={cn("text-lg font-mono font-bold", displayNet < 0 ? "text-red-500" : "text-emerald-600")}>
                        €{displayNet.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    </span>
                </div>

            </div>

            {/* Detailed Ledger Table (Desktop mostly) */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 mt-4">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="p-3 text-left pl-4">Concepto</th>
                            <th className="p-3 text-right pr-4">Importe ({isMonthly ? 'Mensual' : 'Anual'})</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                            <td className="p-3 pl-4 text-slate-600">Base Imponible (Beneficio)</td>
                            <td className="p-3 pr-4 text-right font-mono text-slate-700">€{(result.grossIncome - result.expenses).toLocaleString('es-ES')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 pl-4 text-slate-600">IRPF (Estatal)</td>
                            <td className="p-3 pr-4 text-right font-mono text-red-500">- €{Math.abs(isMonthly ? result.irpf / 12 : result.irpf).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td className="p-3 pl-4 text-slate-600">Seguridad Social</td>
                            <td className="p-3 pr-4 text-right font-mono text-red-500">- €{Math.abs(isMonthly ? result.socialSecurity / 12 : result.socialSecurity).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr className="bg-slate-50/50 font-bold">
                            <td className="p-3 pl-4 text-slate-800">Total Neto a Percibir</td>
                            <td className={cn("p-3 pr-4 text-right font-mono", displayNet < 0 ? "text-red-600" : "text-emerald-600")}>
                                €{displayNet.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Annual Summary */}
            <div className="pt-4 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100">
                <div className="flex gap-4">
                    <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-300">Effective Rate</span>
                        <span className="font-mono font-semibold text-slate-600">{result.effectiveRate.toFixed(1)}%</span>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-300">Marginal Rate</span>
                        <span className="font-mono font-semibold text-slate-600">{result.marginalRate.toFixed(0)}%</span>
                    </div>
                </div>
                <div>
                    <span className="mr-2">Annual Total Net</span>
                    <span className="font-mono font-medium text-slate-600">€{result.netIncome.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
        </div >
    );
}
