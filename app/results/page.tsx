'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Home } from 'lucide-react';
import { CFResult } from '@/lib/certaintyFactor';
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

const cfPercent = (result.totalCF * 100).toFixed(2);
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
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
            className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-8 mb-8 shadow-lg`}
          >
            {/* Severity Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className={`${colors.badge} px-6 py-2 rounded-full font-bold text-lg`}>
                {description.title}
              </div>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-8">
              <div
                className={`w-32 h-32 rounded-full ${colors.progress} flex items-center justify-center shadow-lg`}
              >
                <div className="text-center">
                  <div className={`text-4xl font-bold`}>
                    {result.severityScore}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Tingkat Keparahan
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {result.totalCF.toFixed(4)}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Certainty Factor
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {result.confidence}%
                </div>
                <div className="text-xs text-gray-600 mt-1">Kepercayaan</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-900">
                  Tingkat Keparahan
                </span>
                <span className="text-sm text-gray-600">{result.severityScore}%</span>
              </div>
              <div className={`h-3 rounded-full ${colors.progress} overflow-hidden`}>
                <div
                  className={`h-full ${colors.bar} transition-all`}
                  style={{ width: `${result.severityScore}%` }}
                ></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Tentang Hasil Anda</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {description.description}
              </p>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Rekomendasi</h3>
              <ul className="space-y-3">
                {description.recommendations.map((rec, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-700">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-900 text-white flex-shrink-0 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{rec}</span>
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
          <div className="bg-blue-50 border-l-4 border-blue-900 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-blue-900 mb-2">Penting</h4>
            <p className="text-blue-900 text-sm leading-relaxed mb-3">
              Hasil diagnosis ini adalah untuk tujuan penyaringan awal saja dan BUKAN
              pengganti dari diagnosis profesional. Jika Anda mengalami gejala-gejala
              yang mengkhawatirkan, segera hubungi profesional kesehatan mental untuk
              evaluasi dan pengobatan yang tepat.
            </p>
            <p className="text-blue-900 text-sm font-medium">
              Layanan Konseling UHN: (0274) 1234-5678 • Email: konseling@uhn.ac.id
            </p>
          </div>

          {/* Privacy Statement */}
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Privasi Anda Terlindungi:</span> Hasil
              diagnosis ini tidak disimpan dengan informasi pribadi apapun. Data yang
              disimpan hanya semester dan hasil agregat untuk keperluan statistik.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
