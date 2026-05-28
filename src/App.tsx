import { useState, useEffect } from 'react';
import { supabase, Symptom } from './lib/supabase';
import { calculateCertaintyFactor, CFResult } from './lib/certaintyFactor';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Information } from './pages/Information';
import { Diagnosis } from './pages/Diagnosis';
import { Results } from './pages/Results';
import { Admin } from './pages/Admin';

type PageType = 'home' | 'about' | 'info' | 'diagnosis' | 'results' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<CFResult | null>(null);
  const [currentSemester, setCurrentSemester] = useState(1);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  async function fetchSymptoms() {
    const { data } = await supabase
      .from('symptoms')
      .select('*')
      .order('id', { ascending: true });
    if (data) setSymptoms(data);
  }

  const handleDiagnosisComplete = (
    answers: { symptomId: number; answer: boolean }[],
    semester: number,
    diagnosisId: string
  ) => {
    setCurrentSemester(semester);

    const cfAnswers = answers.map((answer) => {
      const symptom = symptoms.find((s) => s.id === answer.symptomId);
      return {
        expertWeight: symptom?.expert_weight || 0,
        userAnswer: answer.answer,
      };
    });

    const result = calculateCertaintyFactor(cfAnswers);

    supabase
      .from('diagnoses')
      .update({
        total_cf: result.totalCF,
        severity_level: result.severityLevel,
        severity_score: result.severityScore,
      })
      .eq('id', diagnosisId)
      .then(({ error }) => {
        if (error) console.error('Error updating diagnosis:', error);
      });

    setDiagnosisResult(result);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'home' && (
        <Home onStartDiagnosis={() => setCurrentPage('diagnosis')} />
      )}
      {currentPage === 'about' && <About />}
      {currentPage === 'info' && <Information />}
      {currentPage === 'diagnosis' && (
        <Diagnosis onComplete={handleDiagnosisComplete} />
      )}
      {currentPage === 'results' && diagnosisResult && (
        <Results
          result={diagnosisResult}
          semester={currentSemester}
          onBackHome={() => {
            setCurrentPage('home');
            setDiagnosisResult(null);
          }}
        />
      )}
      {currentPage === 'admin' && <Admin />}

      <footer className="bg-red-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Navigasi</h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('about')}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('info')}
                    className="hover:text-white transition-colors"
                  >
                    Informasi
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Layanan</h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage('diagnosis')}
                    className="hover:text-white transition-colors"
                  >
                    Diagnosis Mental
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>Phone: (0274) 1234-5678</li>
                <li>Email: support@uhn.ac.id</li>
                <li>Jam Operasional: 08:00 - 17:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-red-200 transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-red-200 transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-red-200 transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-red-800 pt-8">
            <p className="text-center text-red-100 text-sm">
              Berharap Kebaikan dalam Setiap Langkah Kesehatan Mental Anda
            </p>
            <p className="text-center text-red-200 text-xs mt-4">
              © 2024 Universitas Harkat Negeri. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
