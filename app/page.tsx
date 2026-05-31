import { AlertCircle, Lock, BarChart3, FileText } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="max-w-xl mx-auto md:mx-0">
              <div className="inline-block bg-maroon-50 px-4 py-2 rounded-full mb-4">
                <span className="text-maroon-800 font-semibold text-sm">
                  Kesehatan Mental, Masa Depan Cerah
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-maroon-800 mb-4 md:mb-6 leading-tight">
                Kenali Dirimu, Jaga Kesehatan Mentalmu
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Platform diagnosis mental health untuk mahasiswa Universitas Harkat Negeri. Lakukan evaluasi diri secara anonim dan rahasia untuk mendeteksi tingkat depresi Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/diagnosis"
                  className="px-6 py-3 bg-maroon-800 text-white rounded-lg font-semibold hover:bg-maroon-900 transition-all shadow-md text-center"
                >
                  Mulai Diagnosis
                </Link>
                <button className="px-6 py-3 border-2 border-maroon-800 text-maroon-800 rounded-lg font-semibold hover:bg-maroon-50 transition-colors">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Mental health support"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-maroon-800 text-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="font-semibold text-sm md:text-lg">
                  "Kesehatan mental adalah fondasi untuk kehidupan yang bermakna."
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:border-maroon-200 transition-all border border-gray-100">
              <Lock className="w-8 h-8 text-maroon-800 mb-4" />
              <h3 className="font-semibold text-maroon-800 mb-2">Privasi Terjamin</h3>
              <p className="text-gray-700 text-sm">
                Data Anda 100% anonim dan terjaga kerahasiaannya dengan aman.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:border-maroon-200 transition-all border border-gray-100">
              <AlertCircle className="w-8 h-8 text-maroon-800 mb-4" />
              <h3 className="font-semibold text-maroon-800 mb-2">
                Diagnosis Akurat
              </h3>
              <p className="text-gray-700 text-sm">
                Sistem berbasis pakar dengan metode Certainty Factor yang terbukti.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:border-maroon-200 transition-all border border-gray-100">
              <BarChart3 className="w-8 h-8 text-maroon-800 mb-4" />
              <h3 className="font-semibold text-maroon-800 mb-2">Hasil Instan</h3>
              <p className="text-gray-700 text-sm">
                Dapatkan hasil diagnosis Anda langsung setelah menjawab kuesioner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:border-maroon-200 transition-all border border-gray-100">
              <FileText className="w-8 h-8 text-maroon-800 mb-4" />
              <h3 className="font-semibold text-maroon-800 mb-2">Export PDF</h3>
              <p className="text-gray-700 text-sm">
                Unduh hasil sebagai referensi untuk konsultasi profesional.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-maroon-50 rounded-2xl shadow-lg p-12 mb-20 border-2 border-maroon-200">
            <h2 className="text-3xl font-bold text-maroon-800 mb-12 text-center">
              Bagaimana Cara Kerjanya?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-maroon-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold text-maroon-800 mb-2">Pilih Semester</h3>
                <p className="text-gray-700 text-sm">
                  Masukkan semester Anda untuk keperluan statistik agregat.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-maroon-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold text-maroon-800 mb-2">
                  Jawab Kuesioner
                </h3>
                <p className="text-gray-700 text-sm">
                  Jawab 12 pertanyaan dengan jujur tentang gejala yang Anda rasakan.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-maroon-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold text-maroon-800 mb-2">Dapatkan Hasil</h3>
                <p className="text-gray-700 text-sm">
                  Sistem menghitung tingkat depresi Anda secara otomatis.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-maroon-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold text-maroon-800 mb-2">Ambil Tindakan</h3>
                <p className="text-gray-700 text-sm">
                  Terima rekomendasi dan rujukan ke profesional kesehatan mental.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-maroon-800 text-white rounded-2xl p-12 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Siap Memulai Perjalanan Kesehatan Mental Anda?
            </h2>
            <p className="text-maroon-100 mb-8 max-w-2xl mx-auto">
              Diagnosis ini dirancang khusus untuk mahasiswa dengan dukungan dari pakar kesehatan mental. Data Anda aman dan akan membantu kami meningkatkan layanan.
            </p>
            <Link
              href="/diagnosis"
              className="inline-block px-8 py-3 bg-white text-maroon-800 rounded-lg font-semibold hover:bg-maroon-50 transition-colors shadow-lg"
            >
              Mulai Diagnosis Sekarang
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
