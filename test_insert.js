const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let url = '', key = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function testInsert() {
  console.log("Testing insert into appointments...");
  const { data, error } = await supabase.from('appointments').insert([{
    client_name: 'Тест Бексұлтан',
    phone: '+77475524706',
    service_id: 1,
    doctor_id: 1,
    appointment_date: '2026-06-27',
    appointment_time: '10:00:00',
    status: 'confirmed'
  }]).select();

  console.log("Insert result:", { data, error });
}

testInsert();
