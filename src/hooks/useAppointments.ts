import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

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

export interface Appointment {
  id: string;
  full_name: string;
  phone_number: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
  doctors?: {
    full_name: string;
    specialty: string;
  };
}

export function useAppointments() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [doctorsRes, servicesRes] = await Promise.all([
        supabase.from('doctors').select('id, full_name, specialty'),
        supabase.from('services').select('id, title, category, price')
      ]);

      if (doctorsRes.error) console.error('Doctors fetch error:', doctorsRes.error);
      if (servicesRes.error) console.error('Services fetch error:', servicesRes.error);

      setDoctors(doctorsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error('Unhandled error in fetchInitialData:', error);
      setDoctors([]);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInitialData();
  }, [fetchInitialData]);

  const fetchAvailableSlots = async (doctorId: string, date: string) => {
    try {
      const { data, error } = await supabase
        .from('available_slots')
        .select('*')
        .eq('doctor_id', doctorId)
        .eq('slot_date', date)
        .eq('is_booked', false)
        .order('slot_time');

      if (error) {
        console.error('Slots fetch error:', error);
        setAvailableSlots([]);
        return;
      }
      setAvailableSlots(data || []);
    } catch (error) {
      console.error(error);
      setAvailableSlots([]);
    }
  };

  const fetchPatientAppointments = async (): Promise<Appointment[]> => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctors ( full_name, specialty )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Appointments fetch error:', error);
        return [];
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any || [];
    } catch (error) {
      console.error('Unhandled error in fetchPatientAppointments:', error);
      return [];
    }
  };

  const bookAppointment = async ({
    patientName,
    patientPhone,
    doctorId,
    serviceId,
    serviceTitle,
    slotId,
    appointmentDate,
    appointmentTime
  }: {
    patientName: string;
    patientPhone: string;
    doctorId: string;
    serviceId: string;
    serviceTitle: string;
    slotId: string;
    appointmentDate: string;
    appointmentTime: string;
  }) => {
    if (!patientName || !patientPhone || !doctorId || !serviceId || !slotId) {
      toast.error('Өтініш, барлық өрістерді толтырыңыз');
      return false;
    }

    try {
      setBookingLoading(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: appointmentError } = await (supabase as any)
        .from('appointments')
        .insert([{
          full_name: patientName,
          phone_number: patientPhone,
          service_type: serviceTitle,
          doctor_id: doctorId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          status: 'pending'
        }]);

      if (appointmentError) throw appointmentError;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: slotError } = await (supabase as any)
        .from('available_slots')
        .update({ is_booked: true })
        .eq('id', slotId);

      if (slotError) throw slotError;

      return true;
    } catch (error) {
      console.error(error);
      toast.error('Жазылу кезінде қате кетті. Қайта көріңіз.');
      return false;
    } finally {
      setBookingLoading(false);
    }
  };

  return {
    doctors,
    services,
    availableSlots,
    loading,
    bookingLoading,
    fetchAvailableSlots,
    fetchPatientAppointments,
    bookAppointment
  };
}
