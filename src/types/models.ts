/** Shared TypeScript interfaces for the MedeuMed application */

export interface Doctor {
  id: string;
  full_name: string;
  specialty: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
}

export interface Slot {
  id: string;
  doctor_id: string;
  slot_date: string;
  slot_time: string;
  is_booked: boolean;
}

export interface AppointmentDoctor {
  full_name: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  full_name: string;
  phone_number: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'approved' | 'completed' | 'cancelled';
  created_at: string;
  doctors?: AppointmentDoctor;
}

export interface BookAppointmentPayload {
  patientName: string;
  patientPhone: string;
  doctorId: string;
  serviceId: string;
  serviceTitle: string;
  slotId: string;
  appointmentDate: string;
  appointmentTime: string;
}

export interface MedicalRecord {
  title: string;
  date: string;
  doctor: string;
  status: string;
}

export type CabinetTab = 'appointments' | 'medical-records' | 'profile';
