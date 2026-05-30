export type CFResult = {
  totalCF: number;
  severityLevel: 'Ringan' | 'Sedang' | 'Berat';
  severityScore: number;
  confidence: number;
};

export function calculateCertaintyFactor(
  answers: { expertWeight: number; userAnswer: boolean }[]
): CFResult {

  const selectedCF = answers
    .filter((item) => item.userAnswer)
    .map((item) => item.expertWeight);

  let combinedCF = 0;

  if (selectedCF.length > 0) {
    combinedCF = selectedCF[0];

    for (let i = 1; i < selectedCF.length; i++) {
      combinedCF =
        combinedCF +
        selectedCF[i] * (1 - combinedCF);
    }
  }

  const emotionalSymptoms = answers
    .slice(0, 3)
    .filter((a) => a.userAnswer).length;

  const physicalSymptoms = answers
    .slice(1, 9)
    .filter((a) => a.userAnswer).length;

  const cognitiveSymptoms = answers
    .slice(8, 12)
    .filter((a) => a.userAnswer).length;

  const emotionalWeight = emotionalSymptoms * 1;
  const physicalWeight = physicalSymptoms * 2;
  const cognitiveWeight = cognitiveSymptoms * 3;

  const totalWeight =
    emotionalWeight +
    physicalWeight +
    cognitiveWeight;

  let severityLevel: 'Ringan' | 'Sedang' | 'Berat';
  let severityScore: number;

  if (totalWeight >= 20) {
    severityLevel = 'Berat';
  } else if (totalWeight >= 10) {
    severityLevel = 'Sedang';
  } else {
    severityLevel = 'Ringan';
  }

  severityScore = Math.min(
    100,
    Math.round((totalWeight / 30) * 100)
  );

  return {
    totalCF: combinedCF,
    severityLevel,
    severityScore,
    confidence: Math.round(combinedCF * 100),
  };
}
export function getSeverityDescription(level: string): {
  title: string;
  description: string;
  recommendations: string[];
} {
  const descriptions = {
    Ringan: {
      title: 'Depresi Ringan (Mild Depression)',
      description:
        'Anda menunjukkan gejala-gejala awal depresi yang masih dapat dikelola. Meskipun masih dapat beraktivitas, disarankan untuk lebih memperhatikan kesehatan mental Anda.',
      recommendations: [
        'Lakukan aktivitas fisik secara rutin (minimal 30 menit per hari)',
        'Jaga pola tidur yang teratur',
        'Cari dukungan dari teman atau keluarga',
        'Pertimbangkan untuk berkonsultasi dengan profesional kesehatan mental',
        'Praktikkan teknik relaksasi atau mindfulness',
      ],
    },

    Sedang: {
      title: 'Depresi Sedang (Moderate Depression)',
      description:
        'Anda menunjukkan gejala-gejala depresi yangc mulai mengganggu fungsi sosial dan akademik. Disarankan untuk segera mencari bantuan profesional.',
      recommendations: [
        'Segera konsultasi dengan psikolog atau psikiater',
        'Kurangi beban akademik jika memungkinkan',
        'Tingkatkan interaksi sosial yang positif',
        'Jaga kesehatan fisik dengan olahraga dan nutrisi baik',
        'Hindari penggunaan alkohol atau zat terlarang',
      ],
    },

    Berat: {
      title: 'Depresi Berat (Severe Depression)',
      description:
        'Anda menunjukkan gejala-gejala depresi yang serius dan memerlukan penanganan medis atau psikologis segera. Segera hubungi profesional kesehatan.',
      recommendations: [
        'Segera konsultasi dengan psikiater untuk evaluasi dan pengobatan',
        'Pertimbangkan terapi obat-obatan jika direkomendasikan',
        'Hubungi layanan kesehatan mental darurat jika ada pikiran untuk menyakiti diri',
        'Beritahu keluarga atau teman terdekat tentang kondisi Anda',
        'Tetap dalam komunikasi reguler dengan profesional kesehatan',
      ],
    },
  };

  return (
    descriptions[level as keyof typeof descriptions] ||
    descriptions.Ringan
  );
}