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
      
      // Fetch services safely
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*');
        
      if (servicesError) {
        console.error("🔴 Supabase Services Error:", servicesError.message, servicesError.details, servicesError.hint);
        throw servicesError;
      }
      setServices((servicesData || []).map((s: any) => {
        const title = s.title || s.name || '';
        let fallbackPrice = 12000;
        if (title.toLowerCase().includes('консультация')) fallbackPrice = 15000;
        if (title.toLowerCase().includes('жүктілікті')) fallbackPrice = 150000;
        if (title.toLowerCase().includes('check-up')) fallbackPrice = 25000;
        if (title.toLowerCase().includes('узи') || title.toLowerCase().includes('удз')) fallbackPrice = 10000;

        return {
          id: String(s.id),
          title: title,
          category: s.category || '',
          price: s.price || fallbackPrice,
          duration_minutes: s.duration_minutes || 45
        };
      }));

      // Fetch doctors safely
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctors')
        .select('*');
        
      if (doctorsError) {
        console.error("🔴 Supabase Doctors Error:", doctorsError.message, doctorsError.details, doctorsError.hint);
        throw doctorsError;
      }
      setDoctors((doctorsData || []).map((d: any) => ({
        id: String(d.id),
        full_name: d.full_name || d.name || '',
        specialty: d.specialty || '',
        avatar_url: d.avatar_url || d.image_url || null,
        bio: d.bio || '',
        experience_years: d.experience_years || 10
      })));

    } catch (error: any) {
      console.error("🔴 Supabase Data Fetch Failed:", error);
      console.error("ℹ️ Check your Supabase RLS (Row Level Security) policies or Environment Variables.");
      
      // EMERGENCY FALLBACK: Populate hardcoded data if Supabase client fails to connect
      setServices([
        { id: '1', title: 'Алғашқы акушер-гинеколог консультациясы', category: 'Консультация', price: 15000, duration_minutes: 45 },
        { id: '2', title: 'Жүктілікті жүргізу (Пакеттер)', category: 'Бағдарлама', price: 150000, duration_minutes: 60 },
        { id: '3', title: 'Ұрпақты болу денсаулығын тексеру (Check-up)', category: 'Диагностика', price: 25000, duration_minutes: 45 },
        { id: '4', title: 'Кіші жамбас мүшелерінің УЗИ-і', category: 'УДЗ', price: 10000, duration_minutes: 30 }
      ]);
      setDoctors([
        { id: '1', full_name: 'Алия Султанова', specialty: 'Гинеколог-эндокринолог', avatar_url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop', experience_years: 15, bio: 'Жоғары санатты дәрігер' },
        { id: '2', full_name: 'Зарина Ахметова', specialty: 'Репродуктолог', avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop', experience_years: 12, bio: 'Тәжірибелі маман' },
        { id: '3', full_name: 'Мадина Ибраева', specialty: 'УЗИ маманы', avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop', experience_years: 8, bio: 'Сараптамалық УДЗ маманы' }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
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

      if (error) throw error;
      
      if (!data || data.length === 0) {
        // Fallback to mock slots if table is empty
        setAvailableSlots([
          { id: 'slot-1', doctor_id: doctorId, slot_date: date, slot_time: '09:00:00', is_booked: false },
          { id: 'slot-2', doctor_id: doctorId, slot_date: date, slot_time: '11:30:00', is_booked: false },
          { id: 'slot-3', doctor_id: doctorId, slot_date: date, slot_time: '14:00:00', is_booked: false },
          { id: 'slot-4', doctor_id: doctorId, slot_date: date, slot_time: '16:00:00', is_booked: false },
        ]);
      } else {
        setAvailableSlots(data);
      }
    } catch (error) {
      console.error("Slots fetch error:", error);
      // Emergency Mock Slots
      setAvailableSlots([
        { id: 'slot-1', doctor_id: doctorId, slot_date: date, slot_time: '09:00:00', is_booked: false },
        { id: 'slot-2', doctor_id: doctorId, slot_date: date, slot_time: '11:00:00', is_booked: false },
        { id: 'slot-3', doctor_id: doctorId, slot_date: date, slot_time: '15:00:00', is_booked: false },
      ]);
    }
  };

  const fetchPatientAppointments = useCallback(async (): Promise<Appointment[]> => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`*, doctors (*)`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Safely map data to standard interface
      return (data || []).map((item: any) => {
        const doctorInfo = item.doctors ? (Array.isArray(item.doctors) ? item.doctors[0] : item.doctors) : undefined;
        if (doctorInfo && !doctorInfo.full_name && doctorInfo.name) {
          doctorInfo.full_name = doctorInfo.name;
        }
        return {
          id: item.id,
          full_name: item.full_name,
          phone_number: item.phone_number,
          service_type: item.service_type,
          appointment_date: item.appointment_date,
          appointment_time: item.appointment_time,
          status: item.status,
          created_at: item.created_at,
          doctors: doctorInfo
        };
      });
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
          client_name: patientName,
          phone: patientPhone,
          service_id: parseInt(serviceId, 10) || 1, // Ensure it's an integer
          status: 'pending',
        }]);

      if (appointmentError) {
        console.error("🔴 Supabase Booking Insert Error:", appointmentError);
        throw appointmentError;
      }

      if (slotId.includes('-') && slotId.length > 10) {
        // Only attempt to update real UUID slots
        const { error: slotError } = await supabase
          .from('available_slots')
          .update({ is_booked: true })
          .eq('id', slotId);

        if (slotError) console.warn('Slot update warning:', slotError);
      }

      return true;
    } catch (error) {
      console.error("Booking error:", error);
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
