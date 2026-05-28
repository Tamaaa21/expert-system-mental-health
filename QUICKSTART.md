# Quick Start Guide - Next.js Edition

## Setup (5 Menit)

### 1. Clone & Install
```bash
git clone <repository>
cd project
npm install
```

### 2. Configure Environment
Copy `.env.example` ke `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anonkey-here
```

### 3. Run Development Server
```bash
npm run dev
```

Buka http://localhost:3000 di browser.

## Struktur Project

```
app/                    # Pages
├── page.tsx           # Home
├── about/page.tsx
├── diagnosis/page.tsx
├── informasi/page.tsx
├── results/page.tsx
├── admin/page.tsx
└── layout.tsx         # Root layout

components/           # Reusable components
├── Navigation.tsx
└── Footer.tsx

lib/                  # Utilities
├── supabase.ts      # Supabase client
└── certaintyFactor.ts # CF calculation

public/              # Static assets
```

## Diagnosis Flow

1. **User mulai di Home** (`/`) - Landing page
2. **Klik "Mulai Diagnosis"** → navigasi ke `/diagnosis`
3. **Select Semester** → jawab 12 pertanyaan
4. **Submit** → calculate CF → redirect ke `/results`
5. **View Results** → export PDF atau back to home

## Key Features

### Anonymous Diagnosis
- Tidak ada user tracking
- Hanya semester yang disimpan
- Setiap diagnosis dapat dihapus secara manual dari DB

### Certainty Factor
- 12 gejala dengan expert weights (0.2 - 0.8)
- Kombinasi gejala menentukan severity level
- 3 kategori: Ringan, Sedang, Berat

### PDF Export
- Menggunakan html2pdf.js dari CDN
- Automatic download saat button diklik
- Format: diagnosis-hasil-YYYY-MM-DD.pdf

### Admin Dashboard
- Aggregated statistics per semester
- No personal data visible
- Real-time data dari Supabase

## Development

### Add New Page
```bash
mkdir -p app/new-page
touch app/new-page/page.tsx
```

```tsx
'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function NewPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 pb-12">
        {/* Content */}
      </main>
      <Footer />
    </>
  );
}
```

### Add Client Component
```tsx
'use client';

import { useState } from 'react';

export function MyComponent() {
  const [state, setState] = useState(null);
  
  return (
    // JSX
  );
}
```

### Database Queries
```tsx
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('symptoms')
  .select('*');
```

## Deployment

### Vercel (1-click)
1. Push ke GitHub
2. Go to https://vercel.com
3. Connect repository
4. Add environment variables
5. Deploy!

### Self-Hosted
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t diagnosis-app .
docker run -p 3000:3000 diagnosis-app
```

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
→ Check `.env.local` has correct env vars with `NEXT_PUBLIC_` prefix

### "Failed to fetch from Supabase"
→ Verify Supabase project is running
→ Check network tab in DevTools for CORS errors

### "Styling not working"
→ Tailwind config paths are correct in `tailwind.config.js`
→ Run `npm install` to ensure tailwindcss is installed

### "PDF export not working"
→ Check browser console for html2pdf.js CDN errors
→ Ensure html2pdf.js CDN is accessible: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/

## Performance Tips

- Images: Use Next.js Image component with width/height
- Bundle: Code is split automatically per route
- Caching: Static pages are cached, ISR available
- Monitoring: Check `npm run build` output for bundle size

## Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com
- Supabase: https://supabase.com/docs
- Lucide Icons: https://lucide.dev

## Contact & Support

- Universitas Harkat Negeri
- Phone: (0274) 1234-5678
- Email: support@uhn.ac.id
