const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let supabaseUrl = '';
let supabaseKey = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedMaster() {
  console.log("1. Wiping old doctors & services...");
  await supabase.from('appointments').delete().neq('id', 0);
  await supabase.from('available_slots').delete().neq('id', 0);
  await supabase.from('doctors').delete().neq('id', 0);
  await supabase.from('services').delete().neq('id', 0);

  console.log("2. Inserting 10 Doctors...");
  const docs = [
    { id: 1, name: 'Ахметова Алина Серікқызы', specialty: 'Жалпы тәжірибелі дәрігер (ЖТД)', image_url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600', experience_years: 12, bio: 'Отбасылық медицина сарапшысы' },
    { id: 2, name: 'Оспанов Данияр Маратұлы', specialty: 'Невролог', image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600', experience_years: 16, bio: 'Жүйке жүйесі патологиялары маманы' },
    { id: 3, name: 'Сүлейменова Әлия Қайратқызы', specialty: 'Кардиолог', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600', experience_years: 14, bio: 'Жүрек-қан тамырлары жүйесі дәрігері' },
    { id: 4, name: 'Кәрімов Санжар Болатұлы', specialty: 'Отоларинголог (ЛОР)', image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600', experience_years: 11, bio: 'ЛОР ауруларын заманауи емдеу' },
    { id: 5, name: 'Нұрғалиева Гүлнар Бекзатқызы', specialty: 'Педиатр', image_url: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600', experience_years: 18, bio: 'Балалар денсаулығын жоғары деңгейде бақылау' },
    { id: 6, name: 'Тілеуов Ержан Асқарұлы', specialty: 'Уролог', image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=600', experience_years: 13, bio: 'Ерлер денсаулығы сарапшысы' },
    { id: 7, name: 'Мамедова Лейла Тұрсынқызы', specialty: 'Эндокринолог', image_url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600', experience_years: 15, bio: 'Гормоналды теңгерім және қант диабеті маманы' },
    { id: 8, name: 'Жұмабаев Айдос Кенесұлы', specialty: 'УДЗ Диагностика сарапшысы', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600', experience_years: 20, bio: '3D/4D кешенді ультрадыбыстық зерттеу' },
    { id: 9, name: 'Исаев Мақсат Бақытұлы', specialty: 'Акушер-гинеколог', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600', experience_years: 14, bio: 'Әйелдер денсаулығы және жоспарлау' },
    { id: 10, name: 'Қуатова Зарина Ерланқызы', specialty: 'Зертхана меңгерушісі', image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600', experience_years: 17, bio: 'Кешенді клиникалық талдаулар сарапшысы' }
  ];
  await supabase.from('doctors').insert(docs);

  console.log("3. Inserting 12 Services...");
  const servs = [
    { id: 1, title: 'Жалпы терапевт консультациясы', category: 'Терапия', price: 10000, duration_minutes: 30 },
    { id: 2, title: 'Неврологтың алғашқы консультациясы', category: 'Неврология', price: 15000, duration_minutes: 45 },
    { id: 3, title: 'Кардиолог дәрігерінің қабылдауы', category: 'Кардиология', price: 16000, duration_minutes: 40 },
    { id: 4, title: 'ЛОР дәрігерінің консультациясы', category: 'Отоларингология', price: 13000, duration_minutes: 30 },
    { id: 5, title: 'Уролог дәрігерінің алғашқы қабылдауы', category: 'Урология', price: 15000, duration_minutes: 40 },
    { id: 6, title: 'Акушер-гинеколог консультациясы', category: 'Гинекология', price: 14000, duration_minutes: 45 },
    { id: 7, title: 'Эндокринолог консультациясы', category: 'Эндокринология', price: 15000, duration_minutes: 40 },
    { id: 8, title: 'Педиатр дәрігерінің қабылдауы', category: 'Педиатрия', price: 12000, duration_minutes: 40 },
    { id: 9, title: 'Кешенді УДЗ (іш қуысы және бүйрек)', category: 'УДЗ Диагностика', price: 18000, duration_minutes: 30 },
    { id: 10, title: 'Жалпы қан анализі (ЖҚА - кеңейтілген)', category: 'Зертхана', price: 4500, duration_minutes: 10 },
    { id: 11, title: 'Жүрек ЭКГ тексеруі (декодермен)', category: 'Кардиология', price: 6000, duration_minutes: 15 },
    { id: 12, title: 'Кешенді Check-up (Денсаулық паспорты)', category: 'Терапия', price: 45000, duration_minutes: 90 }
  ];
  await supabase.from('services').insert(servs);

  console.log("4. Inserting sample slots & appointments...");
  const slots = [];
  let sId = 1;
  const times = ['09:00:00', '10:30:00', '11:00:00', '14:00:00', '15:30:00', '17:00:00'];
  const dates = ['2026-06-26', '2026-06-27', '2026-06-28', '2026-06-29', '2026-06-30'];
  for (let d = 1; d <= 10; d++) {
    for (const date of dates) {
      for (const time of times) {
        slots.push({ id: sId++, doctor_id: d, slot_date: date, slot_time: time, is_booked: false });
      }
    }
  }
  await supabase.from('available_slots').insert(slots);

  const phones = ['+7747524706', '7747524706', '+7 (747) 524-70-60', '+77475247060'];
  const appts = [];
  let aId = 200;
  for (const p of phones) {
    appts.push(
      { id: aId++, client_name: 'Бексұлтан', phone: p, service_id: 2, doctor_id: 2, status: 'confirmed', appointment_date: '2026-06-26', appointment_time: '10:00:00' },
      { id: aId++, client_name: 'Бексұлтан', phone: p, service_id: 3, doctor_id: 3, status: 'confirmed', appointment_date: '2026-06-27', appointment_time: '14:30:00' },
      { id: aId++, client_name: 'Бексұлтан', phone: p, service_id: 12, doctor_id: 1, status: 'pending', appointment_date: '2026-06-28', appointment_time: '11:00:00' }
    );
  }
  await supabase.from('appointments').insert(appts);

  console.log("ALL MASTER SEEDING DONE!");
}

seedMaster();
