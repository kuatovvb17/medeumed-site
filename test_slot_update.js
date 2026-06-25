const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let url = '', key = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function testUpdate() {
  console.log("Updating slot id 1 to is_booked = true...");
  const { data, error } = await supabase.from('available_slots').update({ is_booked: true }).eq('id', 1).select();
  console.log("Update result:", { data, error });
}

testUpdate();
