const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
const url = urlMatch[1].trim();
const key = keyMatch[1].trim();

const supabase = createClient(url, key);

async function run() {
  const variations = [
    '+7 (747) 552-47-06',
    '%2B7 (747) 552-47-06',
    '87475524706',
    '77475524706'
  ];
  
  const { data, error } = await supabase
    .from('appointments')
    .select('phone, client_name')
    .in('phone', variations);
    
  console.log(data);
}
run();
