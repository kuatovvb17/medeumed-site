-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Дәрігерлер кестесі (Doctors)
-- ==========================================
CREATE TABLE public.doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    experience_years INTEGER NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 2. Қызметтер кестесі (Services)
-- ==========================================
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. Жазылулар кестесі (Appointments)
-- ==========================================
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 4. Бос уақыттар кестесі (Available Slots)
-- ==========================================
CREATE TABLE public.available_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    is_booked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(doctor_id, slot_date, slot_time)
);

-- ==========================================
-- ТЕСТТІК ДЕРЕКТЕРДІ ЕНГІЗУ (Seed Data)
-- ==========================================

-- Дәрігерлерді қосу
INSERT INTO public.doctors (id, full_name, specialty, experience_years, bio, avatar_url)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Ахметова Айнұр Серікқызы', 'Акушер-гинеколог, Репродуктолог', 20, 'Бейдеулікті емдеу және күрделі жүктілікті жүргізу бойынша жоғары санатты маман.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600'),
    ('22222222-2222-2222-2222-222222222222', 'Оспанова Динара Маратқызы', 'Гинеколог-эндокринолог', 15, 'Гормоналды бұзылыстарды, жатыр миомасын және эндометриозды консервативті емдеу сарапшысы.', 'https://images.unsplash.com/photo-1594824436998-ddedefa66268?w=600'),
    ('33333333-3333-3333-3333-333333333333', 'Сүлейменова Әлия Қанатқызы', 'УДЗ (УЗИ) дәрігері', 12, 'Пренатальды скрининг және ұрық дамуының патологияларын ерте анықтау маманы.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600');

-- Қызметтерді қосу
INSERT INTO public.services (id, title, category, price, duration_minutes)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Акушер-гинекологтың алғашқы қабылдауы', 'Акушерлік', 15000, 45),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Гинеколог-эндокринологтың қабылдауы', 'Гинекология', 18000, 45),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Жамбас қуысы ағзаларының УДЗ (УЗИ)', 'Диагностика', 10000, 30),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Жүктілікті жүргізу (I триместр)', 'Акушерлік', 150000, 60),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Жатыр мойны эрозиясын емдеу', 'Гинекология', 35000, 60),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Жалпы қан анализі (ЖҚА)', 'Анализдер', 3500, 15);

-- Бос уақыттарды қосу (Бүгін және ертең үшін)
-- Дәрігер 1 (Ахметова Айнұр)
INSERT INTO public.available_slots (doctor_id, slot_date, slot_time) VALUES 
    ('11111111-1111-1111-1111-111111111111', CURRENT_DATE, '09:00:00'),
    ('11111111-1111-1111-1111-111111111111', CURRENT_DATE, '10:30:00'),
    ('11111111-1111-1111-1111-111111111111', CURRENT_DATE + INTERVAL '1 day', '14:00:00');

-- Дәрігер 2 (Оспанова Динара)
INSERT INTO public.available_slots (doctor_id, slot_date, slot_time) VALUES 
    ('22222222-2222-2222-2222-222222222222', CURRENT_DATE, '11:00:00'),
    ('22222222-2222-2222-2222-222222222222', CURRENT_DATE + INTERVAL '1 day', '09:30:00');

-- Дәрігер 3 (Сүлейменова Әлия)
INSERT INTO public.available_slots (doctor_id, slot_date, slot_time) VALUES 
    ('33333333-3333-3333-3333-333333333333', CURRENT_DATE, '15:00:00'),
    ('33333333-3333-3333-3333-333333333333', CURRENT_DATE + INTERVAL '1 day', '16:30:00');

-- Қауіпсіздік саясаттарын (Row Level Security - RLS) қосу (қажет болса)
-- ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Барлығы дәрігерлерді көре алады" ON public.doctors FOR SELECT USING (true);
-- және т.б.
