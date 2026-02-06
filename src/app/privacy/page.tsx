import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad | Calculadora de Impuestos España",
    description: "Política de Privacidad y Cookies para Spain Tax Calculator. Cumplimiento con GDPR y AdSense.",
    robots: "noindex, follow" // Usually privacy pages don't need to be indexed heavily, but 'follow' is good.
};

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 text-slate-600">
            <h1 className="text-3xl font-bold text-slate-800">Política de Privacidad</h1>
            <p className="text-sm text-slate-400">Última actualización: {new Date().getFullYear()}</p>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">1. Introducción</h2>
                <p>
                    Bienvenido a <strong>Spain Tax Calculator</strong> ("nosotros", "nuestro").
                    Respetamos su privacidad y estamos comprometidos a proteger cualquier dato que pueda compartir con nosotros.
                    Esta política explica cómo manejamos la información cuando utiliza nuestra calculadora web.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">2. Recopilación de Datos</h2>
                <p>
                    <strong>No recopilamos datos personales identificables</strong> (como nombre, correo electrónico o dirección) de forma directa.
                    Todos los cálculos de impuestos se realizan <strong>localmente en su navegador</strong>. Ningún dato financiero introducido en la calculadora se envía a nuestros servidores.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">3. Cookies y Tecnologías de Rastreo</h2>
                <p>
                    Utilizamos cookies y tecnologías similares para mejorar su experiencia y mostrar publicidad relevante.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento del sitio.</li>
                    <li><strong>Google AdSense:</strong> Utilizamos Google AdSense para mostrar anuncios. Google utiliza cookies para publicar anuncios basados en sus visitas anteriores a este u otros sitios web.</li>
                </ul>
                <p className="mt-2">
                    Puede optar por no recibir publicidad personalizada visitando <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-primary underline">Configuración de Anuncios de Google</a>.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">4. Cumplimiento con el GDPR (RGPD)</h2>
                <p>
                    De acuerdo con el Reglamento General de Protección de Datos (RGPD):
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Tiene derecho a solicitar acceso, rectificación o eliminación de cualquier dato personal que pudiéramos tener (actualmente ninguno).</li>
                    <li>Tiene derecho a retirar su consentimiento para el uso de cookies en cualquier momento.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">5. Contacto</h2>
                <p>
                    Si tiene preguntas sobre esta política, puede contactarnos a través del repositorio del proyecto.
                </p>
            </section>
        </div>
    );
}
