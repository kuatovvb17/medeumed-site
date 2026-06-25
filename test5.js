const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
const url = urlMatch[1].trim();
const key = keyMatch[1].trim();

const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase
    .from('appointments')
    .select('phone')
    .in('phone', ['+7 (747) 524-70-6', 'something']);
    
  if (error) console.error('Error:', error);
  else console.log('Data:', data);
}
run();
