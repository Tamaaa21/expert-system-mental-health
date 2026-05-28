import { Heart, Lock, CheckCircle, FileText, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6 hover:bg-primary-200 transition-colors">
                <Sparkles className="w-4 h-4 text-primary-700" />
                <span className="text-primary-700 font-semibold text-sm">Solusi kesehatan mental untuk mahasiswa</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Kenali Kesehatan <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Mentalmu</span>
              </h1>

              <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-lg">
                Platform diagnosis mental health yang aman, anonim, dan akurat. Dapatkan hasil instant dengan rekomendasi personalisasi dalam 5 menit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/diagnosis"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 active:scale-95"
                >
                  Mulai Diagnosis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/informasi"
                  className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:border-neutral-400 hover:bg-neutral-50 transition-all"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>

              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-neutral-600">100% Anonim</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-neutral-600">5 Menit Saja</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200/20 to-primary-100/20 rounded-3xl blur-2xl"></div>
              <img
                src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Mental health support"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white text-neutral-900 p-6 rounded-2xl shadow-2xl max-w-xs border border-neutral-100 backdrop-blur">
                <p className="font-semibold text-lg text-neutral-900">
                  "Kesehatan mental adalah kunci kesuksesan."
                </p>
                <p className="text-sm text-neutral-500 mt-2">- Universitas Harkat Negeri</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Fitur Unggulan</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Dirancang khusus untuk memberikan pengalaman terbaik</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'Privasi Terjamin', desc: 'Data 100% anonim, tanpa identifikasi pribadi' },
              { icon: CheckCircle, title: 'Diagnosis Akurat', desc: 'Berbasis pakar dengan metode Certainty Factor' },
              { icon: Sparkles, title: 'Hasil Instan', desc: 'Dapatkan hasil langsung setelah kuesioner' },
              { icon: FileText, title: 'Export PDF', desc: 'Unduh hasil untuk konsultasi profesional' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-neutral-100 hover:border-primary-200 transition-all hover:-translate-y-1 cursor-default"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-lg">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cara Kerjanya</h2>
            <p className="text-xl text-neutral-300">Proses diagnosis dalam 4 langkah mudah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Pilih Semester', desc: 'Masukkan semester untuk statistik' },
              { num: '2', title: 'Jawab Kuesioner', desc: '12 pertanyaan tentang gejala' },
              { num: '3', title: 'Dapatkan Hasil', desc: 'Sistem otomatis menghitung CF' },
              { num: '4', title: 'Ambil Tindakan', desc: 'Terima rekomendasi & rujukan' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-3xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
            </div>

            <div className="relative z-10">
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-4xl font-bold mb-4">Siap Memulai?</h2>
              <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Diagnosis ini dirancang khusus untuk mahasiswa Universitas Harkat Negeri. Hasil Anda aman dan membantu kami meningkatkan layanan kesehatan mental.
              </p>
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
              >
                Mulai Diagnosis Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
