import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uoqeavntapyfwizdzddj.supabase.co';
const supabaseAnonKey = 'sb_publishable_z_0AS9CVuTJOlPTuG8uBMw_TX5RepWq';

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

console.log("DEBUG: Using Supabase URL:", supabaseUrl);
console.log("DEBUG: Using Anon Key starts with:", supabaseAnonKey.substring(0, 10));

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase Connection Status:', !!supabase);
