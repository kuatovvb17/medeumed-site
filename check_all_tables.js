const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let url = '', key = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function checkAll() {
  const docs = await supabase.from('doctors').select('*');
  const srvs = await supabase.from('services').select('*');
  const slots = await supabase.from('available_slots').select('*');
  console.log("Doctors count:", docs.data?.length, docs.error);
  console.log("Services count:", srvs.data?.length, srvs.error);
  console.log("Slots count:", slots.data?.length, slots.error);
}

checkAll();
