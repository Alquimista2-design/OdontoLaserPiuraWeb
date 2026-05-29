/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LeadQuiz from './components/LeadQuiz';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ContactFooter from './components/ContactFooter';
import AdminPanel from './components/AdminPanel';
import BookingModal from './components/BookingModal';
import { Lead, ClinicConfig } from './types';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, Settings, X, Phone, Heart, Users, Star, ArrowDown } from 'lucide-react';

const DEFAULT_CONFIG: ClinicConfig = {
  phone: '+51 978 234 567',
  whatsapp: '51978234567',
  whatsappMessageTemplate: 'Hola Dr. Nole Castillo 👋 Quisiera agendar mi cita de Evaluación Gratuita.',
  address: 'Av. Ramón Mujica 120, Urb. El Chipe (Frente a la UNP), Piura, Perú',
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.183748281313!2d-80.64121!3d-5.18379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a107ca46cd923%3A0xed0dbf1cb755c3c0!2sUNP!5e0!3m2!1ses!2spe!4v1716946800000!5m2!1ses!2spe',
  hoursWeekday: 'Lunes a Viernes: 9:00 AM - 1:00 PM y 4:00 PM - 8:00 PM',
  hoursSaturday: 'Sábados: 9:00 AM - 1:00 PM (Previa Cita)',
  doctorName: 'Dr. Nole Castillo'
};

const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Wilmar Elera García',
    phone: '967234561',
    email: 'wilmar.elera@gmail.com',
    treatment: 'Implantes Dentales (Recuperar dientes perdidos)',
    missingTeeth: 'Falta toda la dentadura',
    urgency: 'Urgente / Hay Dolor',
    notes: 'Necesito presupuesto integral para implantes, tengo dolor en la arcada superior.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'PENDIENTE'
  },
  {
    id: 'lead-2',
    name: 'Carmen Elera Ramos',
    phone: '956123478',
    email: 'carmen_elera@outlook.com',
    treatment: 'Estética Dental (Carillas, Blanqueamiento, Diseño)',
    missingTeeth: 'Dientes completos (Estética)',
    urgency: 'Este mes / Quiero agendar',
    notes: 'He visto fotos de su diseño de sonrisa y me encantaría una cita de evaluación.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'CONTACTADO'
  },
  {
    id: 'lead-3',
    name: 'Fernando Rosillo',
    phone: '998456123',
    email: 'fernando.rosillo@gmail.com',
    treatment: 'Implantes Dentales (Recuperar dientes perdidos)',
    missingTeeth: 'Falta un solo diente',
    urgency: 'Este mes / Quiero agendar',
    notes: 'Se me fracturó un diente delantero, deseo reponerlo con implante.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'AGENDADO'
  }
];

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string>('');
  
  // Persistence engines
  const [leads, setLeads] = useState<Lead[]>([]);
  const [config, setConfig] = useState<ClinicConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    // Load config from Storage
    const storedConfig = localStorage.getItem('dr_nole_clinic_config');
    if (storedConfig) {
      try {
        setConfig(JSON.parse(storedConfig));
      } catch (e) {
        console.error("Error reading config", e);
      }
    } else {
      localStorage.setItem('dr_nole_clinic_config', JSON.stringify(DEFAULT_CONFIG));
    }

    // Load leads from Storage or pre-load reviews
    const storedLeads = localStorage.getItem('dr_nole_leads_list');
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (e) {
        console.error("Error reading leads", e);
      }
    } else {
      setLeads(DEFAULT_LEADS);
      localStorage.setItem('dr_nole_leads_list', JSON.stringify(DEFAULT_LEADS));
    }
  }, []);

  // Update lead list
  const handleLeadCapture = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('dr_nole_leads_list', JSON.stringify(updated));
  };

  const handleUpdateLeadStatus = (id: string, newStatus: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem('dr_nole_leads_list', JSON.stringify(updated));
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem('dr_nole_leads_list', JSON.stringify(updated));
  };

  const handleClearLeads = () => {
    setLeads([]);
    localStorage.setItem('dr_nole_leads_list', JSON.stringify([]));
  };

  // Update configuration
  const handleSaveConfig = (newConfig: ClinicConfig) => {
    setConfig(newConfig);
    localStorage.setItem('dr_nole_clinic_config', JSON.stringify(newConfig));
  };

  const handleOpenBookingWithService = (service: string) => {
    setSelectedTreatment(service);
    setIsBookingOpen(true);
  };

  const handleScrollToQuiz = () => {
    const el = document.getElementById('smile-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build standard dynamic whatsapp string
  const customWhatsappLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMessageTemplate)}`;

  return (
    <div className="relative min-h-screen flex flex-col justify-between font-sans selection:bg-indigo-150 selection:text-indigo-900 bg-slate-50">
      
      {/* Sticky Top Header */}
      <Header
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenBooking={() => setIsBookingOpen(true)}
        clinicPhone={config.phone}
      />

      {/* Floating Call Assistance Dashboard banner to trigger transparency */}
      {isAdmin && (
        <div className="bg-indigo-50 border-b border-indigo-100 py-3.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs text-indigo-950 font-semibold px-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>🔧 Modo Administrador Activo. Puedes ver solicitudes de pacientes, cambiar estados o actualizar el número de WhatsApp.</span>
            </div>
            <button
              onClick={() => setIsAdmin(false)}
              className="rounded bg-indigo-200 px-2.5 py-1 hover:bg-indigo-300 transition text-[10px] uppercase font-bold text-indigo-900"
            >
              Cerrar Tab panel
            </button>
          </div>
        </div>
      )}

      {/* Primary Landing Content & Administrative Views Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isAdmin ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel
                leads={leads}
                onUpdateLeadStatus={handleUpdateLeadStatus}
                onDeleteLead={handleDeleteLead}
                config={config}
                onSaveConfig={handleSaveConfig}
                onClearLeads={handleClearLeads}
              />
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Sección 1: Héroe */}
              <Hero
                onStartQuiz={handleScrollToQuiz}
                whatsappLink={customWhatsappLink}
              />

              {/* Sección Interactiva: Evaluador de Sonrisas */}
              <div className="bg-slate-50 border-y border-slate-100/50 py-10 md:py-14">
                <div className="max-w-4xl mx-auto text-center px-4 space-y-2 mb-4">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                    Diagnóstico Inicial
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-blue-950 sm:text-3xl">
                    Prueba Nuestro Evaluador Virtual de Sonrisa
                  </h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Responde 3 preguntas simples para conocer opciones, pre-requisitos y costos estimados directamente en tu celular de WhatsApp.
                  </p>
                </div>
                <LeadQuiz
                  onLeadCapture={handleLeadCapture}
                  whatsappPhone={config.whatsapp}
                />
              </div>

              {/* Sección 2: Sobre Nosotros */}
              <About />

              {/* Sección 3: Reserva de Servicios */}
              <Services
                onSelectTreatment={handleOpenBookingWithService}
              />

              {/* Sección 4: Testimonios */}
              <Testimonials />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sección 5: Footer & Bento Contacts */}
      <ContactFooter
        config={config}
        whatsappLink={customWhatsappLink}
      />

      {/* Quick Booking Dialogue Overlay modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTreatment={selectedTreatment}
        onLeadCapture={handleLeadCapture}
        whatsappPhone={config.whatsapp}
      />

      {/* Floating High-Conversion Action Button on lower-right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        
        {/* Help tooltip chat */}
        <div className="hidden animate-bounce rounded-2xl bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-xl border border-slate-100 md:block max-w-[200px] text-right">
          <p className="text-indigo-600 text-[10px] uppercase tracking-wider mb-0.5">Atención hoy</p>
          <span>¿Dudas? Chatea con nosotros gratis</span>
        </div>

        <a
          id="floating-whatsapp-widget"
          href={customWhatsappLink}
          target="_blank"
          rel="noreferrer noopener"
          className="pulse-button-ring flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl transition-all hover:scale-110 hover:bg-emerald-600"
          title="Hola, ¿Deseas información?"
        >
          <MessageCircle className="h-7 w-7 fill-current" />
        </a>
      </div>

    </div>
  );
}
