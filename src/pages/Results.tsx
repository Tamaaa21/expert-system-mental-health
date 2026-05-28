import { Download, Home } from 'lucide-react';
import { CFResult, getSeverityDescription } from '../lib/certaintyFactor';
import { useRef, useEffect, useState } from 'react';

type ResultsProps = {
  result: CFResult;
  semester: number;
  onBackHome: () => void;
};

export function Results({ result, semester, onBackHome }: ResultsProps) {
  const resultRef = useRef<HTMLDivElement>(null);
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

  const handlePdfExport = async () => {
    const element = resultRef.current;
    if (!element) return;

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
      (window as any).html2pdf().set(opt).from(element).save();
    };
    document.body.appendChild(script);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hasil Diagnosis Anda
          </h1>
          <p className="text-gray-600">
            Semester {semester} • {new Date().toLocaleDateString('id-ID')}
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
                <div className={`text-4xl font-bold ${colors.badge.split(' ')[1]}`}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={handlePdfExport}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-200 hover:border-red-900 hover:text-red-900 transition-colors"
          >
            <Download className="w-5 h-5" />
            Unduh PDF
          </button>
          <button
            onClick={onBackHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors"
          >
            <Home className="w-5 h-5" />
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
  );
}
