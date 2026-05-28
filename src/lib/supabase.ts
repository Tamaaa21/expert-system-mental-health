import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Symptom = {
  id: number;
  code: string;
  statement: string;
  expert_weight: number;
  category: string;
};

export type Diagnosis = {
  id: string;
  semester: number;
  total_cf: number;
  severity_level: string;
  severity_score: number;
  created_at: string;
};

export type DiagnosisAnswer = {
  diagnosis_id: string;
  symptom_id: number;
  user_answer: boolean;
  cf_value: number;
};
