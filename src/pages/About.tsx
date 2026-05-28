import { Building2, Users, Target } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform diagnosis mental health untuk mahasiswa Universitas Harkat Negeri
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src="https://images.pexels.com/photos/3768140/pexels-photo-3768140.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="University campus"
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Building2 className="w-10 h-10 text-red-900 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-3">Visi</h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi platform kesehatan mental terdepan yang memberdayakan mahasiswa untuk mencapai kesejahteraan mental yang optimal.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Target className="w-10 h-10 text-red-900 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-3">Misi</h2>
            <p className="text-gray-600 leading-relaxed">
              Menyediakan diagnosis mental health yang akurat, anonim, dan mudah diakses untuk semua mahasiswa UHN.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Users className="w-10 h-10 text-red-900 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-3">Nilai</h2>
            <p className="text-gray-600 leading-relaxed">
              Privasi, akurasi, aksesibilitas, dan dedikasi terhadap kesejahteraan mental mahasiswa.
            </p>
          </div>
        </div>

        {/* Background */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latar Belakang</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Kesehatan mental adalah isu kritis yang dihadapi oleh komunitas mahasiswa modern. Studi menunjukkan bahwa prevalensi depresi di kalangan mahasiswa terus meningkat, dengan banyak yang tidak mencari bantuan karena stigma atau kurangnya kesadaran.
            </p>
            <p>
              Universitas Harkat Negeri berkomitmen untuk mendukung kesehatan mental mahasiswa melalui teknologi dan inovasi. Platform diagnosis ini dirancang khusus untuk memberikan cara yang mudah, aman, dan anonim bagi mahasiswa untuk mengevaluasi kesehatan mental mereka.
            </p>
            <p>
              Sistem berbasis Certainty Factor ini telah dikembangkan bersama dengan pakar kesehatan mental dan menggunakan basis pengetahuan yang telah divalidasi untuk memberikan diagnosis yang akurat dan dapat dipercaya.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Tim Pengembang</h2>
          <p className="text-red-100 max-w-2xl mx-auto mb-8">
            Platform ini dikembangkan oleh tim profesional yang berdedikasi untuk meningkatkan kesehatan mental mahasiswa.
          </p>
          <p className="text-red-200">
            Dukungan dari Departemen Kesehatan Mental & Bimbingan Konseling UHN
          </p>
        </div>
      </div>
    </div>
  );
}
