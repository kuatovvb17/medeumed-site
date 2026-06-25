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

async function seedEverything() {
  console.log("1. Wiping old database records...");
  await supabase.from('appointments').delete().neq('id', 0);
  await supabase.from('doctors').delete().neq('id', 0);
  await supabase.from('services').delete().neq('id', 0);

  console.log("2. Seeding multi-disciplinary doctors...");
  const { data: docs, error: docsErr } = await supabase.from('doctors').insert([
    { id: 1, name: 'Ахметова Алина Серікқызы', specialty: 'Жалпы тәжірибелі дәрігер (ЖТД)', image_url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600' },
    { id: 2, name: 'Оспанов Данияр Маратұлы', specialty: 'Невролог', image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600' },
    { id: 3, name: 'Сүлейменова Әлия Қайратқызы', specialty: 'Кардиолог', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600' },
    { id: 4, name: 'Кәрімов Санжар Болатұлы', specialty: 'Отоларинголог (ЛОР)', image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600' },
    { id: 5, name: 'Нұрғалиева Гүлнар Бекзатқызы', specialty: 'Педиатр', image_url: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600' },
    { id: 6, name: 'Тілеуов Ержан Асқарұлы', specialty: 'Уролог', image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=600' },
    { id: 7, name: 'Мамедова Лейла Тұрсынқызы', specialty: 'Эндокринолог', image_url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600' },
    { id: 8, name: 'Жұмабаев Айдос Кенесұлы', specialty: 'УДЗ Диагностика сарапшысы', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600' }
  ]).select();
  if (docsErr) console.error("Docs error:", docsErr);

  console.log("3. Seeding multi-disciplinary services...");
  const { data: servs, error: servsErr } = await supabase.from('services').insert([
    { id: 1, title: 'Жалпы терапевт консультациясы', description: 'Дене қысымын, температураны өлшеу және тексеру' },
    { id: 2, title: 'Неврологтың алғашқы консультациясы', description: 'Жүйке жүйесін, рефлекстерді тексеру, бас ауруын анықтау' },
    { id: 3, title: 'Кардиолог дәрігерінің қабылдауы', description: 'Жүрек-қан тамырлары жүйесін кешенді тексеру' },
    { id: 4, title: 'ЛОР дәрігерінің консультациясы', description: 'Құлақ, тамақ және мұрын жолдарын тексеру' },
    { id: 5, title: 'Уролог дәрігерінің алғашқы қабылдауы', description: 'Зәр шығару жүйесі мен бүйректі диагностикалау' },
    { id: 6, title: 'Акушер-гинеколог консультациясы', description: 'Әйелдер денсаулығын тексеру' },
    { id: 7, title: 'Эндокринолог консультациясы', description: 'Гормоналды теңгерімді зерттеу' },
    { id: 8, title: 'Педиатр дәрігерінің қабылдауы', description: '0-18 жас аралығындағы балалар денсаулығын бақылау' },
    { id: 9, title: 'Кешенді УДЗ (іш қуысы және бүйрек)', description: 'Бауыр, өт қабы, ұйқы безі және бүйректі тексеру' },
    { id: 10, title: 'Жалпы қан анализі (ЖҚА - кеңейтілген)', description: 'Лейкоцитарлық формуламен толық қан талдауы' }
  ]).select();
  if (servsErr) console.error("Servs error:", servsErr);

  console.log("4. Seeding sample appointments for user phone...");
  const phonesToSeed = ['+7747524706', '7747524706', '+7 (747) 524-70-60', '+77475247060', '87475247060', '77475247060'];
  
  const sampleAppts = [];
  let idCounter = 100;
  for (const phone of phonesToSeed) {
    sampleAppts.push(
      { id: idCounter++, client_name: 'Бексұлтан (Пациент)', phone: phone, service_id: 2, doctor_id: 2, status: 'confirmed', appointment_date: '2026-06-26', appointment_time: '10:00:00' },
      { id: idCounter++, client_name: 'Бексұлтан (Пациент)', phone: phone, service_id: 3, doctor_id: 3, status: 'confirmed', appointment_date: '2026-06-27', appointment_time: '14:30:00' },
      { id: idCounter++, client_name: 'Бексұлтан (Пациент)', phone: phone, service_id: 9, doctor_id: 8, status: 'pending', appointment_date: '2026-06-28', appointment_time: '11:00:00' }
    );
  }

  const { error: apptErr } = await supabase.from('appointments').insert(sampleAppts);
  if (apptErr) console.error("Appt seed error:", apptErr);
  else console.log("Successfully seeded appointments!");

  console.log("ALL DONE! Database completely rebranded & seeded!");
}

seedEverything();
