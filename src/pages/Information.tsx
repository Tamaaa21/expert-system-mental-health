import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

export function Information() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: 'Apa itu depresi?',
      answer:
        'Depresi adalah gangguan mood yang ditandai dengan perasaan sedih yang persisten, kehilangan minat, dan penurunan energi. Ini berbeda dari kesedihan biasa karena berdampak signifikan pada fungsi sehari-hari.',
    },
    {
      question: 'Bagaimana cara kerja sistem diagnosis ini?',
      answer:
        'Sistem menggunakan metode Certainty Factor yang mengalikan bobot pakar dengan jawaban Anda. Setiap gejala memiliki tingkat kepastian berbeda berdasarkan validasi pakar kesehatan mental.',
    },
    {
      question: 'Apakah data saya benar-benar anonim?',
      answer:
        'Ya, sepenuhnya. Sistem kami tidak mengumpulkan informasi pribadi apapun. Data yang disimpan hanya semester Anda untuk statistik agregat, tanpa identifikasi pribadi.',
    },
    {
      question: 'Bagaimana cara menggunakan platform ini?',
      answer:
        'Cukup pilih semester Anda, lalu jawab 12 pertanyaan dengan jujur tentang gejala yang Anda rasakan. Sistem akan secara otomatis menghitung hasil dan memberikan rekomendasi.',
    },
    {
      question: 'Apa yang dimaksud dengan tingkat keparahan depresi?',
      answer:
        'Tingkat keparahan dibagi menjadi 3 kategori: Ringan (gejala awal), Sedang (mulai mengganggu fungsi), dan Berat (memerlukan penanganan segera).',
    },
    {
      question: 'Bagaimana jika saya mendapatkan hasil Depresi Berat?',
      answer:
        'Jika Anda mendapatkan hasil Depresi Berat, sangat disarankan untuk segera berkonsultasi dengan psikiater atau profesional kesehatan mental. Anda juga dapat menghubungi layanan kesehatan darurat jika ada pikiran untuk menyakiti diri.',
    },
    {
      question: 'Dapatkah saya mengekspor hasil saya?',
      answer:
        'Ya, hasil diagnosis Anda dapat diunduh sebagai file PDF yang dapat Anda bawa saat berkonsultasi dengan profesional kesehatan mental.',
    },
    {
      question: 'Bisakah saya mengulangi diagnosis?',
      answer:
        'Ya, Anda dapat mengulangi diagnosis kapan saja. Setiap diagnosis disimpan secara terpisah untuk membantu Anda melacak perubahan seiring waktu.',
    },
  ];

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Informasi & Edukasi
          </h1>
          <p className="text-lg text-gray-600">
            Pelajari lebih lanjut tentang depresi dan kesehatan mental
          </p>
        </div>

        {/* Mental Health Info */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Depresi: Tanda dan Gejala
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-900 rounded-full"></span>
                Gejala Emosional
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Kesedihan yang persisten</li>
                <li>• Merasa tidak berharga</li>
                <li>• Kecemasan berlebihan</li>
                <li>• Mudah tersinggung</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-900 rounded-full"></span>
                Gejala Fisik
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Kelelahan ekstrem</li>
                <li>• Gangguan tidur</li>
                <li>• Perubahan nafsu makan</li>
                <li>• Nyeri tubuh</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-900 rounded-full"></span>
                Gejala Perilaku
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Menarik diri secara sosial</li>
                <li>• Sulit berkonsentrasi</li>
                <li>• Kehilangan minat hobi</li>
                <li>• Produktivitas menurun</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Self Care Tips */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips Perawatan Diri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-red-900 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">Olahraga Teratur</h4>
              <p className="text-gray-600 text-sm">
                Olahraga 30 menit sehari dapat meningkatkan mood dan mengurangi gejala depresi.
              </p>
            </div>

            <div className="border-l-4 border-red-900 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">Tidur Berkualitas</h4>
              <p className="text-gray-600 text-sm">
                Pertahankan jadwal tidur yang teratur (7-9 jam) untuk kesehatan mental yang lebih baik.
              </p>
            </div>

            <div className="border-l-4 border-red-900 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">
                Nutrisi Seimbang
              </h4>
              <p className="text-gray-600 text-sm">
                Makan makanan bergizi yang kaya akan omega-3 dan vitamin B untuk mendukung fungsi otak.
              </p>
            </div>

            <div className="border-l-4 border-red-900 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">Mindfulness</h4>
              <p className="text-gray-600 text-sm">
                Praktikkan meditasi atau mindfulness untuk mengurangi stres dan kecemasan.
              </p>
            </div>

            <div className="border-l-4 border-red-900 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">Hubungan Sosial</h4>
              <p className="text-gray-600 text-sm">
                Jaga hubungan dengan teman dan keluarga untuk dukungan emosional yang penting.
              </p>
            </div>

            <div className="border-l-4 border-red-900 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">
                Hindari Zat Berbahaya
              </h4>
              <p className="text-gray-600 text-sm">
                Hindari alkohol dan zat terlarang yang dapat memperburuk depresi.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-left">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expanded === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expanded === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mt-12 bg-red-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Butuh Bantuan?</h2>
          <p className="mb-6 text-red-100">
            Jika Anda mengalami krisis kesehatan mental, hubungi layanan konseling kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1500123"
              className="px-6 py-3 bg-white text-red-900 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Hubungi Layanan Konseling
            </a>
            <a
              href="mailto:support@uhn.ac.id"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-red-800 transition-colors"
            >
              Email Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
