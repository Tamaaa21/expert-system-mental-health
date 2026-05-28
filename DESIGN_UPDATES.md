# Design Updates & UI Improvements

Dokumentasi perubahan desain dan peningkatan UI/UX untuk platform diagnosis depresi.

## Design System Overview

### Color Palette

**Primary Colors (Red)**
- Primary-50: #fef2f2 (lightest)
- Primary-600: #dc2626 (brand color)
- Primary-700: #b91c1c (hover)
- Primary-800: #7f1d1d (active)

**Accent Colors (Green)**
- Accent-500: #22c55e
- Accent-600: #16a34a
- Accent-700-900: Dark variations

**Neutral Colors**
- Neutral-50: #fafafa (background)
- Neutral-600: #525252 (text)
- Neutral-900: #171717 (headings)

### Typography

**Font**: Inter (system-ui fallback)

**Sizes**:
- H1 (5xl): 3rem / line-height: 1
- H2 (4xl): 2.25rem / 2.5rem
- H3 (3xl): 1.875rem / 2.25rem
- Body (base): 1rem / 1.5rem
- Small (sm): 0.875rem / 1.25rem

**Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Spacing System

- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 2.5rem (40px)
- 2xl: 3rem (48px)

## Component Updates

### Navigation
**Before**: Simple gray navigation with red button
**After**:
- Glassmorphism effect (backdrop blur)
- Gradient background for logo
- Smooth hover transitions
- Better visual hierarchy
- Active state with background color

```tsx
// Gradient logo background
<div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl">
  <Heart className="text-white" />
</div>

// Active state styling
className={`${isActive ? 'text-primary-700 bg-primary-50' : 'text-neutral-600'}`}

// CTA button with gradient
className="bg-gradient-to-r from-primary-600 to-primary-700 hover:scale-105"
```

### Home Page
**Before**: Basic hero with static layout
**After**:
- Animated hero section (fade-in)
- Gradient text effect
- Staggered feature cards
- Modern statistics section with dark background
- Enhanced CTA with glassmorphism

```tsx
// Gradient text
<h1>Kenali Kesehatan <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Mentalmu</span></h1>

// Feature cards with hover effects
className="group hover:shadow-xl hover:-translate-y-1 transition-all"

// Dark section with absolute positioned elements
className="bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden"
```

### Diagnosis Page
**Before**: Simple form with basic styling
**After**:
- Progressive disclosure (2-step process)
- Animated progress bar
- Color-coded answer buttons (✓ Ya / ✗ Tidak)
- Better visual feedback
- Improved accessibility

```tsx
// Semester selection with gradient active state
className={`${semester === sem ? 'from-primary-600 to-primary-700 scale-105' : 'bg-neutral-100'}`}

// Question cards with numbered indicators
<span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white">{index + 1}</span>

// Answer buttons with checkmarks
<button className={`py-3 rounded-xl ${value ? '✓ Ya' : '✗ Tidak'}`} />
```

### Results Page
**Before**: Static result display
**After**:
- Animated score circle
- Color-coded severity levels
- Enhanced metrics display
- Modern card layouts
- Better recommendations presentation

```tsx
// Animated score display
<div className="animate-scale-in w-40 h-40 rounded-3xl flex items-center justify-center">

// Color-coded severity
const colors = {
  Ringan: { bg: 'bg-green-50', bar: 'bg-green-500' },
  Sedang: { bg: 'bg-yellow-50', bar: 'bg-yellow-500' },
  Berat: { bg: 'bg-red-50', bar: 'bg-red-500' }
}

// Numbered recommendations
<span className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full w-8 h-8">{index + 1}</span>
```

## Animations & Micro-interactions

### New Animations
- `fade-in`: 0.5s ease-in opacity transition
- `slide-up`: 0.5s ease-out slide + fade
- `scale-in`: 0.3s ease-out scale + fade
- `pulse-soft`: 3s infinite soft pulse

### Interactive Effects
- **Hover scale**: `hover:scale-105` for buttons/cards
- **Active scale**: `active:scale-95` for pressed buttons
- **Smooth transitions**: `transition-all` for all interactive elements
- **Transform feedback**: Buttons grow on hover, shrink on click

### Shadows & Depth
- Base shadow: `shadow-sm` (subtle)
- Hover shadow: `shadow-xl` (pronounced)
- Glow effect: `shadow-glow` (primary color)
- Card elevation: `shadow-lg` on containers

## Responsive Design

### Breakpoints
- Mobile-first (xs: default)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### Layout Patterns
- **Hero**: 1 column mobile → 2 columns desktop
- **Features**: 1 col → 2 cols → 4 cols
- **Steps**: 1 col → 2 cols → 4 cols
- **Buttons**: Full width mobile → inline desktop

## Accessibility Improvements

- ✓ Better color contrast (WCAG AA compliant)
- ✓ Semantic HTML elements
- ✓ Proper heading hierarchy
- ✓ Interactive elements have clear focus states
- ✓ Loading states with spinner indicators
- ✓ Error messages in accessible containers
- ✓ Forms with proper labels

## Performance Optimizations

### Bundle Size
- Tailwind CSS purging: ~90% unused styles removed
- Component code splitting: Per-route bundles
- Image lazy loading: Native with `<img />`
- CSS animations: GPU accelerated

### Load Times
- First Load JS: ~108KB (home)
- Shared JS: ~102KB
- Per-page overhead: 1-5KB
- Build time: 3.4 seconds

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

### CSS Features Used
- CSS Grid & Flexbox
- Gradient backgrounds
- Transform & transition
- Backdrop filter (glassmorphism)
- CSS animations

## Design Tokens Reference

### Rounded Corners
```
rounded-md: 0.5rem
rounded-lg: 0.75rem
rounded-xl: 1rem
rounded-2xl: 1.5rem
rounded-3xl: 2rem
```

### Shadow System
```
shadow-sm: subtle (0 1px 2px)
shadow-base: normal (0 1px 3px)
shadow-md: medium (0 4px 6px)
shadow-lg: large (0 10px 15px)
shadow-xl: extra large (0 20px 25px)
shadow-glow: primary glow effect
```

## Dark Mode (Future)

Current design uses light backgrounds. Dark mode implementation ready via:

```tsx
// In future: Add dark: variants
className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
```

## Design Resources

- **Figma**: Design system file (if available)
- **Tailwind Config**: `tailwind.config.js` - All tokens defined
- **Color Tools**: https://tailwindcss.com/docs/colors
- **Icons**: Lucide React (all used icons)

## Future Enhancements

1. **Dark Mode**: Full dark theme support
2. **Animations**: More page transitions
3. **Micro-interactions**: Loading skeleton screens
4. **Accessibility**: Screen reader optimization
5. **Mobile**: Swipe gestures for navigation
6. **Theming**: User-selectable color schemes
