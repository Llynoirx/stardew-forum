import {createClient} from '@supabase/supabase-js'

// Supabase project URL and API key for authentication
const URL = 'https://xptuyhlrruksyulsvlyn.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwdHV5aGxycnVrc3l1bHN2bHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDgxNjIsImV4cCI6MjA0NzYyNDE2Mn0.HlrdypOgWX88tE2Z1uT70xUAB9c71JaTHV9vPmaJxEI';

// Create a Supabase client instance using the project URL and API key
export const supabase = createClient(URL, API_KEY);