import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zsvnxvsrqzthdxgxfvbf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzdm54dnNycXp0aGR4Z3hmdmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNTE0ODYsImV4cCI6MjAyNzgyNzQ4Nn0.ZbLBh-vkAXjaGWUEi9dbGQeNxZUuteVvlYxfijM8qec";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
