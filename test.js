const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
const url = urlMatch[1].trim();
const key = keyMatch[1].trim();

const fetchTest = async (query) => {
  const res = await fetch(url + '/rest/v1/appointments?select=phone,client_name&' + query, {
    headers: {
      'apikey': key,
      'Authorization': 'Bearer ' + key
    }
  });
  if (!res.ok) {
    console.error('Error for ' + query + ':', await res.text());
    return;
  }
  const data = await res.json();
  console.log('Result for ' + query + ':', data);
};

(async () => {
  // Test 1: unquoted IN
  await fetchTest('phone=in.(+7 (747) 552-47-06)');
  // Test 2: quoted IN
  await fetchTest('phone=in.("%2B7 (747) 552-47-06")');
  // Test 3: quoted IN without url encoding
  await fetchTest('phone=in.("+7 (747) 552-47-06")');
  // Test 4: OR
  await fetchTest('or=(phone.eq."+7 (747) 552-47-06")');
})();
