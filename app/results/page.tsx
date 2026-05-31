'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Home } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CFResult } from '@/types/diagnosis';

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

  // Determine color scheme based on severity level
  const colors = (() => {
    if (result.severityLevel === 'Berat') {
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        badge: 'bg-red-600 text-white',
        progress: 'bg-red-100',
        bar: 'bg-red-600',
        text: 'text-red-700',
        icon: 'text-red-600',
      };
    }
    if (result.severityLevel === 'Sedang') {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        badge: 'bg-yellow-600 text-white',
        progress: 'bg-yellow-100',
        bar: 'bg-yellow-600',
        text: 'text-yellow-700',
        icon: 'text-yellow-600',
      };
    }
    return {
      bg: 'bg-green-50',
      border: 'border-green-300',
      badge: 'bg-green-600 text-white',
      progress: 'bg-green-100',
      bar: 'bg-green-600',
      text: 'text-green-700',
      icon: 'text-green-600',
    };
  })();

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

          {/* Results Card - Enhanced with better visualization */}
          <div
            ref={resultRef}
            className={`${colors.bg} border-2 ${colors.border} rounded-3xl p-10 mb-8 shadow-xl`}
            role="region"
            aria-label="Hasil Diagnosis Singkat"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Severity Level */}
              <div className="flex flex-col justify-center items-center">
                <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Tingkat Keparahan</div>
                <div className={`inline-block px-8 py-4 rounded-full ${colors.badge} text-2xl font-bold shadow-lg`}>
                  {result.severityLevel}
                </div>
                <div className="text-xs text-gray-600 mt-4 text-center max-w-xs">
                  {result.severityLevel === 'Berat' && 'Diperlukan perhatian profesional segera'}
                  {result.severityLevel === 'Sedang' && 'Disarankan konsultasi dengan profesional'}
                  {result.severityLevel === 'Ringan' && 'Kondisi relatif stabil'}
                </div>
              </div>

              {/* Right Column - Percentage & Progress */}
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Persentase Keyakinan</div>
                <div className="text-5xl font-extrabold text-neutral-900 mb-4">{result.severityScore}%</div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-sm">
                  <div
                    className={`h-full ${colors.bar} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${result.severityScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Confidence Level */}
            <div className="mt-8 pt-6 border-t border-gray-300 border-opacity-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Tingkat Kepercayaan Diagnosis:</span>
                <span className="text-lg font-bold text-neutral-900">{result.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className={`h-full ${colors.bar} rounded-full opacity-60`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
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
              className="flex items-center justify-center gap-2 px-6 py-4  text-white rounded-2xl font-bold hover:shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 active:scale-95 bg-maroon-800"
            >
              <Home className="w-6 h-6 " />
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
