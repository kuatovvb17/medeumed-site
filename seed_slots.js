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

async function seedSlots() {
  console.log("Seeding available slots with bigint IDs...");
  await supabase.from('available_slots').delete().neq('id', 0);

  const slots = [];
  let slotId = 1;
  const times = ['09:00:00', '10:30:00', '11:00:00', '14:00:00', '15:30:00', '17:00:00'];
  const dates = ['2026-06-25', '2026-06-26', '2026-06-27', '2026-06-28', '2026-06-29', '2026-06-30'];

  for (let docId = 1; docId <= 8; docId++) {
    for (const d of dates) {
      for (const t of times) {
        slots.push({
          id: slotId++,
          doctor_id: docId,
          slot_date: d,
          slot_time: t,
          is_booked: false
        });
      }
    }
  }

  const { error } = await supabase.from('available_slots').insert(slots);
  if (error) console.error("Slots error:", error);
  else console.log("Successfully seeded 288 available slots!");
}

seedSlots();
