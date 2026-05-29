/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Clock, Phone, Mail, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { ClinicConfig } from '../types';

interface ContactProps {
  config: ClinicConfig;
  whatsappLink: string;
}

export default function ContactFooter({ config, whatsappLink }: ContactProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="relative border-t border-slate-100 bg-slate-900 pt-16 pb-8 text-slate-300">
      {/* Visual top separator */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-800 to-emerald-500" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Final Conversion CTA Panel */}
        <div className="relative mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 to-blue-900 p-8 text-center text-white md:p-12 shadow-xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-85" />
          
          <div className="mx-auto max-w-2xl space-y-5">
            <span className="inline-block rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Cierre de Conversión
            </span>
            <h3 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              ¿Listo para dar el primer paso hacia tu nueva sonrisa?
            </h3>
            <p className="text-sm leading-relaxed text-indigo-150 text-slate-200">
              Habla directamente con nuestro equipo de atención hoy mismo. Te ayudaremos a agendar tu evaluación diagnóstica 100% gratuita y resolveremos tus dudas sobre implantes dentales sin ningún compromiso.
            </p>
            
            <div className="pt-4">
              <a
                id="footer-whatsapp-cta"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                className="pulse-button-ring inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-600 hover:scale-102"
              >
                <MessageCircle className="h-5.5 w-5.5 fill-current" />
                <span>Chatear con un Asesor por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Informational grid */}
        <div className="grid gap-10 md:grid-cols-12 lg:gap-14">
          
          {/* Column 1: Clinic short info */}
          <div className="space-y-4 md:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950">
                <Heart className="h-5 w-5 text-emerald-400" fill="currentColor" />
              </div>
              <h4 className="font-display text-base font-bold text-white tracking-tight">
                Dr. Nole Castillo
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Odontología especializada de alta calidad enfocada en implantología dental avanzada y rehabilitación oral integral en la ciudad de Piura.
            </p>
            <div className="flex gap-4 pt-1 text-slate-400">
              <span className="hover:text-white transition cursor-pointer text-xs font-semibold">📍 Piura, Perú</span>
              <span className="hover:text-white transition cursor-pointer text-xs font-semibold">⭐ 5.0 Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Exact Location details */}
          <div className="space-y-4 md:col-span-4">
            <h5 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
              Dónde Encontrarnos
            </h5>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5 text-slate-350">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-350">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <div>
                  <p className="font-semibold text-slate-100">{config.hoursWeekday}</p>
                  <p className="mt-0.5 text-slate-400">{config.hoursSaturday}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Maps Container */}
          <div className="space-y-3 md:col-span-4">
            <h5 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
              Mapa del Consultorio
            </h5>
            <div className="overflow-hidden rounded-2xl bg-slate-800 p-1 border border-slate-800 h-36">
              <iframe
                title="Mapa de ubicación Dr Nole Castillo Piura"
                src={config.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl grayscale contrast-110 opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            </div>
          </div>

        </div>

        {/* Lower row block */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-center md:flex-row text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Consultorio Dr. Nole Castillo. Todos los derechos reservados. Piura, Perú.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition">Políticas de Privacidad</a>
            <a href="#" className="hover:text-slate-300 transition">Términos de Servicio</a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5 font-bold hover:bg-slate-750 hover:text-white transition"
            >
              <span>Subir</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
