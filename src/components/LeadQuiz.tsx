/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ClipboardList, Send, Smile, Info, Sparkles, Shield, ChevronRight, MessageSquareCode } from 'lucide-react';
import { Lead } from '../types';

interface LeadQuizProps {
  onLeadCapture: (lead: Lead) => void;
  whatsappPhone: string;
}

export default function LeadQuiz({ onLeadCapture, whatsappPhone }: LeadQuizProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    missingTeeth: '',
    urgency: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
    setTimeout(() => {
      setStep((curr) => curr + 1);
    }, 300);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone' || name === 'name') {
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor, ingresa tu nombre completo.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMsg('Ingresa un número de celular de WhatsApp válido (9 dígitos).');
      return;
    }

    const newLead: Lead = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      treatment: formData.treatment || 'Implantes Dentales',
      missingTeeth: formData.missingTeeth || 'No especifica',
      urgency: formData.urgency || 'Consulta general',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      status: 'PENDIENTE',
    };

    // Trigger local state preservation
    onLeadCapture(newLead);
    setSubmitted(true);
  };

  const getWhatsAppRedirectionUrl = () => {
    const phone = whatsappPhone.replace(/\D/g, '');
    const textMsg = `Hola Dr. Nole Castillo 👋 Acabo de completar el diagnóstico de mi sonrisa en su web.\n\n*Mis Datos:*\n- Nombre: ${formData.name}\n- Celular: ${formData.phone}\n- Interés: ${formData.treatment}\n- Estado actual: ${formData.missingTeeth}\n- Mi Prisa: ${formData.urgency}\n${formData.notes ? `- Notas extra: ${formData.notes}\n` : ''}\nQuisiera agendar mi *Cita de Evaluación Gratuita* en su consultorio de Piura por favor.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(textMsg)}`;
  };

  const restartQuiz = () => {
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      treatment: '',
      missingTeeth: '',
      urgency: '',
      notes: '',
    });
    setSubmitted(false);
  };

  return (
    <div id="smile-calculator" className="mx-auto max-w-3xl px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-950/5 md:p-10">
        
        {/* Accent visual tag */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-900 via-indigo-800 to-emerald-500" />

        {!submitted ? (
          <div>
            {/* Header progress bar */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smile className="h-6 w-6 text-emerald-500" />
                <span className="font-display text-sm font-bold text-blue-950 uppercase tracking-wide">
                  Evaluador Virtual De Sonrisa
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <span className={`${step >= 1 ? 'text-indigo-600' : ''}`}>1</span>
                <span>/</span>
                <span className={`${step >= 2 ? 'text-indigo-600' : ''}`}>2</span>
                <span>/</span>
                <span className={`${step >= 3 ? 'text-indigo-600' : ''}`}>3</span>
                <span>/</span>
                <span className={`${step >= 4 ? 'text-indigo-600' : ''}`}>Un Paso Más</span>
              </div>
            </div>

            {/* Step progress loading meter */}
            <div className="mb-8 h-1.5 w-full rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-indigo-800 to-emerald-500 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-blue-900 md:text-2xl">
                      ¿Qué solución dental estás buscando el día de hoy?
                    </h3>
                    <p className="text-sm text-slate-500">
                      Selecciona la opción que más se adapte a tu situación actual para personalizar tu evaluación.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => handleSelect('treatment', 'Implantes Dentales (Recuperar dientes perdidos)')}
                      className={`group relative flex flex-col justify-between rounded-2xl border-2 p-5 text-left transition hover:border-indigo-600 hover:bg-slate-50 ${
                        formData.treatment.includes('Implantes') ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-100'
                      }`}
                    >
                      <span className="font-display text-md font-bold text-blue-950">Implantes Dentales</span>
                      <span className="mt-2 text-xs leading-normal text-slate-500">
                        La solución fija y natural para recuperar dientes perdidos definitivamente.
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-bold text-indigo-600 group-hover:text-indigo-800">
                        Elegir <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect('treatment', 'Estética Dental (Carillas, Blanqueamiento, Diseño)')}
                      className={`group relative flex flex-col justify-between rounded-2xl border-2 p-5 text-left transition hover:border-indigo-600 hover:bg-slate-50 ${
                        formData.treatment.includes('Estética') ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-100'
                      }`}
                    >
                      <span className="font-display text-md font-bold text-blue-950">Estética & Carillas</span>
                      <span className="mt-2 text-xs leading-normal text-slate-500">
                        Mejora la simetría, el brillo y color de tus dientes rápidamente.
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-bold text-indigo-600 group-hover:text-indigo-800">
                        Elegir <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect('treatment', 'Odontología Integral (Curaciones, Limpieza, Dolor)')}
                      className={`group relative flex flex-col justify-between rounded-2xl border-2 p-5 text-left transition hover:border-indigo-600 hover:bg-slate-50 ${
                        formData.treatment.includes('Odontología') ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-100'
                      }`}
                    >
                      <span className="font-display text-md font-bold text-blue-950">Odontología General</span>
                      <span className="mt-2 text-xs leading-normal text-slate-500">
                        Cuidado preventivo familiar, limpieza periodontal, dolor o curaciones comunes.
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-bold text-indigo-600 group-hover:text-indigo-800">
                        Elegir <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      ← Volver al paso anterior
                    </button>
                    <h3 className="font-display text-xl font-bold text-blue-900 md:text-2xl">
                      ¿Cuál es tu necesidad en número de piezas a tratar?
                    </h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { key: 'Falta un solo diente', label: 'He perdido 1 diente', desc: 'Necesito reponer una pieza con un implante seguro.' },
                      { key: 'Faltan 2 o más dientes', label: 'He perdido de 2 a 3 dientes', desc: 'Deseo recuperar varios dientes para masticar bien.' },
                      { key: 'Falta toda la dentadura', label: 'He perdido toda o casi toda la dentadura', desc: 'Quisiera estudiar prótesis fijas sobre implantes.' },
                      { key: 'Dientes completos (Estética)', label: 'Tengo mis dientes, busco estética o curaciones', desc: 'No me faltan dientes, busco mejorar su apariencia o salud.' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleSelect('missingTeeth', item.key)}
                        className={`flex flex-col rounded-xl border-2 p-4 text-left transition hover:border-indigo-600 hover:bg-slate-50 ${
                          formData.missingTeeth === item.key ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-100'
                        }`}
                      >
                        <span className="text-sm font-bold text-blue-950">{item.label}</span>
                        <span className="mt-1 text-xs text-slate-500">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      ← Volver al paso anterior
                    </button>
                    <h3 className="font-display text-xl font-bold text-blue-900 md:text-2xl">
                      ¿Con qué urgencia deseas iniciar tu tratamiento dental?
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {[
                      { key: 'Urgente / Hay Dolor', label: '⚠️ Urgente: Siento dolor o tengo dificultad para comer' },
                      { key: 'Este mes / Quiero agendar', label: '🗓️ En las próximas semanas: Quisiera agendar mi evaluación gratis pronto' },
                      { key: 'Solo información / Presupuesto', label: '💬 Informativo: Solo deseo consultar precios de implantes o curaciones primero' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleSelect('urgency', item.key)}
                        className={`rounded-xl border-2 p-4 text-left transition hover:border-indigo-600 hover:bg-slate-50 ${
                          formData.urgency === item.key ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-100'
                        }`}
                      >
                        <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => setStep(3)}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      ← Volver al paso anterior
                    </button>
                    <h3 className="font-display text-xl font-bold text-blue-900 md:text-2xl">
                      ¿Dónde te enviamos tu Pre-Diagnóstico Gratuito?
                    </h3>
                    <p className="text-xs text-slate-500">
                      🔒 Tus datos están protegidos bajo estricto secreto profesional. Solo te contactaremos para confirmar tu cita.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Nombre y Apellidos *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej. Juan Pérez Ramos"
                        value={formData.name}
                        onChange={handleTextChange}
                        className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 object-none outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Celular de WhatsApp (9 dígitos) *
                        </label>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-slate-400">
                            +51
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="912345678"
                            pattern="[9][0-9]{8}"
                            maxLength={9}
                            value={formData.phone}
                            onChange={handleTextChange}
                            className="block w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Correo Electrónico (Opcional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="tu@correo.com"
                          value={formData.email}
                          onChange={handleTextChange}
                          className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Comentarios o síntomas (Opcional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="Ej. Me duele la muela derecha o necesito presupuesto para carillas de resina"
                        value={formData.notes}
                        onChange={handleTextChange}
                        className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-bold text-rose-600">
                        ⚠️ {errorMsg}
                      </p>
                    )}

                    <button
                      id="submit-quiz-btn"
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-900 py-4 text-sm font-bold text-white shadow-md transition hover:bg-indigo-950"
                    >
                      <Send className="h-4.5 w-4.5" />
                      <span>Enviar Diagnóstico e Iniciar Evaluación</span>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <Check className="h-7 w-7 stroke-[3px]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-black text-blue-950">
                ¡Gracias {formData.name}! Tu evaluación ha sido procesada con éxito.
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Hemos registrado tus respuestas. Para agendar de inmediato tu **Cita de Evaluación 100% Gratuita** y confirmar tu presupuesto personalizado con el Dr. Nole, haz clic en el botón de WhatsApp a continuación:
              </p>
            </div>

            {/* Direct Redirect to WhatsApp for maximum conversions */}
            <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-200/40 text-left">
              <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Sparkles className="h-4 w-4" /> Resumen de Evaluación
              </h4>
              <ul className="mt-2.5 space-y-1 text-xs text-slate-600">
                <li>• **Tratamiento:** {formData.treatment}</li>
                <li>• **Nivel de Pérdida / Fallo:** {formData.missingTeeth}</li>
                <li>• **Urgencia médica:** {formData.urgency}</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row justify-center">
              <a
                href={getWhatsAppRedirectionUrl()}
                target="_blank"
                rel="noreferrer noopener"
                className="pulse-button-ring inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-600"
              >
                <MessageSquareCode className="h-5.5 w-5.5" />
                <span>Iniciar Chat y Agendar Evaluación</span>
              </a>

              <button
                onClick={restartQuiz}
                className="rounded-full border border-slate-200 px-6 py-4 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
              >
                Iniciar Nuevo Diagnóstico
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
