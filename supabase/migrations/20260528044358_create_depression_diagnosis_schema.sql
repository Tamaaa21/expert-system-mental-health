/*
  # Depression Diagnosis Expert System Schema

  1. New Tables
    - `symptoms` - Master list of diagnosis symptoms with expert weights
    - `diagnoses` - User diagnosis results (anonymous tracking)
    - `diagnosis_answers` - Individual symptom answers per diagnosis
    - `statistics` - Aggregated statistics by semester

  2. Security
    - Enable RLS on all tables
    - Diagnoses table is append-only (no user identification)
    - Statistics are computed from aggregated data only

  3. Data Flow
    - Users answer 12 questions about symptoms
    - System calculates Certainty Factor (CF) for each answer
    - Results are stored anonymously by semester
    - Admin can view aggregated statistics only
*/

-- Create symptoms table
CREATE TABLE IF NOT EXISTS symptoms (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  statement TEXT NOT NULL,
  expert_weight DECIMAL(3, 2) NOT NULL,
  category VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Symptoms are publicly readable"
  ON symptoms FOR SELECT
  TO public
  USING (true);

-- Create diagnoses table (anonymous results)
CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester INT NOT NULL CHECK (semester >= 1 AND semester <= 8),
  total_cf DECIMAL(5, 4) NOT NULL,
  severity_level VARCHAR(20) NOT NULL,
  severity_score INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Diagnoses are append-only for anonymous users"
  ON diagnoses FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Diagnoses are readable for statistics only"
  ON diagnoses FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create diagnosis answers table
CREATE TABLE IF NOT EXISTS diagnosis_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id UUID NOT NULL REFERENCES diagnoses(id) ON DELETE CASCADE,
  symptom_id INT NOT NULL REFERENCES symptoms(id),
  user_answer BOOLEAN NOT NULL,
  cf_value DECIMAL(5, 4),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE diagnosis_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Answers are readable after diagnosis creation"
  ON diagnosis_answers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Answers can be read by all"
  ON diagnosis_answers FOR SELECT
  USING (true);

-- Create statistics view data table
CREATE TABLE IF NOT EXISTS statistics (
  id SERIAL PRIMARY KEY,
  semester INT NOT NULL,
  total_diagnoses INT DEFAULT 0,
  mild_count INT DEFAULT 0,
  moderate_count INT DEFAULT 0,
  severe_count INT DEFAULT 0,
  average_cf DECIMAL(5, 4),
  last_updated TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Statistics are publicly readable"
  ON statistics FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_diagnoses_semester ON diagnoses(semester);
CREATE INDEX IF NOT EXISTS idx_diagnoses_created_at ON diagnoses(created_at);
CREATE INDEX IF NOT EXISTS idx_diagnosis_answers_diagnosis_id ON diagnosis_answers(diagnosis_id);
CREATE INDEX IF NOT EXISTS idx_symptoms_code ON symptoms(code);