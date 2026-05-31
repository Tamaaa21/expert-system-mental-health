'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Symptom } from '@/lib/supabase';
import { calculateCertaintyFactor } from '@/lib/certaintyFactor';
import { ChevronRight, Loader, Heart, Shield } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

type Step = 'semester' | 'questionnaire';

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('semester');
  const [semester, setSemester] = useState(1);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  async function fetchSymptoms() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('symptoms')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setSymptoms(data || []);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAnswerChange = (symptomId: number, value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [symptomId]: value,
    }));
  };

  const handleStartQuestionnaire = () => {
    setStep('questionnaire');
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const cfAnswers = symptoms.map((s) => ({
        symptomId: s.id,
        code: s.code,
        userAnswer: answers[s.id] || false,
        expertWeight: s.expert_weight,
      }));

      const result = calculateCertaintyFactor(cfAnswers);

      const { data: diagnosisData, error: diagnosisError } = await supabase
        .from('diagnoses')
        .insert([
          {
            semester,
            total_cf: result.totalCF,
            severity_level: result.severityLevel,
            severity_score: result.severityScore,
          },
        ])
        .select()
        .single();

      if (diagnosisError) throw diagnosisError;

      const answerRecords = symptoms.map((symptom) => ({
        diagnosis_id: diagnosisData.id,
        symptom_id: symptom.id,
        user_answer: answers[symptom.id] || false,
        cf_value: (answers[symptom.id] || false) ? symptom.expert_weight : 0,
      }));

      const { error: answersError } = await supabase
        .from('diagnosis_answers')
        .insert(answerRecords);

      if (answersError) throw answersError;

      // Store result in session/localStorage for results page
      localStorage.setItem(
        'diagnosisResult',
        JSON.stringify({
          ...result,
          semester,
          diagnosisId: diagnosisData.id,
        })
      );

      router.push('/results');
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
      alert('Terjadi kesalahan saat menyimpan diagnosis. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const allAnswered = symptoms.length > 0 && symptoms.every((s) => s.id in answers);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <p className="text-neutral-600 font-medium">Memuat kuesioner...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 'semester' && (
            <div className="bg-white rounded-2xl shadow-lg p-10 mt-8 border border-neutral-200 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900">Mulai Diagnosis</h1>
              </div>
              <p className="text-neutral-600 mb-8 text-lg">
                Pilih semester Anda untuk melanjutkan diagnosis kesehatan mental yang aman dan anonim.
              </p>

              <div className="mb-8">
                <label className="block text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wide">
                  Semester Anda
                </label>
                <div className="grid grid-cols-4 gap-3">
                 {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
  <button
    key={sem}
    onClick={() => setSemester(sem)}
    className={`py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
      semester === sem
        ? 'bg-gradient-to-r from-[#800020] to-[#A52A2A] text-white shadow-lg scale-105 border-2 border-[#800020]'
        : 'bg-white text-[#800020] border-2 border-[#800020]/20 hover:bg-[#800020]/10 hover:border-[#800020] hover:scale-105'
    }`}
  >
    {sem}
    {sem === 8 ? '+' : ''}
  </button>
))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent-50 to-accent-100 border-2 border-accent-300 rounded-xl p-5 mb-8">
                <div className="flex gap-3">
                  <Shield className="w-6 h-6 text-accent-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-accent-900 mb-1">Privasi Terjamin</p>
                    <p className="text-accent-800 text-sm">
                      Data Anda 100% anonim. Hanya semester yang disimpan untuk statistik agregat, tanpa identifikasi pribadi.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartQuestionnaire}
className="w-full py-4 bg-gradient-to-r from-[#800020] to-[#A52A2A] text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"              >
                Mulai Kuesioner
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {step === 'questionnaire' && (
            <div className="bg-white rounded-2xl shadow-lg p-10 mt-8 border border-neutral-200 animate-fade-in">
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-neutral-900">Kuesioner Diagnosis</h1>
                  <span className="px-4 py-2 bg-[#800020]/10 text-[#800020] rounded-full font-bold text-sm border border-[#800020]/20">
                    Semester {semester}
                  </span>
                </div>
                <p className="text-neutral-600 mb-6">
                  Jawab semua pertanyaan dengan jujur dan sesuai dengan kondisi Anda saat ini.
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-neutral-900">Progress</span>
                    <span className="text-sm font-bold text-neutral-900">
                      {Object.keys(answers).length} / {symptoms.length}
                    </span>
                  </div>
                  <div className="bg-neutral-200 h-3 rounded-full overflow-hidden">
                    <div
className="bg-gradient-to-r from-[#800020] to-[#B22222] h-full transition-all duration-300"                      style={{
                        width: `${Math.round(
                          (Object.keys(answers).length / symptoms.length) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 mb-10">
                {symptoms.map((symptom, index) => (
                  <div
                    key={symptom.id}
                    className="group bg-gradient-to-r from-neutral-50 to-white border-2 border-neutral-200 rounded-2xl p-6 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span >
                        {index + 1}
                      </span>
                      <p className="font-semibold text-neutral-900 text-lg flex-1">{symptom.statement}</p>
                    </div>
                    <div className="flex gap-3">
                      {[true, false].map((value) => (
                        <button
                          key={value ? 'ya' : 'tidak'}
                          onClick={() => handleAnswerChange(symptom.id, value)}
                          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all transform ${
                            answers[symptom.id] === value
                              ? value
                                ? 'bg-gradient-to-r from-[#800020] to-[#A52A2A] text-white shadow-lg scale-105'
                                : 'bg-gradient-to-r from-neutral-700 to-neutral-800 text-white shadow-lg scale-105'
                              : value
                              ? 'bg-accent-50 text-accent-800 hover:bg-accent-100'
                              : 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100'
                          }`}
                        >
                          {value ? '✓ Ya' : '✗ Tidak'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!allAnswered || submitting}
className="w-full py-4 bg-gradient-to-r from-[#800020] to-[#A52A2A] text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"              >
                {submitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Memproses Diagnosis...</span>
                  </>
                ) : (
                  <>
                    <span>Lihat Hasil Saya</span>
                    <ChevronRight className="w-6 h-6" />
                  </>
                )}
              </button>

              {!allAnswered && (
                <p className="text-center text-neutral-800 mt-6 text-sm bg-neutral-50 py-3 rounded-lg">
                  Jawab semua 12 pertanyaan untuk melanjutkan
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
