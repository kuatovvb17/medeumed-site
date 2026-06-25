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
        
      if (servicesError || !servicesData || servicesData.length === 0) {
        throw new Error("Supabase services error or empty");
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
          category: s.category || 'Терапия',
          price: s.price || fallbackPrice,
          duration_minutes: s.duration_minutes || 45
        };
      }));

      // Fetch doctors safely
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctors')
        .select('*');
        
      if (doctorsError || !doctorsData || doctorsData.length === 0) {
        throw new Error("Supabase doctors error or empty");
      }
      setDoctors((doctorsData || []).map((d: any) => ({
        id: String(d.id),
        full_name: d.full_name || d.name || '',
        specialty: d.specialty || '',
        avatar_url: d.avatar_url || d.image_url || 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600',
        bio: d.bio || '',
        experience_years: d.experience_years || 10
      })));

    } catch (error: any) {
      console.error("🔴 Using Extended Fallback Medical Data:", error);
      
      // FALLBACK 12 SERVICES
      setServices([
        { id: '1', title: 'Жалпы терапевт консультациясы', category: 'Терапия', price: 10000, duration_minutes: 30 },
        { id: '2', title: 'Неврологтың алғашқы консультациясы', category: 'Неврология', price: 15000, duration_minutes: 45 },
        { id: '3', title: 'Кардиолог дәрігерінің қабылдауы', category: 'Кардиология', price: 16000, duration_minutes: 40 },
        { id: '4', title: 'ЛОР дәрігерінің консультациясы', category: 'Отоларингология', price: 13000, duration_minutes: 30 },
        { id: '5', title: 'Уролог дәрігерінің алғашқы қабылдауы', category: 'Урология', price: 15000, duration_minutes: 40 },
        { id: '6', title: 'Акушер-гинеколог консультациясы', category: 'Гинекология', price: 14000, duration_minutes: 45 },
        { id: '7', title: 'Эндокринолог консультациясы', category: 'Эндокринология', price: 15000, duration_minutes: 40 },
        { id: '8', title: 'Педиатр дәрігерінің қабылдауы', category: 'Педиатрия', price: 12000, duration_minutes: 40 },
        { id: '9', title: 'Кешенді УДЗ (іш қуысы және бүйрек)', category: 'УДЗ Диагностика', price: 18000, duration_minutes: 30 },
        { id: '10', title: 'Жалпы қан анализі (ЖҚА - кеңейтілген)', category: 'Зертхана', price: 4500, duration_minutes: 10 },
        { id: '11', title: 'Жүрек ЭКГ тексеруі (декодермен)', category: 'Кардиология', price: 6000, duration_minutes: 15 },
        { id: '12', title: 'Кешенді Check-up (Денсаулық паспорты)', category: 'Терапия', price: 45000, duration_minutes: 90 }
      ]);

      // FALLBACK 10 DOCTORS
      setDoctors([
        { id: '1', full_name: 'Ахметова Алина Серікқызы', specialty: 'Жалпы тәжірибелі дәрігер (ЖТД)', avatar_url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600', experience_years: 12, bio: 'Отбасылық медицина сарапшысы' },
        { id: '2', full_name: 'Оспанов Данияр Маратұлы', specialty: 'Невролог', avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600', experience_years: 16, bio: 'Жүйке жүйесі патологиялары маманы' },
        { id: '3', full_name: 'Сүлейменова Әлия Қайратқызы', specialty: 'Кардиолог', avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600', experience_years: 14, bio: 'Жүрек-қан тамырлары жүйесі дәрігері' },
        { id: '4', full_name: 'Кәрімов Санжар Болатұлы', specialty: 'Отоларинголог (ЛОР)', avatar_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600', experience_years: 11, bio: 'ЛОР ауруларын заманауи емдеу' },
        { id: '5', full_name: 'Нұрғалиева Гүлнар Бекзатқызы', specialty: 'Педиатр', avatar_url: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600', experience_years: 18, bio: 'Балалар денсаулығын жоғары деңгейде бақылау' },
        { id: '6', full_name: 'Тілеуов Ержан Асқарұлы', specialty: 'Уролог', avatar_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=600', experience_years: 13, bio: 'Ерлер денсаулығы сарапшысы' },
        { id: '7', full_name: 'Мамедова Лейла Тұрсынқызы', specialty: 'Эндокринолог', avatar_url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600', experience_years: 15, bio: 'Гормоналды теңгерім және қант диабеті маманы' },
        { id: '8', full_name: 'Жұмабаев Айдос Кенесұлы', specialty: 'УДЗ Диагностика сарапшысы', avatar_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600', experience_years: 20, bio: '3D/4D кешенді ультрадыбыстық зерттеу' },
        { id: '9', full_name: 'Исаев Мақсат Бақытұлы', specialty: 'Акушер-гинеколог', avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600', experience_years: 14, bio: 'Әйелдер денсаулығы және жоспарлау' },
        { id: '10', full_name: 'Қуатова Зарина Ерланқызы', specialty: 'Зертхана меңгерушісі', avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600', experience_years: 17, bio: 'Кешенді клиникалық талдаулар сарапшысы' }
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
      const savedPhone = typeof window !== 'undefined' ? localStorage.getItem('medeu_patient_phone') : null;
      if (!savedPhone) return []; // No phone logged in

      const digits = savedPhone.replace(/\D/g, ''); // normalize
      
      let phoneVariations = [savedPhone];
      
      if (digits.length >= 10) {
        const offset = digits.length >= 11 ? digits.length - 10 : 0;
        const mainDigits = digits.substring(offset, offset + 10); // always exactly 10 digits e.g. 7001234567
        
        let formatted = '+7';
        if (mainDigits.length >= 3) formatted += ` (${mainDigits.substring(0, 3)})`;
        if (mainDigits.length >= 6) formatted += ` ${mainDigits.substring(3, 6)}`;
        if (mainDigits.length >= 8) formatted += `-${mainDigits.substring(6, 8)}`;
        if (mainDigits.length >= 10) formatted += `-${mainDigits.substring(8, 10)}`;
        
        phoneVariations = [
          formatted,
          `8${mainDigits}`,
          `7${mainDigits}`,
          `+7${mainDigits}`,
          savedPhone
        ];
      }

      const { data: allData, error } = await supabase
        .from('appointments')
        .select(`*, doctors (*), services (*)`)
        .in('phone', phoneVariations)
        .order('id', { ascending: false });
        
      if (error) throw error;
      
      const uniqueDataMap = new Map();
      for (const item of (allData || [])) {
        if (!uniqueDataMap.has(item.id)) {
          uniqueDataMap.set(item.id, item);
        }
      }
      
      const data = Array.from(uniqueDataMap.values()).sort((a, b) => {
        return b.id - a.id;
      });
      
      // Safely map data to standard interface
      return (data || []).map((item: any) => {
        const doctorInfo = item.doctors ? (Array.isArray(item.doctors) ? item.doctors[0] : item.doctors) : undefined;
        const serviceInfo = item.services ? (Array.isArray(item.services) ? item.services[0] : item.services) : undefined;
        if (doctorInfo && !doctorInfo.full_name && doctorInfo.name) {
          doctorInfo.full_name = doctorInfo.name;
        }
        return {
          id: item.id,
          full_name: item.client_name || item.full_name, // fallback for schema diffs
          phone_number: item.phone,
          service_type: serviceInfo?.title || item.service_type || item.service_id?.toString() || '',
          appointment_date: item.appointment_date,
          appointment_time: item.appointment_time,
          status: item.status,
          created_at: item.appointment_date, // Fallback since there is no created_at
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
          doctor_id: parseInt(doctorId, 10), // Adding doctor back
          appointment_date: appointmentDate, // Adding date back
          appointment_time: appointmentTime, // Adding time back
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

      // Automatically "login" the user in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('medeu_patient_phone', patientPhone);
        
        // Let's also save the name if profile is empty
        const savedProfile = localStorage.getItem('medeu_patient_profile');
        if (!savedProfile) {
          localStorage.setItem('medeu_patient_profile', JSON.stringify({
            fullName: patientName,
            phone: patientPhone,
            iin: '',
            birthDate: ''
          }));
        }
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
