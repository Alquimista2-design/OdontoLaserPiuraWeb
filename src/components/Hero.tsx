/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  whatsappLink: string;
}

export default function Hero({ onStartQuiz, whatsappLink }: HeroProps) {
  // Safe import for the generated image
  const heroImgUrl = "/src/assets/images/dr_nole_hero_1780018921203.png";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-transparent py-12 md:py-20 lg:py-24">
      {/* Decorative ambient background blur blobs */}
      <div className="absolute top-1/2 left-0 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="absolute top-10 right-10 -z-10 h-80 w-80 rounded-full bg-emerald-50/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Text Content Block */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            {/* Social Proof Badge above H1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/15"
            >
              <span className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-currentColor" />
              </span>
              <span>⭐ Calificados como los mejores especialistas en implantes para nuestros pacientes</span>
            </motion.div>

            {/* Principal Heading - H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl"
            >
              Recupera tu sonrisa con los mejores especialistas en <span className="bg-gradient-to-r from-indigo-900 to-indigo-700 bg-clip-text text-transparent">Implantes Dentales</span> de Piura.
            </motion.h1>

            {/* Subtitle - H2 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 lg:text-xl"
            >
              Más de 20 años de experiencia brindando un servicio dental personalizado, seguro y de excelente calidad. Volverás a sonreír y disfrutar de tu comida favorita sin incomodidades.
            </motion.p>

            {/* Value pillars indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-700 lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                Evaluación Sin Costo
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-600" />
                Tecnología Digital 3D
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-indigo-600" />
                Atención Lunes a Sábado
              </span>
            </motion.div>

            {/* High Conversion CTA Area */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start"
            >
              {/* Primary Call to Action Button */}
              <a
                id="hero-whatsapp-cta"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                className="pulse-button-ring inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600 hover:shadow-emerald-500/20 sm:w-auto"
              >
                <MessageCircle className="h-5.5 w-5.5 fill-current" />
                <span>Agendar Evaluación Gratuita vía WhatsApp</span>
              </a>

              {/* Secondary Self-Assessment Trigger */}
              <button
                id="hero-quiz-cta"
                onClick={onStartQuiz}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition hover:bg-slate-50 md:text-base sm:w-auto"
              >
                <span>Evaluador de Sonrisa</span>
                <ArrowRight className="h-4.5 w-4.5 text-slate-500" />
              </button>
            </motion.div>
          </div>

          {/* Interactive Hero Image Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[450px] overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-2xl shadow-indigo-950/10 hover:shadow-indigo-950/15 transition-all">
              <img
                src={heroImgUrl}
                alt="Dr. Nole Castillo - Consultorio Odontológico Piura"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              {/* Overlaid rating badge */}
              <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm border border-slate-100">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="h-4 w-4 fill-currentColor" />
                  <Star className="h-4 w-4 fill-currentColor" />
                  <Star className="h-4 w-4 fill-currentColor" />
                  <Star className="h-4 w-4 fill-currentColor" />
                  <Star className="h-4 w-4 fill-currentColor" />
                  <span className="font-mono text-xs font-bold text-slate-800 ml-1">5.0</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-800">
                  Opiniones Reales de Pacientes en Piura
                </p>
                <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase">
                    Implantes Dental Garantizado
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
