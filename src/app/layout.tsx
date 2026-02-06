import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tu Cuota 2026 | Calculadora Autónomos España",
  description: "Descubre tu Sueldo Neto Real con 'Tu Cuota 2026'. Cálculos precisos de IRPF, Seguridad Social y Ley Beckham.",
  keywords: ["Tu Cuota 2026", "Calculadora Autónomo", "Sueldo Neto España", "Cuota Seguridad Social", "IRPF 2026"],
  authors: [{ name: "Tu Cuota 2026" }],
  openGraph: {
    title: "Tu Cuota 2026 | Calculadora Autónomos España",
    description: "La calculadora más bonita y precisa para Autónomos. ¿Cuánto ganas realmente?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711463860910246"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn(outfit.className, "antialiased relative min-h-screen overflow-x-hidden bg-background text-foreground")}>
        {/* Pastel Ambient Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Soft Violet Blob */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl mix-blend-multiply" />
          {/* Soft Mint Blob */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success/5 rounded-full blur-3xl mix-blend-multiply" />
          {/* Soft Orange Blob */}
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-orange-200/20 rounded-full blur-3xl mix-blend-multiply" />
        </div>

        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
