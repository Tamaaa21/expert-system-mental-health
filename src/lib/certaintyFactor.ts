export type CFResult = {
  totalCF: number;
  severityLevel: 'Ringan' | 'Sedang' | 'Berat';
  severityScore: number;
  confidence: number;
};

export function calculateCertaintyFactor(
  answers: { expertWeight: number; userAnswer: boolean }[]
): CFResult {
  const cfValues = answers.map((item) =>
    item.userAnswer ? item.expertWeight : 0
  );

  const totalCF = cfValues.reduce((sum, cf) => sum + cf, 0);
  const maxPossibleCF = answers.length * 1; // Each symptom weight is max 1
  const normalizedCF = answers.length > 0 ? totalCF / maxPossibleCF : 0;

  // Weighted scoring based on severity levels
  const emotionalSymptoms = answers
    .slice(0, 3)
    .filter((a) => a.userAnswer).length;
  const physicalSymptoms = answers
    .slice(1, 9)
    .filter((a) => a.userAnswer).length;
  const cognitiveSymptoms = answers
    .slice(8, 12)
    .filter((a) => a.userAnswer).length;

  let severityLevel: 'Ringan' | 'Sedang' | 'Berat';
  let severityScore: number;

  const cognitiveWeight = cognitiveSymptoms * 3;
  const physicalWeight = physicalSymptoms * 2;
  const emotionalWeight = emotionalSymptoms * 1;

  const totalWeight = cognitiveWeight + physicalWeight + emotionalWeight;

  if (totalWeight >= 20) {
    severityLevel = 'Berat';
    severityScore = Math.min(100, Math.round((totalWeight / 30) * 100));
  } else if (totalWeight >= 10) {
    severityLevel = 'Sedang';
    severityScore = Math.min(100, Math.round((totalWeight / 30) * 100));
  } else {
    severityLevel = 'Ringan';
    severityScore = Math.min(100, Math.round((totalWeight / 30) * 100));
  }

  return {
    totalCF: Math.round(normalizedCF * 10000) / 10000,
    severityLevel,
    severityScore,
    confidence: Math.round(normalizedCF * 100),
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
        'Anda menunjukkan gejala-gejala depresi yang mulai mengganggu fungsi sosial dan akademik. Disarankan untuk segera mencari bantuan profesional.',
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
    descriptions[level as keyof typeof descriptions] || descriptions['Ringan']
  );
}
