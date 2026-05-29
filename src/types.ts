/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment: string;
  missingTeeth: string;
  urgency: string;
  notes: string;
  createdAt: string;
  status: 'PENDIENTE' | 'CONTACTADO' | 'AGENDADO' | 'DESCARTADO';
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  source: 'Google Review' | 'Paciente Verificado';
  date: string;
}

export interface ClinicConfig {
  phone: string;
  whatsapp: string;
  whatsappMessageTemplate: string;
  address: string;
  googleMapEmbedUrl: string;
  hoursWeekday: string;
  hoursSaturday: string;
  doctorName: string;
}
