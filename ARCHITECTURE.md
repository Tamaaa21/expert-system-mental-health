# Architecture Documentation

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Frontend                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages (6 routes)                                     │   │
│  │ • Home (/): Landing dengan CTA                       │   │
│  │ • About (/about): Info tentang platform              │   │
│  │ • Informasi (/informasi): Edukasi kesehatan mental   │   │
│  │ • Diagnosis (/diagnosis): Kuesioner 12 gejala        │   │
│  │ • Results (/results): Hasil & PDF export             │   │
│  │ • Admin (/admin): Dashboard statistik                │   │
│  └──────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Shared Components                                    │   │
│  │ • Navigation: Header dengan links & logo             │   │
│  │ • Footer: Contact info & social                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Libraries                                            │   │
│  │ • supabase.ts: Client initialization & types         │   │
│  │ • certaintyFactor.ts: CF calculation logic           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                        ↓ (HTTP)
┌─────────────────────────────────────────────────────────────┐
│              Supabase Backend (PostgreSQL)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Database Tables                                      │   │
│  │ • symptoms: Master 12 gejala + bobot pakar           │   │
│  │ • diagnoses: Hasil diagnosis (anonymous)             │   │
│  │ • diagnosis_answers: Jawaban per gejala              │   │
│  │ • statistics: Agregat data per semester              │   │
│  └──────────────────────────────────────────────────────┘   │
│                        ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Row Level Security (RLS)                             │   │
│  │ • Diagnoses: Append-only untuk anonimitas            │   │
│  │ • Answers: Readable untuk statistics                 │   │
│  │ • Symptoms: Public read                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: Diagnosis Process

```
User
  ↓
[Home Page] - Marketing & CTA
  ↓
[Diagnosis Page - Step 1] - Select Semester (1-8+)
  ↓
[Diagnosis Page - Step 2] - Kuesioner 12 Gejala
  ├─ Answer 1 (Ya/Tidak) → stored in state
  ├─ Answer 2 (Ya/Tidak) → stored in state
  └─ Answer 12 (Ya/Tidak) → stored in state
  ↓
[Submit] - Create diagnosis record
  ├─ INSERT into diagnoses (semester, initial data)
  ├─ INSERT into diagnosis_answers (12 rows)
  └─ Calculate CF locally
  ↓
[Calculate Certainty Factor]
  ├─ For each symptom: CF = expertWeight × userAnswer
  ├─ Normalize: totalCF / maxPossibleCF
  ├─ Determine severity based on weighted symptoms
  └─ Return: { totalCF, severityLevel, severityScore, confidence }
  ↓
[Update diagnosis] - Store final results
  └─ UPDATE diagnoses SET (total_cf, severity_level, severity_score)
  ↓
[Results Page] - Display hasil
  ├─ Show severity badge & score
  ├─ Display metrics & recommendations
  └─ PDF export button
  ↓
[User Action]
  ├─ Export to PDF
  └─ Back to Home
```

## Certainty Factor Calculation

### Formula
```
CF_symptom = expertWeight × userAnswer (1 atau 0)
totalCF = Σ CF_symptom / maxPossible_CF
```

### Expert Weights (Divalidasi Pakar)
```
Emotional Symptoms (ringan - 0.2 to 0.3):
  A001: Merasa sedih tiba-tiba = 0.3
  A002: Merasa lelah = 0.3
  A003: Merasa tidak berharga = 0.2

Behavioral Symptoms (sedang - 0.4 to 0.5):
  A004: Kehilangan minat = 0.4
  A005: Sesak napas = 0.5
  A006: Kesulitan tidur = 0.5

Physical & Cognitive Symptoms (berat - 0.6 to 0.8):
  A007: Perubahan nafsu makan = 0.6
  A008: Lambat bergerak = 0.4
  A009: Tidak mampu merawat diri = 0.7
  A010: Sulit konsentrasi = 0.8
  A011: Kesulitan kelola waktu = 0.8
  A012: Halusinasi = 0.6
```

### Severity Scoring
```
Weighted Symptoms:
  cognitiveWeight = count(cognitive_yes) × 3
  physicalWeight = count(physical_yes) × 2
  emotionalWeight = count(emotional_yes) × 1
  totalWeight = cognitiveWeight + physicalWeight + emotionalWeight

Severity Levels:
  ≥ 20: BERAT   (Severe - immediate professional help)
  10-19: SEDANG (Moderate - consult professional soon)
  < 10: RINGAN  (Mild - monitor & practice self-care)

severityScore = min(100, (totalWeight / 30) × 100)
```

## User Privacy & Security

### Data Minimization
```
Stored:
  ✓ semester (1-8+)
  ✓ symptom_id, user_answer, cf_value
  ✓ total_cf, severity_level, severity_score
  ✓ created_at timestamp

NOT Stored:
  ✗ Name, email, ID
  ✗ IP address
  ✗ User session ID
  ✗ Any identifying information
```

### Anonymous Design
```
Session Storage Flow:
  1. User answers questions
  2. Data stored in browser localStorage temporarily
  3. Sent to Supabase without user ID
  4. Saved with UUID (not linked to user)
  5. LocalStorage cleared after submission
```

### Row Level Security (RLS) Policies
```sql
-- Diagnoses table
INSERT: Allow anonymous users (anonimitas)
SELECT: Allow for statistics only
UPDATE: Not allowed (append-only)
DELETE: Not allowed (preserve history)

-- Diagnosis_answers table
INSERT: Allow anonymous users
SELECT: Allow for aggregation
UPDATE/DELETE: Not allowed

-- Symptoms table
SELECT: Public read (education)
INSERT/UPDATE/DELETE: Admin only
```

## Admin Dashboard Statistics

```
Metrics Displayed:
  ├─ Total Diagnoses (across all semesters)
  ├─ Distribution by Severity (Ringan, Sedang, Berat)
  ├─ Per-Semester Breakdown
  │  ├─ Total per semester
  │  ├─ Breakdown by severity
  │  └─ Percentage distribution
  └─ Charts & Visualizations

Query Example:
  SELECT 
    semester,
    severity_level,
    COUNT(*) as count,
    AVG(total_cf) as avg_cf
  FROM diagnoses
  GROUP BY semester, severity_level
  ORDER BY semester;
```

## Component Structure

### Pages (Server/Client Mix)
```tsx
// About, Home: Mix of server-side and SSG
// Diagnosis, Results, Admin: Client components
//   - State management (answers, results)
//   - Event handlers (onClick, onChange)
//   - Effects (fetch symptoms)
//   - Browser APIs (localStorage, window.html2pdf)
```

### Shared Components
```tsx
Navigation.tsx
  ├─ Fixed position header
  ├─ Uses usePathname for active link detection
  ├─ Links to all pages
  └─ Logo & university branding

Footer.tsx
  ├─ Contact information
  ├─ Quick links
  ├─ Social media
  └─ Copyright notice
```

### Utilities
```typescript
supabase.ts
  ├─ Initialize Supabase client
  ├─ Export TypeScript types
  ├─ Handle environment variables
  └─ Connection pooling

certaintyFactor.ts
  ├─ calculateCertaintyFactor(answers)
  ├─ getSeverityDescription(level)
  ├─ Pure functions (no external dependencies)
  └─ Testable logic
```

## Performance Optimization

### Next.js Built-in
```
• Automatic code splitting per route
• Image optimization (via <Image>)
• CSS minification & inlining critical CSS
• JavaScript minification
• Static generation for static pages
• Caching headers
```

### Current Bundle Size
```
Route                Size (First Load)
/                    108 kB
/about               108 kB
/informasi           110 kB
/diagnosis           171 kB
/results             110 kB
/admin               170 kB

Shared JS            102 kB
```

### Improvements Made
```
✓ Dynamic import untuk external libs (html2pdf)
✓ Tailwind CSS purging (unused styles removed)
✓ Component-level code splitting
✓ Image lazy loading
✓ Static generation where possible
```

## Deployment Architecture

### Development
```
npm run dev
→ Next.js dev server (http://localhost:3000)
→ Hot reload on file changes
→ Source maps for debugging
```

### Production (Vercel Recommended)
```
Push to GitHub
→ Vercel webhook triggered
→ npm run build
→ .next/ folder uploaded
→ Serverless functions deployed
→ Global CDN caching
→ Zero-downtime deployments
```

### Self-Hosted
```
npm run build
→ Build to .next/
→ npm start
→ Node.js server (port 3000)
→ Manual caching/reverse proxy setup
```

## Monitoring & Analytics

### Current Logging
```
Browser Console:
  • Supabase query errors
  • PDF export errors
  • Data fetch failures

Production Monitoring (Available):
  • Vercel Analytics
  • Sentry error tracking
  • Custom event tracking
```

### Recommended Additions
```
• Page view analytics
• Diagnosis completion tracking
• Error rate monitoring
• Performance metrics
• Database query logging
```

## Future Enhancements

```
Phase 2:
  ├─ Email notifications for severe cases
  ├─ Scheduled reminders
  ├─ Historical tracking (with privacy)
  └─ Multi-language support

Phase 3:
  ├─ AI-powered symptom suggestions
  ├─ Specialist referral system
  ├─ Integration with counseling booking
  └─ Mobile app (React Native)

Phase 4:
  ├─ Real-time crisis support
  ├─ Peer support groups
  ├─ Integration with hospital systems
  └─ Longitudinal study data
```

## Compliance & Standards

### Privacy
```
✓ GDPR-compliant (no personal data)
✓ CCPA-compliant (anonymous by design)
✓ Indonesia's Privacy Law compliant
```

### Security
```
✓ HTTPS only
✓ Supabase RLS enforcement
✓ No credentials in frontend code
✓ Environment variables for secrets
✓ SQL injection prevention via Supabase
✓ XSS protection via React
```

### Accessibility
```
✓ Semantic HTML
✓ Proper heading hierarchy
✓ Alt text for images
✓ Keyboard navigation support
✓ WCAG 2.1 AA compliant (goal)
```

## Testing Strategy

### Unit Tests
```
• certaintyFactor.ts calculations
• Severity level determination
• Edge cases (0 symptoms, all yes, etc.)
```

### Integration Tests
```
• Diagnosis flow end-to-end
• Supabase data persistence
• PDF export functionality
```

### Manual Testing Checklist
```
□ Semester selection works
□ All 12 questions can be answered
□ Results display correctly
□ Severity level matches calculation
□ PDF exports successfully
□ Admin dashboard shows data
□ Navigation works between pages
□ Mobile responsive
□ No console errors
```
