import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ccplfgvevyiuyejfyodo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_0ormWLUPSdrmN5JK5Nk4ZQ_OlvwjfM9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

