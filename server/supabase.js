import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = "https://geuactrzbqzvoxmgsqqi.supabase.co"
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdldWFjdHJ6YnF6dm94bWdzcXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxODcyMzQsImV4cCI6MTk4OTc2MzIzNH0.fkG0qppnSKIvWY6sG9U3vEt5oZr2ul_QtidQ_ejD42k"
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)