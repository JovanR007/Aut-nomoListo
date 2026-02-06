"use client";

import { CalculatorInputs } from "@/types/calculator";
import { Euro, TrendingDown, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFormProps {
    values: CalculatorInputs;
    onChange: (values: CalculatorInputs) => void;
}

export function InputForm({ values, onChange }: InputFormProps) {
    const handleChange = (field: keyof CalculatorInputs, value: any) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="card-pastel p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Revenue Section */}
            <div className="space-y-4">
                <label className="flex items-center gap-2 text-slate-500 font-semibold mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Euro className="w-5 h-5" />
                    </div>
                    Ingresos (Facturación)
                </label>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">€</div>
                    <input
                        type="number"
                        value={values.revenue || ''}
                        onChange={(e) => handleChange('revenue', Number(e.target.value))}
                        className="input-pastel w-full pl-10 pr-24 py-4"
                        placeholder="0.00"
                    />
                    {/* Toggle Period */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex bg-slate-100 rounded-lg p-1">
                        <button
                            onClick={() => handleChange('period', 'monthly')}
                            className={cn(
                                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                                values.period === 'monthly' ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            Mes
                        </button>
                        <button
                            onClick={() => handleChange('period', 'annual')}
                            className={cn(
                                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                                values.period === 'annual' ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            Año
                        </button>
                    </div>
                </div>
            </div>

            {/* Expenses Section */}
            <div className="space-y-4">
                <label className="flex items-center gap-2 text-slate-500 font-semibold mb-2">
                    <div className="p-2 bg-rose-100 rounded-lg text-rose-500">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                    Gastos Deducibles
                </label>

                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">€</div>
                    <input
                        type="number"
                        value={values.expenses || ''}
                        onChange={(e) => handleChange('expenses', Number(e.target.value))}
                        className="input-pastel w-full pl-10 py-4"
                        placeholder="0.00"
                    />
                </div>
            </div>

            {/* Toggles */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
                {/* New Freelancer Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-500">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-700">¿Nuevo Autónomo?</p>
                            <p className="text-xs text-slate-500">Aplicar "Tarifa Plana" (€80/mes)</p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleChange('isNewFreelancer', !values.isNewFreelancer)}
                        className={cn(
                            "w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20",
                            values.isNewFreelancer ? "bg-primary" : "bg-slate-300"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200",
                            values.isNewFreelancer ? "translate-x-6" : "translate-x-0"
                        )} />
                    </button>
                </div>

                {/* Beckham Law Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 hover:bg-amber-100/80 transition-colors border border-amber-200">
                    <div className="flex items-center gap-3">
                        {/* Using a star or plain icon for Expat/Special */}
                        <div className="p-2 bg-amber-200 rounded-lg text-amber-700">
                            <span className="font-bold text-lg leading-none">★</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-700">Ley Beckham</p>
                            <p className="text-xs text-slate-500">Régimen Especial Expats (24% Fijo)</p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleChange('isBeckhamLaw', !values.isBeckhamLaw)}
                        className={cn(
                            "w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500/20",
                            values.isBeckhamLaw ? "bg-amber-500" : "bg-slate-300"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200",
                            values.isBeckhamLaw ? "translate-x-6" : "translate-x-0"
                        )} />
                    </button>
                </div>
            </div>

        </div>
    );
}
