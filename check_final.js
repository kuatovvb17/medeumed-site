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

async function verify() {
  const { count: d } = await supabase.from('doctors').select('*', { count: 'exact', head: true });
  const { count: s } = await supabase.from('services').select('*', { count: 'exact', head: true });
  const { count: sl } = await supabase.from('available_slots').select('*', { count: 'exact', head: true });
  const { data: a } = await supabase.from('appointments').select('*');

  console.log(`FINAL DB STATUS:\nDoctors: ${d}\nServices: ${s}\nSlots: ${sl}\nAppointments: ${a?.length}`, a);
}

verify();
