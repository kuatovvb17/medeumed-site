const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');

let url = '', key = '';
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function seedSlots() {
  console.log("Seeding available_slots for 10 doctors across 14 days...");
  const slots = [];
  const today = new Date();

  for (let docId = 1; docId <= 10; docId++) {
    for (let dayOffset = 0; dayOffset <= 14; dayOffset++) {
      const d = new Date(today);
      d.setDate(d.getDate() + dayOffset);
      const dateStr = d.toISOString().split('T')[0];

      ['09:00:00', '11:00:00', '14:00:00', '16:00:00'].forEach(timeStr => {
        slots.push({
          doctor_id: docId,
          slot_date: dateStr,
          slot_time: timeStr,
          is_booked: false
        });
      });
    }
  }

  console.log(`Total slots to insert: ${slots.length}`);
  
  // Insert in chunks of 100
  for (let i = 0; i < slots.length; i += 100) {
    const chunk = slots.slice(i, i + 100);
    const { error } = await supabase.from('available_slots').insert(chunk);
    if (error) console.error("Chunk error:", error);
  }

  console.log("✅ Finished seeding available_slots!");
}

seedSlots();
