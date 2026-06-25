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

async function inspect() {
  const { data: servs } = await supabase.from('services').select('*').limit(1);
  console.log("Service keys:", servs ? Object.keys(servs[0]) : null, servs[0]);

  const { data: docs } = await supabase.from('doctors').select('*').limit(1);
  console.log("Doctor keys:", docs ? Object.keys(docs[0]) : null, docs[0]);
}

inspect();
