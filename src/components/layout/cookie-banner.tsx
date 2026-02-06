"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted
        const consented = localStorage.getItem("cookie_consent");
        if (!consented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <h3 className="font-bold text-slate-800 text-sm">🍪 Uso de Cookies</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Usamos cookies propias y de terceros (Google AdSense) para mejorar tu experiencia y mostrar publicidad relevante.
                        Al continuar navegando, aceptas su uso.
                        puedes leer más en nuestra <Link href="/privacy" className="text-primary underline hover:text-primary/80">Política de Privacidad</Link>.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="mt-4 flex gap-2">
                <button
                    onClick={handleAccept}
                    className="flex-1 bg-primary text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
                >
                    Aceptar y Continuar
                </button>
            </div>
        </div>
    );
}
