/**
 * Certainty Factor (CF) Result Type
 * 
 * Represents the output of the CF calculation for depression diagnosis
 */
export type CFResult = {
  // Total CF value (between 0 and 1)
  totalCF: number;
  
  // Severity level determined by highest CF from rule categories
  // Normal: No symptoms detected (CF = 0)
  // Ringan: Emotional symptoms (A001-A004)
  // Sedang: Physical symptoms (A005-A008)
  // Berat: Cognitive/Fatal symptoms (A009-A012)
  severityLevel: 'Normal' | 'Ringan' | 'Sedang' | 'Berat';
  
  // Percentage score (0-100) derived from CF value
  // Formula: severityScore = Math.round(CF × 100)
  severityScore: number;
  
  // Confidence level (0-100) - same as severityScore
  confidence: number;
};

/**
 * Individual Symptom Answer Type
 */
export type SymptomAnswer = {
  symptomId: number;
  code: string;
  userAnswer: boolean;
  expertWeight: number;
};

/**
 * Diagnosis Record stored in database
 */
export type DiagnosisRecord = {
  id: string;
  semester: number;
  total_cf: number;
  severity_level: string;
  severity_score: number;
  created_at: string;
};
