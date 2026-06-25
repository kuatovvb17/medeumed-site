const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let url = '', key = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function testFilter() {
  const loginInput = '+7 (747) 552-47-06'; // Row 4 and Row 5
  const targetDigits = loginInput.replace(/\D/g, '').slice(-10); // "7475524706"
  console.log("Target digits:", targetDigits);

  const { data: allData, error } = await supabase
    .from('appointments')
    .select('*, doctors(*), services(*)')
    .order('id', { ascending: false })
    .limit(100);

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  const matched = (allData || []).filter(item => {
    const itemDigits = (item.phone || '').replace(/\D/g, '').slice(-10);
    return targetDigits.length === 10 && itemDigits === targetDigits;
  });

  console.log(`Found ${matched.length} appointments matching ${loginInput}:`, matched.map(m => ({ id: m.id, name: m.client_name, phone: m.phone })));
}

testFilter();
