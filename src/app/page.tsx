import { CalculatorView } from "@/components/calculator/calculator-view";
import { TaxGuide } from "@/components/content/tax-guide";
import { Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 gap-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-xs font-semibold text-primary mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Actualizado Reglas Fiscales 2026
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-800">
          <span className="block text-xl md:text-2xl font-medium text-slate-400 mb-2 tracking-normal">Bienvenido a</span>
          Tu Cuota <span className="text-primary underline decoration-wavy decoration-primary/30 decoration-2 underline-offset-4">2026</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          La calculadora de autónomos más bonita y precisa.
          <span className="block mt-2 text-sm text-slate-400">Sin líos. Sin Excel. Solo tu dinero real.</span>
        </p>
      </div>

      {/* Calculator Section */}
      <CalculatorView />

      {/* Educational Guide */}
      <TaxGuide />

      {/* Footer / Trust */}
      <footer className="mt-auto py-8 text-center text-slate-400 text-sm space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calculator className="w-4 h-4" />
          <span>Cálculos locales. Tus datos no salen de tu navegador.</span>
        </div>
        <p>&copy; 2026 Tu Cuota. Hecho con ❤️ en España.</p>
        <div className="flex gap-4 justify-center text-xs">
          <a href="/privacy" className="hover:text-primary transition-colors">Privacidad</a>
          {/* Future: Terms */}
        </div>
      </footer>
    </div>
  );
}
