import {
  BarChart3,
  Building2,
  FileText,
  Heart,
  Lock,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function About() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="bg-white rounded-[32px] border border-maroon-100/60 shadow-sm p-8 md:p-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-maroon-700 text-xs font-semibold tracking-[0.2em] mb-3">
                  TENTANG KAMI
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  Diagnosis Mental Healthy
                  <br />
                  untuk Mahasiswa UHN
                </h1>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Platform ini hadir sebagai bentuk kepedulian Universitas Harkat Negeri
                  terhadap kesehatan mental mahasiswa. Kami menyediakan layanan diagnosis
                  mandiri yang aman, mudah, dan berbasis ilmiah.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-maroon-50 text-maroon-800 text-sm font-semibold">
                    Terverifikasi Pakar
                  </span>
                  <span className="px-4 py-2 rounded-full bg-maroon-50 text-maroon-800 text-sm font-semibold">
                    100% Anonim
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3768140/pexels-photo-3768140.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="University campus"
                  className="w-full h-80 object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Vision Panel */}
          <div className="bg-maroon-800 text-white rounded-3xl p-10 md:p-12 mb-16 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Building2 className="w-10 h-10 mb-4" />
                <h2 className="text-xl font-bold mb-2">Visi</h2>
                <p className="text-maroon-100 text-sm leading-relaxed">
                  Menjadi platform kesehatan mental terdepan yang memberdayakan
                  mahasiswa untuk mencapai kesejahteraan mental yang optimal.
                </p>
              </div>
              <div>
                <Target className="w-10 h-10 mb-4" />
                <h2 className="text-xl font-bold mb-2">Misi</h2>
                <p className="text-maroon-100 text-sm leading-relaxed">
                  Menyediakan diagnosis mental health yang akurat, anonim, dan mudah
                  diakses untuk semua mahasiswa UHN.
                </p>
              </div>
              <div>
                <Users className="w-10 h-10 mb-4" />
                <h2 className="text-xl font-bold mb-2">Tujuan</h2>
                <p className="text-maroon-100 text-sm leading-relaxed">
                  Membantu mahasiswa mengenali kondisi mental, mengelola stres, dan
                  mendapatkan rujukan bantuan profesional.
                </p>
              </div>
            </div>
          </div>

          {/* Why Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-maroon-800 mb-6">
              Mengapa Kesehatan Mental Penting?
            </h2>
            <p className="text-gray-600 max-w-3xl mb-8">
              Kesehatan mental yang baik berpengaruh pada kemampuan belajar, relasi
              sosial, dan kualitas hidup secara keseluruhan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <Heart className="w-8 h-8 text-maroon-800 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Meningkatkan Konsentrasi</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <TrendingUp className="w-8 h-8 text-maroon-800 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Mengelola Stres</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <Lock className="w-8 h-8 text-maroon-800 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Membangun Relasi Positif</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <BarChart3 className="w-8 h-8 text-maroon-800 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Meraih Potensi Diri</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-maroon-800 mb-6">Fitur Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <FileText className="w-8 h-8 text-maroon-800 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Kuesioner Terstandar</h3>
                <p className="text-gray-600 text-sm">
                  Menggunakan instrumen yang valid dan reliabel.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <BarChart3 className="w-8 h-8 text-maroon-800 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Hasil & Insight</h3>
                <p className="text-gray-600 text-sm">
                  Analisis hasil yang mudah dipahami.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Heart className="w-8 h-8 text-maroon-800 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Rekomendasi Personal</h3>
                <p className="text-gray-600 text-sm">
                  Saran yang sesuai dengan kondisi Anda.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Lock className="w-8 h-8 text-maroon-800 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Rujukan Bantuan</h3>
                <p className="text-gray-600 text-sm">
                  Informasi layanan konseling dan profesional.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-maroon-800 text-white rounded-3xl p-10 md:p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Tim Pengembang</h2>
            <p className="text-maroon-100 max-w-2xl mx-auto mb-6">
              Platform ini dikembangkan oleh tim profesional yang berdedikasi untuk
              meningkatkan kesehatan mental mahasiswa.
            </p>
            <p className="text-maroon-200">
              Dukungan dari Departemen Kesehatan Mental & Bimbingan Konseling UHN
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
