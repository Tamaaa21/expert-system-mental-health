import { AlertCircle, Lock, BarChart3, FileText } from 'lucide-react';

type HomeProps = {
  onStartDiagnosis: () => void;
};

export function Home({ onStartDiagnosis }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-block bg-red-100 px-4 py-2 rounded-full mb-4">
              <span className="text-red-900 font-semibold text-sm">
                Kesehatan Mental, Masa Depan Cerah
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Kenali Dirimu, Jaga Kesehatan Mentalmu
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Platform diagnosis mental health untuk mahasiswa Universitas Harkat Negeri. Lakukan evaluasi diri secara anonim dan rahasia untuk mendeteksi tingkat depresi Anda.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onStartDiagnosis}
                className="px-8 py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 transition-all transform hover:scale-105"
              >
                Mulai Diagnosis
              </button>
              <button
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Mental health support"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-900 text-white p-6 rounded-xl shadow-xl max-w-xs">
              <p className="font-semibold text-lg">
                "Kesehatan mental adalah fondasi untuk kehidupan yang bermakna."
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <Lock className="w-8 h-8 text-red-900 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Privasi Terjamin</h3>
            <p className="text-gray-600 text-sm">
              Data Anda 100% anonim dan terjaga kerahasiaannya dengan aman.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <AlertCircle className="w-8 h-8 text-red-900 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Diagnosis Akurat
            </h3>
            <p className="text-gray-600 text-sm">
              Sistem berbasis pakar dengan metode Certainty Factor yang terbukti.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <BarChart3 className="w-8 h-8 text-red-900 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Hasil Instan</h3>
            <p className="text-gray-600 text-sm">
              Dapatkan hasil diagnosis Anda langsung setelah menjawab kuesioner.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-red-900 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Export PDF</h3>
            <p className="text-gray-600 text-sm">
              Unduh hasil sebagai referensi untuk konsultasi profesional.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pilih Semester</h3>
              <p className="text-gray-600 text-sm">
                Masukkan semester Anda untuk keperluan statistik agregat.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Jawab Kuesioner
              </h3>
              <p className="text-gray-600 text-sm">
                Jawab 12 pertanyaan dengan jujur tentang gejala yang Anda rasakan.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dapatkan Hasil</h3>
              <p className="text-gray-600 text-sm">
                Sistem menghitung tingkat depresi Anda secara otomatis.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ambil Tindakan</h3>
              <p className="text-gray-600 text-sm">
                Terima rekomendasi dan rujukan ke profesional kesehatan mental.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-red-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memulai Perjalanan Kesehatan Mental Anda?
          </h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Diagnosis ini dirancang khusus untuk mahasiswa dengan dukungan dari pakar kesehatan mental. Data Anda aman dan akan membantu kami meningkatkan layanan.
          </p>
          <button
            onClick={onStartDiagnosis}
            className="px-8 py-3 bg-white text-red-900 rounded-lg font-semibold hover:bg-red-50 transition-colors"
          >
            Mulai Diagnosis Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
