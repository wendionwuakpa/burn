// connect React app to Supabase database
import { createClient } from '@supabase/supabase-js'

const URL = 'https://nupjsrxjzfiwaflubqqq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cGpzcnhqemZpd2FmbHVicXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NzUwOTAsImV4cCI6MjAyODU1MTA5MH0.xWw68QpGMNWifofd3AJFsu4R_86AA0Xg7vcerxsmr9o'; 
export const supabase = createClient(URL, API_KEY);
