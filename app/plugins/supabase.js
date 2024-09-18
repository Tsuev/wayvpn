import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "../../.env" });

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;

console.log(supabaseUrl, supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
