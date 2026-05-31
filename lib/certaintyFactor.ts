export type SymptomAnswer = {
  symptomId: number;
  code: string;
  userAnswer: boolean;
  expertWeight: number;
};

export type CFResult = {
  totalCF: number;
  severityLevel: 'Normal' | 'Ringan' | 'Sedang' | 'Berat';
  severityScore: number;
  confidence: number;
};

const RULES = {
  Ringan: ['A001', 'A002', 'A003', 'A004'],
  Sedang: ['A005', 'A006', 'A007', 'A008'],
  Berat: ['A009', 'A010', 'A011', 'A012'],
};

function combineCF(cfOld: number, cfNew: number): number {
  return cfOld + cfNew * (1 - cfOld);
}

function calculateLevelCF(
  answers: SymptomAnswer[],
  codes: string[]
): number {
  const selectedSymptoms = answers
    .filter(
      (answer) =>
        answer.userAnswer &&
        codes.includes(answer.code)
    )
    .map((answer) => answer.expertWeight);

  if (selectedSymptoms.length === 0) {
    return 0;
  }

  let cf = selectedSymptoms[0];

  for (let i = 1; i < selectedSymptoms.length; i++) {
    cf = combineCF(cf, selectedSymptoms[i]);
  }

  return cf;
}

export function calculateCertaintyFactor(
  answers: SymptomAnswer[]
): CFResult {

  const ringanCF = calculateLevelCF(
    answers,
    RULES.Ringan
  );

  const sedangCF = calculateLevelCF(
    answers,
    RULES.Sedang
  );

  const beratCF = calculateLevelCF(
    answers,
    RULES.Berat
  );

  const results = [
    {
      level: 'Ringan' as const,
      cf: ringanCF,
    },
    {
      level: 'Sedang' as const,
      cf: sedangCF,
    },
    {
      level: 'Berat' as const,
      cf: beratCF,
    },
  ];

  const highestResult = results.reduce(
    (prev, current) =>
      current.cf > prev.cf ? current : prev
  );

  if (highestResult.cf === 0) {
    return {
      totalCF: 0,
      severityLevel: 'Normal',
      severityScore: 0,
      confidence: 0,
    };
  }

  const percentage = Number(
    (highestResult.cf * 100).toFixed(2)
  );

  return {
    totalCF: highestResult.cf,
    severityLevel: highestResult.level,
    severityScore: percentage,
    confidence: percentage,
  };
}

export function getSeverityDescription(level: string) {
  const descriptions = {
    Normal: {
      title: 'Kondisi Normal',
      description:
        'Tidak ditemukan gejala depresi yang signifikan.',
      recommendations: [
        'Tetap menjaga kesehatan mental.',
        'Lakukan aktivitas positif secara rutin.',
      ],
    },

    Ringan: {
      title: 'Depresi Ringan',
      description:
        'Terdapat gejala emosional awal yang perlu diperhatikan.',
      recommendations: [
        'Istirahat yang cukup',
        'Olahraga secara rutin',
        'Kelola stres dengan baik',
        'Bercerita kepada orang terpercaya',
      ],
    },

    Sedang: {
      title: 'Depresi Sedang',
      description:
        'Gejala mulai memengaruhi aktivitas sehari-hari.',
      recommendations: [
        'Konsultasi dengan konselor kampus',
        'Perbaiki pola tidur',
        'Kurangi tekanan akademik berlebih',
        'Perlu dukungan sosial yang baik',
      ],
    },

    Berat: {
      title: 'Depresi Berat',
      description:
        'Gejala yang muncul membutuhkan perhatian profesional.',
      recommendations: [
        'Segera konsultasi ke psikolog',
        'Pertimbangkan konsultasi psikiater',
        'Hubungi keluarga atau teman dekat',
        'Cari bantuan profesional sesegera mungkin',
      ],
    },
  };

  return (
    descriptions[level as keyof typeof descriptions] ??
    descriptions.Normal
  );
}