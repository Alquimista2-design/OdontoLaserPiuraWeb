/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lead, ClinicConfig } from '../types';
import { Trash2, Check, MessageSquare, ExternalLink, RefreshCw, Save, ShieldAlert, Users, Phone, MapPin, Sparkles } from 'lucide-react';

interface AdminProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead['status']) => void;
  onDeleteLead: (id: string) => void;
  config: ClinicConfig;
  onSaveConfig: (newConfig: ClinicConfig) => void;
  onClearLeads: () => void;
}

export default function AdminPanel({ leads, onUpdateLeadStatus, onDeleteLead, config, onSaveConfig, onClearLeads }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'leads' | 'settings'>('leads');
  const [editConfig, setEditConfig] = useState<ClinicConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditConfig((prev) => ({ ...prev, [name]: value }));
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(editConfig);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const getWhatsAppContactUrl = (lead: Lead) => {
    const cleanWhatsApp = lead.phone.replace(/\D/g, '');
    const msg = `Hola *${lead.name}*, soy el Dr. Nole Castillo 👋 Recibí tu evaluación de sonrisa con interés en *${lead.treatment}* para *${lead.missingTeeth}* con urgencia *${lead.urgency}*. Te escribo para agendar tu cita gratis esta semana. ¿Te viene bien por la mañana o por la tarde?`;
    return `https://wa.me/51${cleanWhatsApp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-xl">
        {/* Banner */}
        <div className="bg-slate-900 px-6 py-6 text-white sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-indigo-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Panel De Control Clínico
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                Webmaster & Gestión de Leads • Dr. Nole Castillo
              </h2>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl bg-slate-800 p-1">
              <button
                onClick={() => setActiveTab('leads')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                  activeTab === 'leads' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Leads Captados ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                  activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Ajustes de Contacto
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'leads' ? (
          <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" /> Pacientes Registrados en la Web
                </h3>
                <p className="text-xs text-slate-500">
                  Estos pacientes completaron el Evaluador Virtual de Sonrisa o agendaron cita.
                </p>
              </div>

              {leads.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('¿Deseas vaciar todos los leads guardados localmente?')) {
                      onClearLeads();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Restablecer Base de Datos</span>
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
                <Users className="mx-auto h-12 w-12 text-slate-350 mb-3" />
                <p className="text-sm font-semibold">No se han registrado leads de pacientes todavía.</p>
                <p className="mt-1 text-xs">Usa el Evaluador de Sonrisa en el sitio web como si fueras un paciente para ver cómo se cargan en tiempo real aquí.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 font-bold uppercase tracking-wide text-slate-500">
                      <th className="px-6 py-4">Paciente / Contacto</th>
                      <th className="px-6 py-4">Tratamiento Interés</th>
                      <th className="px-6 py-4">Pérdida Piezas</th>
                      <th className="px-6 py-4">Urgencia</th>
                      <th className="px-6 py-4">Comentarios</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-center">Contactar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50">
                        {/* Paciente */}
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <p className="font-display text-sm font-bold text-slate-900">{lead.name}</p>
                            <p className="font-mono text-slate-500">Whs: +51 {lead.phone}</p>
                            {lead.email && <p className="text-[10px] text-slate-400">{lead.email}</p>}
                            <p className="text-[9px] text-slate-400 font-normal">Recibido: {new Date(lead.createdAt).toLocaleString('es-PE')}</p>
                          </div>
                        </td>
                        {/* Servicio */}
                        <td className="px-6 py-4">
                          <span className="rounded-lg bg-indigo-50 px-2 py-1 font-semibold text-indigo-700">
                            {lead.treatment}
                          </span>
                        </td>
                        {/* Dientes */}
                        <td className="px-6 py-4">
                          <span className="text-slate-600">{lead.missingTeeth}</span>
                        </td>
                        {/* Urgencia */}
                        <td className="px-6 py-4">
                          <span className="font-semibold text-amber-700">{lead.urgency}</span>
                        </td>
                        {/* Notas */}
                        <td className="max-w-xs truncate px-6 py-4 text-slate-500" title={lead.notes}>
                          {lead.notes || <span className="text-slate-350">Ninguno</span>}
                        </td>
                        {/* Estado select */}
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                            className={`rounded-lg border px-2 py-1 font-bold ${
                              lead.status === 'PENDIENTE' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                              lead.status === 'CONTACTADO' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' :
                              lead.status === 'AGENDADO' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                              'border-slate-200 bg-slate-50 text-slate-400'
                            } outline-none`}
                          >
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="CONTACTADO">CONTACTADO</option>
                            <option value="AGENDADO">AGENDADO</option>
                            <option value="DESCARTADO">DESCARTADO</option>
                          </select>
                        </td>
                        {/* Acción */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <a
                              href={getWhatsAppContactUrl(lead)}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                              title="Iniciar Chat en WhatsApp con mensaje plantilla pre-llenado"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => {
                                if (confirm('¿Eliminar este registro de lead?')) {
                                  onDeleteLead(lead.id);
                                }
                              }}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                              title="Eliminar lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-indigo-600" /> Configuración de Canales y Contacto
            </h3>

            <form onSubmit={saveSettings} className="space-y-6 max-w-2xl">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Nombre del Doctor Especialista
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    required
                    value={editConfig.doctorName}
                    onChange={handleConfigChange}
                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    WhatsApp para Redirección (Prefijo 51 sin símbolos)
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    required
                    value={editConfig.whatsapp}
                    onChange={handleConfigChange}
                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    placeholder="51978234567"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block font-semibold">
                    Este es el número celular receptor de los agendamientos.
                  </span>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Teléfono Público del Header
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={editConfig.phone}
                    onChange={handleConfigChange}
                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    placeholder="+51 978 234 567"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Horario Semanal Principal
                  </label>
                  <input
                    type="text"
                    name="hoursWeekday"
                    required
                    value={editConfig.hoursWeekday}
                    onChange={handleConfigChange}
                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Dirección Exacta en Piura
                </label>
                <div className="relative mt-1">
                  <MapPin className="absolute top-3.5 left-4 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="address"
                    required
                    value={editConfig.address}
                    onChange={handleConfigChange}
                    className="block w-full rounded-xl border border-slate-200 py-3 pr-4 pl-11 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Enlace de Mapa Incrustado (Google Maps Embed Link)
                </label>
                <input
                  type="text"
                  name="googleMapEmbedUrl"
                  required
                  value={editConfig.googleMapEmbedUrl}
                  onChange={handleConfigChange}
                  className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-[11px] font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-slate-900 transition"
                >
                  <Save className="h-4 w-4" />
                  <span>Guardar Configuración Dental</span>
                </button>

                {saveSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 animate-pulse">
                    <Check className="h-4 w-4 stroke-[3px]" /> ¡Datos guardados y actualizados!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
