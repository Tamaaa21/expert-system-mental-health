'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Home } from 'lucide-react';
import { CFResult, getSeverityDescription } from '@/lib/certaintyFactor';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function ResultsPage() {
  const router = useRouter();
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<(CFResult & { semester: number; diagnosisId: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem('diagnosisResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  const handlePdfExport = () => {
    if (!resultRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      const opt = {
        margin: 10,
        filename: `diagnosis-hasil-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };
      (window as any).html2pdf().set(opt).from(resultRef.current).save();
    };
    document.body.appendChild(script);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!result) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Diagnosis tidak ditemukan</p>
            <button
              onClick={() => router.push('/diagnosis')}
              className="px-6 py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800"
            >
              Kembali ke Diagnosis
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const description = getSeverityDescription(result.severityLevel);

  const severityColors = {
    Ringan: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      badge: 'bg-green-100 text-green-900',
      bar: 'bg-green-500',
      progress: 'bg-green-200',
    },
    Sedang: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      badge: 'bg-yellow-100 text-yellow-900',
      bar: 'bg-yellow-500',
      progress: 'bg-yellow-200',
    },
    Berat: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-900',
      bar: 'bg-red-500',
      progress: 'bg-red-200',
    },
  };

  const colors = severityColors[result.severityLevel];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              Hasil Diagnosis Anda
            </h1>
            <p className="text-neutral-600 text-lg">
              Semester {result.semester} • {new Date().toLocaleDateString('id-ID')}
            </p>
          </div>

          {/* Results Card */}
          <div
            ref={resultRef}
            className={`${colors.bg} border-2 ${colors.border} rounded-3xl p-10 mb-10 shadow-2xl animate-scale-in`}
          >
            {/* Severity Badge */}
            <div className="flex items-center justify-center mb-10">
              <div className={`${colors.badge} px-8 py-3 rounded-2xl font-bold text-xl`}>
                {description.title}
              </div>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-12">
              <div
                className={`w-40 h-40 rounded-3xl ${colors.progress} flex items-center justify-center shadow-2xl`}
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-neutral-900">
                    {result.severityScore}
                  </div>
                  <div className="text-sm font-bold text-neutral-600 mt-2">
                    Tingkat Keparahan
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-neutral-900">
                  {result.totalCF.toFixed(3)}
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-semibold uppercase tracking-wide">
                  Certainty Factor
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100">
                <div className="text-3xl font-bold text-neutral-900">
                  {result.confidence}%
                </div>
                <div className="text-xs text-neutral-600 mt-2 font-semibold uppercase tracking-wide">Kepercayaan</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-neutral-900">Tingkat Keparahan</span>
                <span className="font-bold text-lg text-neutral-900">{result.severityScore}%</span>
              </div>
              <div className={`h-4 rounded-full ${colors.progress} overflow-hidden`}>
                <div
                  className={`h-full ${colors.bar} transition-all duration-1000`}
                  style={{ width: `${result.severityScore}%` }}
                ></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 mb-10 border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 text-lg">Apa Artinya?</h3>
              <p className="text-neutral-700 leading-relaxed">
                {description.description}
              </p>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-6 text-lg">Rekomendasi Untuk Anda</h3>
              <ul className="space-y-4">
                {description.recommendations.map((rec, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-neutral-700 font-medium">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button
              onClick={handlePdfExport}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-neutral-900 rounded-2xl font-bold border-2 border-neutral-300 hover:border-primary-600 hover:text-primary-600 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <Download className="w-6 h-6" />
              Unduh PDF
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-bold hover:shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 active:scale-95"
            >
              <Home className="w-6 h-6" />
              Kembali ke Home
            </button>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-accent-50 to-accent-100 border-l-4 border-accent-600 rounded-2xl p-8 mb-8">
            <h4 className="font-bold text-accent-900 mb-3 text-lg">Disclaimer Penting</h4>
            <p className="text-accent-900 leading-relaxed mb-4">
              Hasil diagnosis ini adalah untuk <strong>penyaringan awal saja</strong> dan BUKAN pengganti dari diagnosis profesional. Jika Anda mengalami gejala-gejala yang mengkhawatirkan, segera hubungi profesional kesehatan mental untuk evaluasi dan pengobatan yang tepat.
            </p>
            <div className="bg-white rounded-xl p-4 text-center border border-accent-200">
              <p className="text-accent-900 font-bold">
                Layanan Konseling UHN: <span className="text-primary-700">(0274) 1234-5678</span>
              </p>
              <p className="text-accent-800 text-sm">Email: konseling@uhn.ac.id</p>
            </div>
          </div>

          {/* Privacy Statement */}
          <div className="bg-neutral-100 rounded-2xl p-8 text-center border border-neutral-200">
            <p className="text-neutral-700 font-medium">
              <span className="font-bold">Privacy Protected:</span> Hasil diagnosis ini disimpan sepenuhnya anonim. Hanya semester dan hasil agregat yang disimpan, tanpa informasi pribadi apapun.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
