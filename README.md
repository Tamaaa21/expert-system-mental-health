# Sistem Pakar Diagnosis Depresi Mahasiswa - Universitas Harkat Negeri

Platform berbasis web untuk diagnosis kesehatan mental mahasiswa menggunakan metode Certainty Factor, dirancang dengan privasi sebagai prioritas utama.

## Fitur Utama

- **Diagnosis Anonim**: Semua diagnosis disimpan tanpa identifikasi pribadi
- **Sistem Berbasis Pakar**: Menggunakan Certainty Factor dengan bobot pakar yang telah divalidasi
- **12 Gejala Terstruktur**: Pertanyaan biner yang mudah dipahami
- **Hasil Instan**: Diagnosis otomatis dengan tingkat keparahan
- **Export PDF**: Unduh hasil untuk referensi profesional
- **Admin Dashboard**: Statistik agregat per semester tanpa data pribadi

## Teknologi Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Lucide React Icons
- **Build Tool**: Vite
- **PDF Export**: html2pdf.js (CDN)

## Setup & Instalasi

### 1. Prerequisites
- Node.js 16+
- Akun Supabase
- Git

### 2. Clone dan Setup Project
```bash
git clone <repository>
cd project
npm install
```

### 3. Konfigurasi Environment
Buat file `.env.local` dengan template `.env.example`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Database Setup
Database dan migrasi sudah otomatis diterapkan. Tabel yang dibuat:
- `symptoms` - Master gejala dengan bobot pakar
- `diagnoses` - Hasil diagnosis (anonim)
- `diagnosis_answers` - Jawaban per gejala
- `statistics` - Data statistik agregat

### 5. Running Development Server
```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`

## Arsitektur Sistem

### User Journey
1. **Home**: Pengenalan platform dan CTA diagnosis
2. **About**: Informasi tentang platform dan tim
3. **Informasi**: Edukasi tentang depresi dan FAQ
4. **Diagnosis**: 
   - Pemilihan semester
   - Kuesioner 12 gejala (Ya/Tidak)
   - Pengiriman hasil
5. **Results**: 
   - Tampilan tingkat keparahan
   - Rekomendasi
   - Export PDF
6. **Admin Dashboard**: Statistik agregat per semester

### Logika Certainty Factor

Setiap gejala memiliki bobot pakar (expert weight):
- A001-A003: 0.2-0.3 (Gejala ringan)
- A004-A008: 0.4-0.5 (Gejala sedang)
- A009-A012: 0.6-0.8 (Gejala berat)

**Perhitungan**:
1. CF per gejala = expert_weight × user_answer (1 atau 0)
2. Total CF = Σ CF / max_possible_CF
3. Severity Score berdasarkan weighted symptoms:
   - Cognitive symptoms: weight 3x
   - Physical symptoms: weight 2x
   - Emotional symptoms: weight 1x

**Kategori Hasil**:
- **Ringan**: Score < 10
- **Sedang**: Score 10-20
- **Berat**: Score ≥ 20

## Database Schema

### Symptoms Table
```sql
CREATE TABLE symptoms (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) UNIQUE,
  statement TEXT,
  expert_weight DECIMAL(3, 2),
  category VARCHAR(20), -- emotional, physical, behavioral, cognitive
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Diagnoses Table
```sql
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester INT CHECK (1-8),
  total_cf DECIMAL(5, 4),
  severity_level VARCHAR(20),
  severity_score INT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Diagnosis Answers Table
```sql
CREATE TABLE diagnosis_answers (
  id UUID PRIMARY KEY,
  diagnosis_id UUID REFERENCES diagnoses,
  symptom_id INT REFERENCES symptoms,
  user_answer BOOLEAN,
  cf_value DECIMAL(5, 4),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Keamanan & Privasi

### Row Level Security (RLS)
- Semua tabel menggunakan RLS
- Diagnoses dapat diinsert oleh pengguna anonim
- Data tidak dapat diidentifikasi dengan individu tertentu

### Privacy Measures
- Tidak ada pengumpulan data pribadi
- Hanya semester yang disimpan untuk statistik
- Semua diagnosis sepenuhnya anonim
- GDPR compliant

## API & Komponen

### Core Components
```
src/
├── components/
│   └── Navigation.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Information.tsx
│   ├── Diagnosis.tsx
│   ├── Results.tsx
│   └── Admin.tsx
├── lib/
│   ├── supabase.ts (Client setup)
│   └── certaintyFactor.ts (CF logic)
└── App.tsx (Main container)
```

### Key Functions

#### `calculateCertaintyFactor(answers)`
Menghitung CF dari jawaban user.

**Input**: Array gejala dengan expert weight dan jawaban
**Output**: CF result dengan severity level dan score

#### `getSeverityDescription(level)`
Mendapatkan deskripsi dan rekomendasi berdasarkan level.

## Gejala & Bobot Pakar

| Kode | Gejala | Weight |
|------|--------|--------|
| A001 | Merasa sedih tiba-tiba | 0.3 |
| A002 | Merasa lelah meski tak aktivitas | 0.3 |
| A003 | Merasa tidak berharga | 0.2 |
| A004 | Kehilangan minat/motivasi | 0.4 |
| A005 | Sesak napas/dada | 0.5 |
| A006 | Kesulitan tidur | 0.5 |
| A007 | Perubahan nafsu makan | 0.6 |
| A008 | Lambat bergerak/berbicara | 0.4 |
| A009 | Tidak mampu merawat diri | 0.7 |
| A010 | Sulit konsentrasi/keputusan | 0.8 |
| A011 | Kesulitan kelola waktu/tugas | 0.8 |
| A012 | Halusinasi/pikiran tidak realistis | 0.6 |

## Admin Dashboard

Menampilkan:
- Total diagnosis
- Distribusi per tingkat keparahan
- Breakdown per semester
- Persentase setiap kategori
- Statistik agregat (NO personal data)

## PDF Export

Menggunakan html2pdf.js dari CDN untuk mengeksport hasil diagnosis ke PDF dengan:
- Informasi hasil
- Severity score
- Rekomendasi
- Timestamp
- Disclaimer

## Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Supabase
1. Setup Supabase project
2. Run migrations otomatis
3. Set environment variables

### Vercel/Netlify
```bash
npm run build
# Deploy dist/ folder
```

## Support & Resources

- **Platform FAQ**: /informasi
- **Konseling UHN**: (0274) 1234-5678
- **Email**: support@uhn.ac.id
- **Jam Operasional**: 08:00 - 17:00 WIB

## License

© 2024 Universitas Harkat Negeri. Semua hak cipta dilindungi.

## Disclaimer

Platform ini untuk penyaringan awal saja dan BUKAN pengganti diagnosis profesional. Jika mengalami gejala serius, segera konsultasi dengan profesional kesehatan mental.
