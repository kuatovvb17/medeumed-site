import { useState, useEffect } from 'react';
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

export function useAppointments() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [doctorsRes, servicesRes] = await Promise.all([
        supabase.from('doctors').select('id, full_name, specialty'),
        supabase.from('services').select('id, title, category, price')
      ]);

      if (doctorsRes.error) throw doctorsRes.error;
      if (servicesRes.error) throw servicesRes.error;

      setDoctors(doctorsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Деректерді жүктеу кезінде қате кетті');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (doctorId: string, date: string) => {
    try {
      const { data, error } = await supabase
        .from('available_slots')
        .select('*')
        .eq('doctor_id', doctorId)
        .eq('slot_date', date)
        .eq('is_booked', false)
        .order('slot_time');

      if (error) throw error;
      setAvailableSlots(data || []);
    } catch (error) {
      console.error(error);
      toast.error('Бос уақыттарды жүктеу кезінде қате кетті');
    }
  };

  const bookAppointment = async ({
    patientName,
    patientPhone,
    doctorId,
    serviceId,
    slotId,
    appointmentDate,
    appointmentTime
  }: {
    patientName: string;
    patientPhone: string;
    doctorId: string;
    serviceId: string;
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

      // 1. Создаем запись в appointments
      const { error: appointmentError } = await (supabase as any)
        .from('appointments')
        .insert([{
          patient_name: patientName,
          patient_phone: patientPhone,
          doctor_id: doctorId,
          service_id: serviceId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          status: 'pending'
        }]);

      if (appointmentError) throw appointmentError;

      // 2. Обновляем слот на is_booked = true
      const { error: slotError } = await (supabase as any)
        .from('available_slots')
        .update({ is_booked: true })
        .eq('id', slotId);

      if (slotError) throw slotError;

      toast.success('Сәтті жазылды!');
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
    bookAppointment
  };
}
