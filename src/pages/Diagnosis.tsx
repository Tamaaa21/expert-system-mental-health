import { useState, useEffect } from 'react';
import { supabase, Symptom } from '../lib/supabase';
import { ChevronRight, Loader } from 'lucide-react';

type DiagnosisPageProps = {
  onComplete: (
    answers: { symptomId: number; answer: boolean }[],
    semester: number,
    diagnosisId: string
  ) => void;
};

type Step = 'semester' | 'questionnaire';

export function Diagnosis({ onComplete }: DiagnosisPageProps) {
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

      // Create diagnosis record
      const { data: diagnosisData, error: diagnosisError } = await supabase
        .from('diagnoses')
        .insert([
          {
            semester,
            total_cf: 0,
            severity_level: 'Pending',
            severity_score: 0,
          },
        ])
        .select()
        .single();

      if (diagnosisError) throw diagnosisError;

      // Insert answers
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

      const answerArray = symptoms.map((s) => ({
        symptomId: s.id,
        answer: answers[s.id] || false,
      }));

      onComplete(answerArray, semester, diagnosisData.id);
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
      alert(
        'Terjadi kesalahan saat menyimpan diagnosis. Silakan coba lagi.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const allAnswered = symptoms.length > 0 && symptoms.every((s) => s.id in answers);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-red-900 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat kuesioner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 'semester' && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mulai Diagnosis
            </h1>
            <p className="text-gray-600 mb-8">
              Pilih semester Anda untuk melanjutkan kuesioner diagnosis mental health.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Semester Anda:
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <button
                    key={sem}
                    onClick={() => setSemester(sem)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      semester === sem
                        ? 'bg-red-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {sem}
                    {sem === 8 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-900 text-sm">
                <span className="font-semibold">Catatan Privasi:</span> Informasi
                semester Anda hanya digunakan untuk statistik agregat dan tidak
                akan diidentifikasi dengan pribadi Anda. Diagnosis Anda sepenuhnya
                anonim.
              </p>
            </div>

            <button
              onClick={handleStartQuestionnaire}
              className="w-full py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
            >
              Mulai Kuesioner
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 'questionnaire' && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kuesioner Diagnosis
              </h1>
              <p className="text-gray-600">
                Jawab pertanyaan berikut dengan jujur. Semester: Tahun
                ke-{semester}
              </p>
              <div className="mt-4 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-900 h-full transition-all"
                  style={{
                    width: `${Math.round(
                      (Object.keys(answers).length / symptoms.length) * 100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {Object.keys(answers).length} dari {symptoms.length} pertanyaan
                terjawab
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {symptoms.map((symptom, index) => (
                <div
                  key={symptom.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex-1">
                      <span className="text-red-900 font-bold mr-2">
                        {index + 1}.
                      </span>
                      {symptom.statement}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAnswerChange(symptom.id, true)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        answers[symptom.id] === true
                          ? 'bg-red-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      onClick={() => handleAnswerChange(symptom.id, false)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        answers[symptom.id] === false
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="w-full py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Lihat Hasil
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            {!allAnswered && (
              <p className="text-center text-gray-600 mt-4 text-sm">
                Silakan jawab semua pertanyaan untuk melanjutkan
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
