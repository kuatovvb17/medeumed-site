-- ==============================================================================
-- SUPABASE ТЕРЕҢ ЖАҢАРТУ: БАРЛЫҚ 5 КЕСТЕ ЖӘНЕ ДЕРЕКТЕРДІ ЕНГІЗУ
-- Осы файлдың ішіндегі КОДТЫ ТОЛЫҚТАЙ көшіріп (Ctrl+A -> Ctrl+C), 
-- Supabase -> SQL Editor бөліміне қойып (Ctrl+V), "Run" басыңыз!
-- ==============================================================================

-- 1. Ескі кестелерді тазалау (Егер байланыс қатесі болса, қайта құру үшін)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS available_slots CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;

-- 2. ДӘРІГЕРЛЕР КЕСТЕСІ (DOCTORS)
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    image_url TEXT,
    bio TEXT,
    experience_years INT DEFAULT 10
);

-- 3. ҚЫЗМЕТТЕР КЕСТЕСІ (SERVICES)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    price INT NOT NULL,
    duration_minutes INT DEFAULT 45,
    description TEXT
);

-- 4. ҚОЛЖЕТІМДІ УАҚЫТТАР КЕСТЕСІ (AVAILABLE SLOTS)
CREATE TABLE available_slots (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT false
);

-- 5. ЖАЗЫЛУЛАР КЕСТЕСІ (APPOINTMENTS)
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_id INT REFERENCES services(id) ON DELETE SET NULL,
    doctor_id INT REFERENCES doctors(id) ON DELETE SET NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ПІКІРЛЕР МЕН РЕЙТИНГ КЕСТЕСІ (REVIEWS - 5-ШІ КЕСТЕ)
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    patient_name TEXT NOT NULL,
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    doctor_id INT REFERENCES doctors(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 7. ДӘРІГЕРЛЕРДІ ЕНГІЗУ (10 МАМАН)
-- ==============================================================================
INSERT INTO doctors (id, name, specialty, image_url, experience_years, bio) VALUES
(1, 'Ахметова Алина Серікқызы', 'Жалпы тәжірибелі дәрігер (ЖТД)', 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600', 12, 'Отбасылық медицина сарапшысы'),
(2, 'Оспанов Данияр Маратұлы', 'Невролог', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600', 16, 'Жүйке жүйесі патологиялары маманы'),
(3, 'Сүлейменова Әлия Қайратқызы', 'Кардиолог', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600', 14, 'Жүрек-қан тамырлары жүйесі дәрігері'),
(4, 'Кәрімов Санжар Болатұлы', 'Отоларинголог (ЛОР)', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600', 11, 'ЛОР ауруларын заманауи емдеу'),
(5, 'Нұрғалиева Гүлнар Бекзатқызы', 'Педиатр', 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600', 18, 'Балалар денсаулығын жоғары деңгейде бақылау'),
(6, 'Тілеуов Ержан Асқарұлы', 'Уролог', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=600', 13, 'Ерлер денсаулығы сарапшысы'),
(7, 'Мамедова Лейла Тұрсынқызы', 'Эндокринолог', 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600', 15, 'Гормоналды теңгерім және қант диабеті маманы'),
(8, 'Жұмабаев Айдос Кенесұлы', 'УДЗ Диагностика сарапшысы', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600', 20, '3D/4D кешенді ультрадыбыстық зерттеу'),
(9, 'Исаев Мақсат Бақытұлы', 'Акушер-гинеколог', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600', 14, 'Әйелдер денсаулығы және жоспарлау'),
(10, 'Қуатова Зарина Ерланқызы', 'Зертхана меңгерушісі', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600', 17, 'Кешенді клиникалық талдаулар сарапшысы');

-- ==============================================================================
-- 8. ҚЫЗМЕТТЕРДІ ЕНГІЗУ (12 ҚЫЗМЕТ)
-- ==============================================================================
INSERT INTO services (id, title, category, price, duration_minutes, description) VALUES
(1, 'Жалпы терапевт консультациясы', 'Терапия', 10000, 30, 'Бастапқы медициналық тексеру және амбулаторлық емдеу жоспарын құру'),
(2, 'Неврологтың алғашқы консультациясы', 'Неврология', 15000, 45, 'Бас ауруы, мигрень, омыртқа және жүйке патологияларын диагностикалау'),
(3, 'Кардиолог дәрігерінің қабылдауы', 'Кардиология', 16000, 40, 'Жүрек соғысын бақылау, қан қысымын реттеу'),
(4, 'ЛОР дәрігерінің консультациясы', 'Отоларингология', 13000, 30, 'Құлақ, тамақ, мұрын жолдарын эндоскопиялық тексеру'),
(5, 'Уролог дәрігерінің алғашқы қабылдауы', 'Урология', 15000, 40, 'Зәр шығару жүйесі мен бүйрек жұмысын тексеру'),
(6, 'Акушер-гинеколог консультациясы', 'Гинекология', 14000, 45, 'Әйелдер саулығын тексеру және жүктілікті жоспарлау'),
(7, 'Эндокринолог консультациясы', 'Эндокринология', 15000, 40, 'Қалқанша безі мен гормондар теңгерімін сараптау'),
(8, 'Педиатр дәрігерінің қабылдауы', 'Педиатрия', 12000, 40, 'Балалардың даму скринингі мен ауруын емдеу'),
(9, 'Кешенді УДЗ (іш қуысы және бүйрек)', 'УДЗ Диагностика', 18000, 30, 'Жоғары санатты УДЗ аппаратымен дәл диагностика'),
(10, 'Жалпы қан анализі (ЖҚА - кеңейтілген)', 'Зертхана', 4500, 10, '20-дан аса көрсеткіш бойынша толық қан құрамы тексерісі'),
(11, 'Жүрек ЭКГ тексеруі (декодермен)', 'Кардиология', 6000, 15, 'Электрокардиограмма түсіру және дәрігер қорытындысы'),
(12, 'Кешенді Check-up (Денсаулық паспорты)', 'Терапия', 45000, 90, 'Организмнің толықтай профилактикалық тексерісі');

-- ==============================================================================
-- 9. ПІКІРЛЕРДІ ЕНГІЗУ (REVIEWS SEED)
-- ==============================================================================
INSERT INTO reviews (patient_name, rating, comment, doctor_id) VALUES
('Айжан М.', 5, 'Алина Серікқызына үлкен рақмет! Өте білікті терапевт, емі лезде көмектесті.', 1),
('Марат Қ.', 5, 'Данияр Маратұлы керемет невролог екен. Басымның ауырғаны қойды.', 2),
('Сәуле Б.', 5, 'Клиника өте таза, жарық және қызмет көрсету сапасы жоғары деңгейде.', 3),
('Ерлан Т.', 5, 'УДЗ аппараты жаңа әрі дәл көрсетеді. Айдос Кенесұлына алғыс.', 8),
('Динара К.', 5, 'Онлайн жазылу жүйесі өте ыңғайлы, кезексіз кірдім!', 1);

-- ==============================================================================
-- 10. ҚАУІПСІЗДІК САЯСАТТАРЫ (RLS POLICIES)
-- Барлық азаматтарға сайттан оқуға және онлайн жазылуға рұқсат беру
-- ==============================================================================
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read doctors" ON doctors FOR SELECT USING (true);
CREATE POLICY "Public all doctors" ON doctors FOR ALL USING (true);

CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public all services" ON services FOR ALL USING (true);

CREATE POLICY "Public read slots" ON available_slots FOR SELECT USING (true);
CREATE POLICY "Public all slots" ON available_slots FOR ALL USING (true);

CREATE POLICY "Public read appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Public all appointments" ON appointments FOR ALL USING (true);

CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public all reviews" ON reviews FOR ALL USING (true);
