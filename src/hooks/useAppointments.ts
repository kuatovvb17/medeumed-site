import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import type { Doctor, Service, Slot, Appointment, BookAppointmentPayload } from '@/types/models';

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
        supabase.from('services').select('id, title, category, price'),
      ]);

      if (doctorsRes.error) console.error('Doctors fetch error:', doctorsRes.error);
      if (servicesRes.error) console.error('Services fetch error:', servicesRes.error);

      setDoctors((doctorsRes.data as Doctor[]) ?? []);
      setServices((servicesRes.data as Service[]) ?? []);
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
      setAvailableSlots((data as Slot[]) ?? []);
    } catch (error) {
      console.error(error);
      setAvailableSlots([]);
    }
  };

  const fetchPatientAppointments = useCallback(async (): Promise<Appointment[]> => {
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
      return (data as unknown as Appointment[]) ?? [];
    } catch (error) {
      console.error('Unhandled error in fetchPatientAppointments:', error);
      return [];
    }
  }, []);

  const bookAppointment = async (payload: BookAppointmentPayload) => {
    const { patientName, patientPhone, doctorId, serviceId, serviceTitle, slotId, appointmentDate, appointmentTime } = payload;

    if (!patientName || !patientPhone || !doctorId || !serviceId || !slotId) {
      toast.error('Өтініш, барлық өрістерді толтырыңыз');
      return false;
    }

    try {
      setBookingLoading(true);

      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          full_name: patientName,
          phone_number: patientPhone,
          service_type: serviceTitle,
          doctor_id: doctorId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          status: 'pending',
        }]);

      if (appointmentError) throw appointmentError;

      const { error: slotError } = await supabase
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
    bookAppointment,
  };
}
