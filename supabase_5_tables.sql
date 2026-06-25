-- ==============================================================================
-- MEDEUMED CLINIC: 5 КЕСТЕЛІ ТОЛЫҚ БАЗА ДЕРЕКТЕРІ (SUPABASE SQL MIGRATION)
-- Осы кодты Supabase -> SQL Editor бөліміне көшіріп, "Run" басыңыз.
-- ==============================================================================

-- 1. ДӘРІГЕРЛЕР КЕСТЕСІ (DOCTORS)
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    image_url TEXT,
    bio TEXT,
    experience_years INT DEFAULT 10
);

-- 2. ҚЫЗМЕТТЕР КЕСТЕСІ (SERVICES)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    price INT NOT NULL,
    duration_minutes INT DEFAULT 45,
    description TEXT
);

-- 3. ҚОЛЖЕТІМДІ УАҚЫТТАР КЕСТЕСІ (AVAILABLE SLOTS)
CREATE TABLE IF NOT EXISTS available_slots (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT false
);

-- 4. ЖАЗЫЛУЛАР КЕСТЕСІ (APPOINTMENTS)
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_id INT REFERENCES services(id) ON DELETE SET NULL,
    doctor_id INT REFERENCES doctors(id) ON DELETE SET NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. ПІКІРЛЕР МЕН РЕЙТИНГ КЕСТЕСІ (REVIEWS - ЖАҢА 5-ШІ КЕСТЕ)
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    patient_name TEXT NOT NULL,
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    doctor_id INT REFERENCES doctors(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) ҚАУІПСІЗДІК САСАТТАРЫ
-- Барлық азаматтарға оқуға және жазылуға рұқсат беру
-- ==============================================================================

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read doctors" ON doctors FOR SELECT USING (true);
CREATE POLICY "Allow public all doctors" ON doctors FOR ALL USING (true);

CREATE POLICY "Allow public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public all services" ON services FOR ALL USING (true);

CREATE POLICY "Allow public read slots" ON available_slots FOR SELECT USING (true);
CREATE POLICY "Allow public all slots" ON available_slots FOR ALL USING (true);

CREATE POLICY "Allow public read appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Allow public all appointments" ON appointments FOR ALL USING (true);

CREATE POLICY "Allow public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public all reviews" ON reviews FOR ALL USING (true);

-- ==============================================================================
-- БАСТАПҚЫ ДЕРЕКТЕРДІ ЕНГІЗУ (SEED DATA)
-- ==============================================================================

INSERT INTO reviews (patient_name, rating, comment, doctor_id) VALUES
('Айжан М.', 5, 'Алина Серікқызына үлкен рақмет! Өте білікті терапевт, емі лезде көмектесті.', 1),
('Марат Қ.', 5, 'Данияр Маратұлы керемет невролог екен. Басымның ауырғаны қойды.', 2),
('Сәуле Б.', 5, 'Клиника өте таза, жарық және қызмет көрсету сапасы жоғары деңгейде.', 3),
('Ерлан Т.', 5, 'УДЗ аппараты жаңа әрі дәл көрсетеді. Айдос Кенесұлына алғыс.', 8),
('Динара К.', 5, 'Онлайн жазылу жүйесі өте ыңғайлы, кезексіз кірдім!', 1)
ON CONFLICT DO NOTHING;
