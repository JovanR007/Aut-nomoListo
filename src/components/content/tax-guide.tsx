"use client";

import { BookOpen, FileText, PiggyBank, ShieldCheck } from "lucide-react";

export function TaxGuide() {
    return (
        <div className="max-w-4xl mx-auto w-full space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">

            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-slate-800">Entendiendo tus Impuestos 🇪🇸</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    El sistema fiscal español para *Autónomos* puede ser complejo. Aquí tienes un resumen de los conceptos clave para el **año fiscal 2026**.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Card 1: Net Income */}
                <div className="card-pastel p-8 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-primary mb-2">
                        <PiggyBank className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">1. Rendimiento Neto</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Al igual que en otros sistemas, Hacienda calcula tus impuestos basándose en tu <strong>Beneficio Real</strong>.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm font-mono text-slate-600">
                        Ingresos - Gastos Deducibles = Rendimiento Neto
                    </div>
                    <p className="text-slate-500 text-sm">
                        Sobre esta cantidad se calculan el <strong>IRPF</strong> y la <strong>Cuota de Seguridad Social</strong>.
                    </p>
                </div>

                {/* Card 2: 7% Rule */}
                <div className="card-pastel p-8 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">2. Gastos de Difícil Justificación (7%)</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Hacienda permite una deducción automática para gastos difíciles de demostrar (teléfono, suministros, etc).
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                        <li>Deducción automática del <strong>7%</strong> sobre el Rendimiento Neto.</li>
                        <li>El tope máximo es de <strong>€2,000 al año</strong>.</li>
                        <li>¡Nuestra calculadora aplica esto automáticamente!</li>
                    </ul>
                </div>

                {/* Card 3: Social Security */}
                <div className="card-pastel p-8 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">3. Cuota Seguridad Social</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Contribución al sistema público (Sanidad, Pensión). En 2026, las cuotas se mantienen <strong>congeladas a niveles de 2025</strong>.
                    </p>
                    <p className="text-slate-500 text-sm">
                        <strong>Importante:</strong> Tus pagos a la Seguridad Social son un <em>Gasto Deducible</em> para el IRPF. Pagar tu cuota reduce tu base imponible.
                    </p>
                </div>

                {/* Card 4: IRPF - Expanded Table */}
                <div className="card-pastel p-8 space-y-6 md:col-span-2">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">4. IRPF (Impuesto Renta)</h3>
                            <p className="text-slate-500 text-sm">Tramos Estatales Generales 2026.</p>
                        </div>
                    </div>

                    <p className="text-slate-500 leading-relaxed text-sm">
                        Es un impuesto progresivo. Solo pagas el tipo más alto por la parte de dinero que cae <em>dentro</em> de ese tramo.
                    </p>

                    <div className="overflow-hidden rounded-xl border border-slate-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="p-4">Base Imponible (Hasta)</th>
                                    <th className="p-4">Tipo (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-4 text-slate-700">€0 - €12,450</td>
                                    <td className="p-4 font-mono font-medium text-orange-600">19%</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-4 text-slate-700">€12,450 - €20,200</td>
                                    <td className="p-4 font-mono font-medium text-orange-600">24%</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-4 text-slate-700">€20,200 - €35,200</td>
                                    <td className="p-4 font-mono font-medium text-orange-600">30%</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-4 text-slate-700">€35,200 - €60,000</td>
                                    <td className="p-4 font-mono font-medium text-orange-600">37%</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-4 text-slate-700">€60,000 - €300,000</td>
                                    <td className="p-4 font-mono font-medium text-orange-600">45%</td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="p-4 text-slate-700">&gt; €300,000</td>
                                    <td className="p-4 font-mono font-medium text-orange-600">47%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
