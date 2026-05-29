/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: "review-1",
      author: "Wilmar Elera García",
      role: "Paciente Verificado",
      text: "Brindan un servicio personalizado de excelente calidad. Son los mejores especialistas en Implantes Dentales en Piura.",
      stars: 5,
      date: "Hace 2 meses",
      avatarInitials: "WE",
      source: "Paciente Verificado",
      avatarBg: "bg-teal-50 text-teal-700"
    },
    {
      id: "review-2",
      author: "R&S Empresas y Servicios",
      role: "Opinión de Google",
      text: "Buenos especialistas en implantes dentales, excelente atención, los recomiendo totalmente.",
      stars: 5,
      date: "Hace 1 mes",
      avatarInitials: "RS",
      source: "Google Review",
      avatarBg: "bg-blue-50 text-blue-700"
    },
    {
      id: "review-3",
      author: "Fernando Rosillo",
      role: "Paciente Verificado",
      text: "Excelente atención con el Dr. Nole Castillo. Totalmente profesionales y de confianza.",
      stars: 5,
      date: "Hace 3 semanas",
      avatarInitials: "FR",
      source: "Paciente Verificado",
      avatarBg: "bg-indigo-50 text-indigo-700"
    }
  ];

  return (
    <section id="testimonios" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header content with Star average dashboard */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-end">
          <div className="text-center md:text-left space-y-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
              Prueba Social Real
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
              Lo que dicen nuestros pacientes en Piura
            </h2>
          </div>

          {/* Social average aggregator info */}
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-150">
            <div className="font-display text-3xl font-black text-blue-950">5.0</div>
            <div>
              <div className="flex text-amber-500">
                <Star className="h-4 w-4 fill-currentColor" />
                <Star className="h-4 w-4 fill-currentColor" />
                <Star className="h-4 w-4 fill-currentColor" />
                <Star className="h-4 w-4 fill-currentColor" />
                <Star className="h-4 w-4 fill-currentColor" />
              </div>
              <p className="mt-0.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Calificación de Pacientes en Piura
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-150 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-105"
            >
              {/* Quote quotation mark absolute */}
              <Quote className="absolute right-6 top-6 h-8 w-8 text-slate-100" />

              <div className="space-y-4">
                {/* 5 Stars display */}
                <div className="flex text-amber-500">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-currentColor" />
                  ))}
                </div>

                {/* Testimonial Core Text */}
                <p className="font-sans text-sm leading-relaxed text-slate-600 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author and verification badges */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold ${rev.avatarBg}`}>
                  {rev.avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-display text-xs font-bold text-blue-950">
                    {rev.author}
                  </h4>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span className="font-mono text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                      {rev.role}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
