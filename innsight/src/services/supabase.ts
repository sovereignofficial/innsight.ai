import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = 'https://erxxsfzyczboojumtylw.supabase.co';

export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabaseClient = createClient(supabaseUrl,supabaseKey);