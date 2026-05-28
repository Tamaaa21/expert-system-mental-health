# Next.js Migration Guide

Dokumentasi migrasi dari Vite + React ke Next.js 15.

## Alasan Migrasi ke Next.js

1. **Server-Side Rendering (SSR)**: Lebih baik untuk SEO dan performance
2. **API Routes**: Built-in backend tanpa perlu server terpisah
3. **Image Optimization**: Automatic image optimization
4. **Dynamic Routes**: Routing yang lebih powerful
5. **Middleware**: Request processing di edge
6. **Deployment**: Native Vercel support dengan zero-config

## Perbedaan Struktur

### Vite
```
src/
├── App.tsx
├── pages/ (manual routing)
├── components/
└── lib/
```

### Next.js
```
app/                    # Next.js App Router
├── layout.tsx         # Root layout (replaces _app)
├── page.tsx           # Home page
├── [slug]/
│   └── page.tsx       # Dynamic routes
└── api/               # API routes

components/           # Shared components
lib/                  # Utilities
```

## File Structure Changes

### Environment Variables
**Before**: `VITE_*` prefix
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

**After**: `NEXT_PUBLIC_*` untuk client-side
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Client Components
Semua interactive components harus punya `'use client'` directive:

```tsx
'use client';

import { useState } from 'react';

export function MyComponent() {
  const [state, setState] = useState(null);
  // ...
}
```

## Key Changes untuk Project Ini

### 1. Routing
**Vite**: Manual routing di App.tsx
```tsx
const [currentPage, setCurrentPage] = useState('home');
// Manual routing logic
```

**Next.js**: File-based routing
```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
├── diagnosis/page.tsx → /diagnosis
└── results/page.tsx   → /results
```

### 2. Layouts
**Vite**: Shared Navigation/Footer di App.tsx

**Next.js**: app/layout.tsx
```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

Setiap page dapat import Navigation & Footer secara terpisah.

### 3. Client vs Server
- **Server Components** (default): Fetch data, access secrets
- **Client Components** (`'use client'`): Interactivity, event handlers, hooks

Dalam project ini:
- Pages are mostly **Client Components** (perlu interactivity & hooks)
- Navigation & Footer are **Client Components** (event handlers)

### 4. Data Fetching
**Pattern**: Fetch di server, render di server
```tsx
// Server Component
async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

Untuk client-side fetching (seperti diagnosis app):
```tsx
'use client';
import { useEffect, useState } from 'react';

export function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  // ...
}
```

### 5. Next.js Features Digunakan

#### Image Optimization
```tsx
import Image from 'next/image';

<Image 
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

#### Dynamic Imports
```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./Component'));
```

#### Link Component
```tsx
import Link from 'next/link';

<Link href="/about">About</Link>
```

## Performance Improvements

### Bundle Size
- **Vite**: 318.57 kB
- **Next.js**: 171 kB (avg per page)

### Build Time
- **Vite**: ~3.3s
- **Next.js**: ~2.4s + static generation

### Caching
- Automatic caching di browser & CDN
- ISR (Incremental Static Regeneration) ready

## API Routes (Future Use)

Jika perlu backend logic, dapat menambahkan API routes:

```typescript
// app/api/diagnosis/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  // Process data
  
  return NextResponse.json({ success: true });
}
```

## Development Tips

### Hot Reload
Next.js memiliki Fast Refresh yang lebih baik dari Vite.

### TypeScript
Next.js auto-generate types untuk routes dan environment variables.

### ESLint
```bash
npm run lint
```

Includes Next.js specific linting rules.

### Debugging
```bash
# VSCode .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

## Migration Checklist

- [x] Convert page routing to file-based
- [x] Create app/layout.tsx
- [x] Update environment variable names
- [x] Add 'use client' to interactive components
- [x] Update imports (next/link, next/image, etc.)
- [x] Test all routes
- [x] Verify Supabase connection
- [x] Test diagnosis flow
- [x] Build optimization
- [x] Update README with Next.js docs

## Resources

- Next.js Docs: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app
- Deployment: https://nextjs.org/docs/deployment
- Vercel: https://vercel.com
