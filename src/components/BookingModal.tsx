/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Phone, CheckCircle, MessageSquareShare, FileText } from 'lucide-react';
import { Lead } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTreatment: string;
  onLeadCapture: (lead: Lead) => void;
  whatsappPhone: string;
}

export default function BookingModal({ isOpen, onClose, selectedTreatment, onLeadCapture, whatsappPhone }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: 'Implantes Dentales Avanzados',
    preferredDate: '',
    preferredTime: 'Cualquier horario',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: selectedTreatment }));
    }
  }, [selectedTreatment, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMessage('Por favor ingresa tu número de celular de WhatsApp (9 dígitos).');
      return;
    }

    const newLead: Lead = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      treatment: formData.treatment,
      missingTeeth: `Fecha preferida: ${formData.preferredDate || 'No especificada'} (${formData.preferredTime})`,
      urgency: 'Agendamiento Directo de Cita',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      status: 'PENDIENTE',
    };

    onLeadCapture(newLead);
    setSubmitted(true);
  };

  const getWhatsAppBookingUrl = () => {
    const phone = whatsappPhone.replace(/\D/g, '');
    const dateStr = formData.preferredDate ? `para el día *${formData.preferredDate}*` : '';
    const textMsg = `Hola Dr. Nole Castillo 👋 Deseo separar una cita de evaluación.\n\n*Mis Datos:*\n- Nombre: ${formData.name}\n- Celular: ${formData.phone}\n- Tratamiento: ${formData.treatment}\n- Programación: ${dateStr} en el horario *${formData.preferredTime}*\n${formData.notes ? `- Notas adicionales: ${formData.notes}\n` : ''}\nPor favor confirmen la disponibilidad de mi cita gratuita en su consultorio de Piura.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(textMsg)}`;
  };

  const closeAndReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      treatment: 'Implantes Dentales Avanzados',
      preferredDate: '',
      preferredTime: 'Cualquier horario',
      notes: '',
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAndReset}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl"
      >
        {/* Upper visual strip */}
        <div className="h-2 bg-gradient-to-r from-blue-900 to-emerald-500" />

        {/* Close Button */}
        <button
          onClick={closeAndReset}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {!submitted ? (
          <div className="p-6 md:p-8">
            <div className="space-y-1 mb-6">
              <h3 className="font-display text-lg font-bold text-blue-950 md:text-xl">
                Separar Evaluación Gratuita
              </h3>
              <p className="text-xs text-slate-500">
                Completa tus datos de reserva y nuestro equipo de atención te confirmará de inmediato.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Nombre Completo *
                </label>
                <div className="relative mt-1">
                  <User className="absolute top-3.5 left-4 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ej. Carmen Elera"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Número de WhatsApp *
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-slate-400">
                      +51
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="978234567"
                      maxLength={9}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Tratamiento de Interés
                  </label>
                  <select
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="Implantes Dentales Avanzados">Implantes Dentales Avanzados</option>
                    <option value="Estética y Diseño de Sonrisa">Estética y Diseño de Sonrisa</option>
                    <option value="Odontología Integral y Prevención">Odontología Integral</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Fecha Preferida (Opcional)
                  </label>
                  <div className="relative mt-1">
                    <Calendar className="absolute top-3.5 left-4 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Horario de Preferencia
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="Cualquier horario">Cualquier horario</option>
                    <option value="Turno Mañana (9:00 AM - 1:00 PM)">Turno Mañana (9 AM - 1 PM)</option>
                    <option value="Turno Tarde (4:00 PM - 8:00 PM)">Turno Tarde (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Indicaciones sobre tu estado dental (Opcional)
                </label>
                <div className="relative mt-1">
                  <FileText className="absolute top-3.5 left-4 h-4 w-4 text-slate-400" />
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Ej. Me falta una muela abajo izquierda o sensibilidad al masticar..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs font-bold text-rose-600">
                  ⚠️ {errorMessage}
                </p>
              )}

              <button
                id="booking-form-submit"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-950 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-slate-900 transition"
              >
                <span>Confirmar Reserva de Diagnóstico</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display text-xl font-bold text-blue-950">
                ¡Tu cita ha sido solicitada correctamente!
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 px-2">
                Hemos registrado esta reserva en nuestro sistema. Para coordinar los horarios finales con la secretaria del Dr. Nole y bloquear tu hora exacta de atención sin costo, abre el chat de WhatsApp a continuación:
              </p>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noreferrer noopener"
                className="pulse-button-ring inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg tracking-wide hover:bg-emerald-600 focus:outline-none"
              >
                <MessageSquareShare className="h-5 w-5" />
                <span>Confirmar Horario por WhatsApp</span>
              </a>
            </div>

            <button
              onClick={closeAndReset}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition block mx-auto underline mt-2"
            >
              Cerrar esta ventana
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
