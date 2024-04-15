import { createClient } from '@supabase/supabase-js'

const URL = 'https://wbigmcoamgfoauwatcsy.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiaWdtY29hbWdmb2F1d2F0Y3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNDE2NDksImV4cCI6MjAyODcxNzY0OX0.s9NkG3AY2kGITOwq88Wt8SzyHLvIv06gWAgEPSV5I2E';

export const supabase = createClient(URL, API_KEY);