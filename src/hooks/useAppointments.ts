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
        supabase.from('doctors').select('id, full_name, specialty, avatar_url, bio, experience_years'),
        supabase.from('services').select('id, title, category, price, duration_minutes'),
      ]);

      if (doctorsRes.error) console.error('Doctors fetch error:', doctorsRes.error);
      if (servicesRes.error) console.error('Services fetch error:', servicesRes.error);

      setDoctors(
        (doctorsRes.data || []).map((d: any) => ({
          id: d.id,
          full_name: d.full_name,
          specialty: d.specialty,
          avatar_url: d.avatar_url,
          bio: d.bio,
          experience_years: d.experience_years,
        }))
      );
      
      setServices(
        (servicesRes.data || []).map((s: any) => ({
          id: s.id,
          title: s.title,
          category: s.category,
          price: s.price,
          duration_minutes: s.duration_minutes,
        }))
      );
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
      setAvailableSlots(
        (data || []).map((slot: any) => ({
          id: slot.id,
          doctor_id: slot.doctor_id,
          slot_date: slot.slot_date,
          slot_time: slot.slot_time,
          is_booked: slot.is_booked,
        }))
      );
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

      if (!data) return [];

      // Safely map the data to the Appointment type to avoid 'as unknown as Appointment[]' casting
      return data.map((item: any) => ({
        id: item.id,
        full_name: item.full_name,
        phone_number: item.phone_number,
        service_type: item.service_type,
        appointment_date: item.appointment_date,
        appointment_time: item.appointment_time,
        status: item.status,
        created_at: item.created_at,
        doctors: item.doctors ? (Array.isArray(item.doctors) ? item.doctors[0] : item.doctors) : undefined
      }));
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
