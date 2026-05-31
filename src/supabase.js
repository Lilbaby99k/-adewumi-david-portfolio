import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wcakzmqyiqhmcbuepfuj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_1zTa5F-ueIB5A3wUKoDMng_F8d_j8p_';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);