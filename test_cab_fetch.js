const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let url = '', key = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function testFetch() {
  const phoneVariations = ['+7 (747) 552-47-06', '+77475524706', '87475524706', '77475524706'];
  console.log("Querying appointments for phoneVariations:", phoneVariations);
  
  const res1 = await supabase.from('appointments').select('*').in('phone', phoneVariations);
  console.log("Simple select(*):", res1);

  const res2 = await supabase.from('appointments').select('*, doctors(*), services(*)').in('phone', phoneVariations);
  console.log("Joined select:", res2);
}

testFetch();
