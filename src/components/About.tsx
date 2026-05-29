/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Shield, Heart, HelpCircle, ShieldCheck } from 'lucide-react';

export default function About() {
  const smileImgUrl = "/src/assets/images/radiant_smile_1780018939567.png";

  return (
    <section id="sobre-nosotros" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Block: Narrative & Credentials */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-3">
              <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
                Autoridad y Confianza Dental
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
                20 Años Diseñando Sonrisas en Piura: La Experiencia del Dr. Nole Castillo
              </h2>
            </div>

            {/* Quote block formatting */}
            <blockquote className="border-l-4 border-indigo-600 bg-white p-5 rounded-r-2xl shadow-sm text-slate-700">
              <span className="text-3xl font-serif text-indigo-400 leading-none">“</span>
              <p className="inline font-sans font-medium text-slate-800 italic">
                No somos una franquicia dental corporativa y fría. En nuestro consultorio, cada tratamiento es liderado por el Dr. Nole Castillo y un equipo comprometido con la excelencia médica. Durante dos décadas, nos hemos especializado en devolver la seguridad a cientos de piuranos mediante tecnología de vanguardia y un trato humano, cercano y personalizado.
              </p>
            </blockquote>

            {/* Features Pillar Grid */}
            <div className="grid gap-6 sm:grid-cols-3">
              
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="mt-3.5 font-display text-sm font-bold text-blue-950">
                  20+ Años de Trayectoria
                </h4>
                <p className="mt-1.5 text-xs text-slate-500">
                  Trayectoria impecable avalada por la satisfacción de pacientes de Piura.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="mt-3.5 font-display text-sm font-bold text-blue-950">
                  Especialistas Certificados
                </h4>
                <p className="mt-1.5 text-xs text-slate-500">
                  Líderes certificados en implantología dental avanzada y prótesis fija.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="mt-3.5 font-display text-sm font-bold text-blue-950">
                  Atención Sin Dolor
                </h4>
                <p className="mt-1.5 text-xs text-slate-500">
                  Atención 100% personalizada con técnicas modernas e indoloras.
                </p>
              </div>

            </div>
          </div>

          {/* Right Block: Image with badges */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-[400px]">
              <div className="overflow-hidden rounded-3xl border-4 border-white bg-slate-200 shadow-xl">
                <img
                  src={smileImgUrl}
                  alt="Rostro feliz con sonrisa perfecta tras tratamiento de implantes"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Verified Badge overlay */}
              <div className="absolute -top-4 -right-4 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Garantía Dental
                </p>
                <p className="font-display text-sm font-bold">Materiales Biocompatibles</p>
              </div>

              {/* Extra visual indicators */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-3.5 shadow-md border border-slate-100 flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-150 text-[10px] font-bold text-indigo-700 bg-indigo-100 border border-white">
                    JP
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-150 text-[10px] font-bold text-indigo-700 bg-emerald-100 border border-white">
                    MR
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-150 text-[10px] font-bold text-indigo-700 bg-amber-100 border border-white">
                    WE
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">
                  +300 Piuranos Atendidos
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
