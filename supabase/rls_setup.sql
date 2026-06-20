-- ==========================================
-- 1. Жаңа кесте (Contacts) - Кері байланыс үшін
-- ==========================================
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 2. Row Level Security (RLS) Қауіпсіздік саясаттары
-- ==========================================

-- A) APPOINTMENTS (Жазылулар)
-- Анонимді қолданушылар тек жаңа жазба қоса алады (INSERT), бірақ оқи (SELECT) немесе өшіре (DELETE) алмайды.
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert to appointments" ON public.appointments;
CREATE POLICY "Allow public insert to appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- B) CONTACTS (Кері байланыс)
-- Анонимді қолданушылар тек өтініш қалдыра алады (INSERT).
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert to contacts" ON public.contacts;
CREATE POLICY "Allow public insert to contacts" 
  ON public.contacts 
  FOR INSERT 
  WITH CHECK (true);

-- C) DOCTORS & SERVICES (Дәрігерлер мен Қызметтер)
-- Бұл кестелер тек оқу үшін қолжетімді (SELECT).
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public select on doctors" ON public.doctors;
CREATE POLICY "Allow public select on doctors" 
  ON public.doctors 
  FOR SELECT 
  USING (true);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public select on services" ON public.services;
CREATE POLICY "Allow public select on services" 
  ON public.services 
  FOR SELECT 
  USING (true);

-- D) AVAILABLE SLOTS (Бос уақыттар)
-- Оқуға (SELECT) рұқсат және слотты брондау үшін жаңартуға (UPDATE) рұқсат.
ALTER TABLE public.available_slots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public select on available_slots" ON public.available_slots;
CREATE POLICY "Allow public select on available_slots" 
  ON public.available_slots 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow public update on available_slots" ON public.available_slots;
CREATE POLICY "Allow public update on available_slots" 
  ON public.available_slots 
  FOR UPDATE 
  USING (true);
