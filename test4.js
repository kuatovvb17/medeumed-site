const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
const url = urlMatch[1].trim();
const key = keyMatch[1].trim();

const supabase = createClient(url, key);

async function run() {
  const savedPhone = '87475524706';
  const formatted = '+7 (747) 552-47-06';
  const mainDigits = '7475524706';
  const orQuery = `phone.eq."${formatted}",phone.eq."8${mainDigits}",phone.eq."7${mainDigits}",phone.eq."+7${mainDigits}",phone.eq."${savedPhone}"`;

  const { data, error } = await supabase
    .from('appointments')
    .select('phone')
    .or(orQuery);
    
  if (error) console.error('Error:', error);
  else console.log('Data:', data);
}
run();
