/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Sparkles, Smile, ArrowRight, CheckCircle } from 'lucide-react';

interface ServicesProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export default function Services({ onSelectTreatment }: ServicesProps) {
  const treatments = [
    {
      id: "implantes",
      title: "Implantes Dentales Avanzados",
      subtitle: "Servicio Estrella • Garantizado",
      description: "La solución permanente, segura y natural para recuperar los dientes perdidos. Volverás a comer y sonreír con total confianza.",
      cta: "Consultar por Implantes",
      icon: Smile,
      badge: "Más Solicitado",
      color: "border-indigo-100 bg-white shadow-indigo-950/5",
      points: [
        "Repone la raíz de forma segura",
        "Porcelana de alta biocompatibilidad",
        "Procedimiento guiado digitalmente",
        "Recuperación rápida sin dolor"
      ]
    },
    {
      id: "estetica",
      title: "Estética y Diseño de Sonrisa",
      subtitle: "Brillo & Simetría Natural",
      description: "Blanqueamientos de última generación, carillas estéticas y tratamientos personalizados para lograr la simetría y el brillo que siempre quisiste.",
      cta: "Diseñar mi Sonrisa",
      icon: Sparkles,
      badge: "Estética Premium",
      color: "border-slate-100 bg-white",
      points: [
        "Carillas de resina y cerámica",
        "Blanqueamiento LED de alta potencia",
        "Análisis digital de proporciones faciales",
        "Resultados visibles en pocas citas"
      ]
    },
    {
      id: "general",
      title: "Odontología Integral y Prevención",
      subtitle: "Protección Familiar Completa",
      description: "Cuidado completo para toda la familia: curaciones estéticas, limpiezas profundas con ultrasonido y diagnóstico moderno de alta precisión.",
      cta: "Reservar Cita General",
      icon: ShieldAlert,
      badge: "Salud Familiar",
      color: "border-slate-100 bg-white",
      points: [
        "Limpieza profunda con ultrasonido",
        "Curaciones estéticas libres de mercurio",
        "Fluorizaciones y sellantes protectores",
        "Radiografías de diagnóstico digital"
      ]
    }
  ];

  return (
    <section id="tratamientos" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Headers */}
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-12 md:mb-16">
          <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
            Nuestros Tratamientos
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
            Tratamientos Especializados para tu Salud y Estética Dental
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Utilizamos tecnología de vanguardia y materiales importados premium para garantizar que cada tratamiento dure toda la vida.
          </p>
        </div>

        {/* Treatment Service Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {treatments.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 md:p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${service.color}`}
              >
                {/* Visual Accent Corner for Hero Service */}
                {idx === 0 && (
                  <div className="absolute top-0 right-0 rounded-bl-2xl bg-indigo-900 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                    {service.badge}
                  </div>
                )}
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-900">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {idx !== 0 && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 uppercase">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-blue-950 md:text-xl">
                      {service.title}
                    </h3>
                    <p className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-500">
                    {service.description}
                  </p>

                  {/* Bullet feature checklist */}
                  <ul className="space-y-2 border-t border-slate-50 pt-4">
                    {service.points.map((pt, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Level Action CTA Button */}
                <div className="mt-8 pt-2">
                  <button
                    id={`services-cta-${service.id}`}
                    onClick={() => onSelectTreatment(service.title)}
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition ${
                      idx === 0 
                        ? 'bg-blue-950 text-white hover:bg-slate-900' 
                        : 'border border-slate-200 bg-white text-blue-950 hover:bg-slate-50'
                    }`}
                  >
                    <span>{service.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
