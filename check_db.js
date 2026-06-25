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

async function check() {
  const { data: docs } = await supabase.from('doctors').select('*');
  console.log("Doctors in DB:", docs?.length, docs?.map(d => ({ id: d.id, name: d.name || d.full_name, spec: d.specialty })));

  const { data: servs } = await supabase.from('services').select('*');
  console.log("Services in DB:", servs?.length, servs?.map(s => ({ id: s.id, title: s.title || s.name, cat: s.category })));
}

check();
