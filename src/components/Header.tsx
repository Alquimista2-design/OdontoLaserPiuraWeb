/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Calendar, Heart, Shield, Settings } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onOpenBooking: () => void;
  clinicPhone: string;
}

export default function Header({ isAdmin, setIsAdmin, onOpenBooking, clinicPhone }: HeaderProps) {
  const isWeekend = new Date().getDay() === 0; // 0 is Sunday

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      {/* Top emergency / notice banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-white uppercase sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          {isWeekend 
            ? "Agendando citas para esta semana — Evaluación Inicial Gratuita en Piura" 
            : "Consultas activas hoy — Separa tu cita de diagnóstico sin costo"
          }
        </span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and clinic name */}
        <a href="#" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-950 to-indigo-900 shadow-md">
            <Heart className="h-5 w-5 text-emerald-400" fill="currentColor" />
          </div>
          <div>
            <h1 className="font-display text-base font-bold tracking-tight text-blue-950 sm:text-lg">
              Dr. Nole Castillo
            </h1>
            <p className="font-mono text-[9px] font-semibold tracking-wider text-emerald-600 uppercase sm:text-[10px]">
              Implantes & Estética
            </p>
          </div>
        </a>

        {/* Action items & navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${clinicPhone}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:flex"
          >
            <Phone className="h-4 w-4 text-indigo-600" />
            <span className="font-mono text-xs">{clinicPhone}</span>
          </a>

          <button
            id="header-booking-btn"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-900 md:px-4 md:text-sm"
          >
            <Calendar className="h-4 w-4" />
            <span>Separar Cita</span>
          </button>

          {/* Hidden Admin dashboard button */}
          <button
            id="admin-panel-toggle"
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
              isAdmin 
                ? 'border-indigo-200 bg-indigo-50 text-indigo-600' 
                : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
            title="Panel de Leads para el Doctor (Webmaster)"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
