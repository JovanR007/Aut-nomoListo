"use client";

import { useState } from "react";
import { ChevronDown, Receipt, Wifi, Laptop, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeductionItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
    limit?: string;
}

const COMMON_DEDUCTIONS: DeductionItem[] = [
    {
        icon: <Wifi className="w-4 h-4" />,
        title: "Suministros Vivienda (Luz, Agua, Internet)",
        desc: "30% de la proporción entre metros vivienda / despacho.",
        limit: "~30% del 20% del área"
    },
    {
        icon: <Laptop className="w-4 h-4" />,
        title: "Equipos y Software",
        desc: "Portátiles, Móviles, Suscripciones (Zoom, Adobe).",
        limit: "100% deducible"
    },
    {
        icon: <Coffee className="w-4 h-4" />,
        title: "Dietas (Comidas)",
        desc: "Comidas de negocios en hostelería (pago con tarjeta).",
        limit: "€26.67 / día (España)"
    },
    {
        icon: <Receipt className="w-4 h-4" />,
        title: "Servicios Profesionales",
        desc: "Gestoría, Abogados, Hosting Web, Dominios.",
        limit: "100% deducible"
    }
];

export function ExpenseCheatSheet() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card-pastel overflow-hidden mt-8 max-w-lg mx-auto w-full transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <Receipt className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-700">¿Qué puedo desgravar?</span>
                </div>
                <ChevronDown
                    className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")}
                />
            </button>

            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out px-4",
                    isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden space-y-3">
                    <p className="text-xs text-slate-400 mb-3">
                        *Regla general: El gasto debe ser exclusivo para la actividad.
                    </p>

                    {COMMON_DEDUCTIONS.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="text-slate-400 mt-0.5">{item.icon}</div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                {item.limit && (
                                    <span className="inline-block mt-1 text-[10px] font-medium bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-400">
                                        Límite: {item.limit}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
