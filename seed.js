const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let supabaseUrl = '';
let supabaseKey = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding multi-disciplinary doctors...");
  const { error: doctorsError } = await supabase
    .from('doctors')
    .insert([
      { name: 'Ахметова Алина Серікқызы', specialty: 'Жалпы тәжірибелі дәрігер (ЖТД)', image_url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600' },
      { name: 'Оспанов Данияр Маратұлы', specialty: 'Невролог', image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600' },
      { name: 'Сүлейменова Әлия Қайратқызы', specialty: 'Кардиолог', image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600' },
      { name: 'Кәрімов Санжар Болатұлы', specialty: 'Отоларинголог (ЛОР)', image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600' },
      { name: 'Нұрғалиева Гүлнар Бекзатқызы', specialty: 'Педиатр', image_url: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600' },
      { name: 'Тілеуов Ержан Асқарұлы', specialty: 'Уролог', image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=600' },
      { name: 'Мамедова Лейла Тұрсынқызы', specialty: 'Эндокринолог', image_url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600' },
      { name: 'Жұмабаев Айдос Кенесұлы', specialty: 'УДЗ Диагностика сарапшысы', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600' }
    ]);

  if (doctorsError) console.error("Error seeding doctors:", doctorsError);
  else console.log("Successfully seeded doctors.");

  console.log("Seeding multi-disciplinary services...");
  const { error: servicesError } = await supabase
    .from('services')
    .insert([
      { title: 'Жалпы терапевт консультациясы', description: 'Дене қысымын, температураны өлшеу және тексеру' },
      { title: 'Неврологтың алғашқы консультациясы', description: 'Жүйке жүйесін, рефлекстерді тексеру, бас ауруын анықтау' },
      { title: 'Кардиолог дәрігерінің қабылдауы', description: 'Жүрек-қан тамырлары жүйесін кешенді тексеру' },
      { title: 'ЛОР дәрігерінің консультациясы', description: 'Құлақ, тамақ және мұрын жолдарын тексеру' },
      { title: 'Уролог дәрігерінің алғашқы қабылдауы', description: 'Зәр шығару жүйесі мен бүйректі диагностикалау' },
      { title: 'Акушер-гинеколог консультациясы', description: 'Әйелдер денсаулығын тексеру' },
      { title: 'Эндокринолог консультациясы', description: 'Гормоналды теңгерімді зерттеу' },
      { title: 'Педиатр дәрігерінің қабылдауы', description: '0-18 жас аралығындағы балалар денсаулығын бақылау' },
      { title: 'Кешенді УДЗ (іш қуысы және бүйрек)', description: 'Бауыр, өт қабы, ұйқы безі және бүйректі тексеру' },
      { title: 'Жалпы қан анализі (ЖҚА - кеңейтілген)', description: 'Лейкоцитарлық формуламен толық қан талдауы' }
    ]);

  if (servicesError) console.error("Error seeding services:", servicesError);
  else console.log("Successfully seeded services.");
}

seed();
