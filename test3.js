const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
const url = urlMatch[1].trim();
const key = keyMatch[1].trim();

const supabase = createClient(url, key);

async function run() {
  let { data } = await supabase.from('appointments').select('phone').in('phone', ['+7 (747) 552-47-06']);
  console.log('With +:', data);
  
  ({ data } = await supabase.from('appointments').select('phone').in('phone', ['%2B7 (747) 552-47-06']));
  console.log('With %2B:', data);
}
run();
