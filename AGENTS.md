# AGENTS.md - Developer Guide for Software Engineer Portfolio

This document provides guidelines for AI coding agents working in this Next.js portfolio codebase.

## Build & Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint (note: eslint not installed, will fail)

# Type Checking
npx tsc --noEmit        # Check TypeScript types without emitting files
```

**Note:** This project does not have test infrastructure. Verify changes by running `npm run build` and checking the dev server.

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animation**: Framer Motion 12.29.2
- **i18n**: next-intl 4.8.0 (pt, en, es)
- **Icons**: Lucide React 0.454.0
- **Form Handling**: React Hook Form + Zod

## Project Structure

```
app/[locale]/          # App Router pages (Server Components by default)
components/            # React components
  ui/                  # Reusable UI components (shadcn/ui)
  *-section.tsx        # Page sections (Client Components)
contexts/              # React Context providers
lib/                   # Utility functions
messages/              # i18n JSON files (pt.json, en.json, es.json)
public/                # Static assets
```

## Code Style Guidelines

### 1. File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `hero-section.tsx`, `bento-card.tsx`)
- **Component Names**: `PascalCase` (e.g., `HeroSection`, `BentoCard`)
- **Utilities**: `kebab-case.ts` (e.g., `utils.ts`)
- **Contexts**: `kebab-case-context.tsx` (e.g., `expandable-context.tsx`)

### 2. Import Order

Always order imports in this sequence:

```typescript
'use client'; // If client component (ALWAYS FIRST LINE)

// 1. React/Next.js core
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

// 3. i18n
import { useTranslations } from 'next-intl';

// 4. UI components
import { Button } from '@/components/ui/button';

// 5. Custom components
import { HeroSection } from '@/components/hero-section';

// 6. Contexts
import { useProjects } from '@/contexts/expandable-context';

// 7. Utils
import { cn } from '@/lib/utils';
```

**Rules:**
- ALWAYS use `@/` path alias, never relative imports (`../`)
- Group similar imports together
- Single quotes for strings

### 3. TypeScript

```typescript
// Interface naming: Descriptive + "Props" suffix
interface BentoCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

// Exported types use "Type" suffix or descriptive names
export interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
}

// Component typing
export function BentoCard({ children, className }: BentoCardProps) {
  // ...
}

// Event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
};

// Refs
const canvasRef = useRef<HTMLCanvasElement>(null);
```

**Rules:**
- Enable `strict` mode (tsconfig.json)
- Explicitly type component props
- Use `ReactNode` for children
- Use `React.ComponentProps<'element'>` for extending HTML elements

### 4. Component Structure

```typescript
'use client'; // If needed

import { ... } from '...';

// 1. Type definitions
interface MyComponentProps {
  // ...
}

// 2. Component export
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 3. Hooks (always at top)
  const t = useTranslations('namespace');
  const [state, setState] = useState(false);
  
  // 4. Variables/constants
  const computedValue = useMemo(() => ..., []);
  
  // 5. Event handlers
  const handleClick = useCallback(() => {
    // ...
  }, []);
  
  // 6. Effects
  useEffect(() => {
    // ...
    return () => cleanup();
  }, []);
  
  // 7. JSX return
  return (
    <div className="...">
      {/* Descriptive comments for sections */}
    </div>
  );
}
```

### 5. Styling with Tailwind

```typescript
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

className={cn(
  "base classes here",
  condition && "conditional classes",
  className // Allow prop override
)}

// Responsive breakpoints (mobile-first)
className="text-sm sm:text-base md:text-lg lg:text-xl"

// Opacity modifiers for colors
className="bg-primary/20 hover:bg-primary/30"
className="border-white/10"

// Group hover states
<div className="group">
  <span className="opacity-0 group-hover:opacity-100" />
</div>
```

**Rules:**
- Mobile-first: base classes for mobile, `sm:`, `md:`, `lg:`, `xl:` for larger screens
- Use semantic color tokens: `primary`, `secondary`, `muted-foreground`, `border`
- Prefer Tailwind classes over custom CSS
- Use `cn()` for all dynamic className generation

### 6. Animations with Framer Motion

```typescript
// Entrance animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>

// Staggered animations
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
  />
))}

// Layout animations (for shared elements)
<motion.div layoutId="unique-id" />

// Exit animations
<AnimatePresence>
  {show && (
    <motion.div exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
```

### 7. Internationalization (i18n)

```typescript
// In component
const t = useTranslations('namespace'); // e.g., 'hero', 'about', 'projects'

// Usage
{t('key')}
{t('nested.key')}
{t(`dynamic${index + 1}.field`)} // For arrays

// Locale detection
import { useLocale } from 'next-intl';
const locale = useLocale(); // 'pt' | 'en' | 'es'
```

**Rules:**
- Always add translations to ALL locale files: `messages/pt.json`, `messages/en.json`, `messages/es.json`
- Use namespaced keys (e.g., `hero.title`, `projects.project1.description`)
- Keep Portuguese as the primary language

### 8. Context & State Management

```typescript
// Context pattern
'use client';

const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialValue);
  
  const actions = useCallback(() => {
    // Memoize functions
  }, []);
  
  return (
    <MyContext.Provider value={{ state, actions }}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
}
```

### 9. Error Handling

- No try-catch in this codebase - Next.js error boundaries handle errors
- Validate context usage with error messages
- Type safety prevents most runtime errors

### 10. Accessibility

```typescript
// Always include aria-labels for interactive elements
<button aria-label={t('expand')}>
  <Icon />
</button>

// Use semantic HTML
<nav>, <main>, <section>, <article>, <footer>

// Keyboard navigation
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [close]);
```

## Best Practices

1. **Server vs Client Components**: Default to Server Components. Use `'use client'` only when:
   - Using React hooks (useState, useEffect, etc.)
   - Using event handlers (onClick, onChange)
   - Using browser APIs (window, document)
   - Using context providers/consumers

2. **Performance**: 
   - Use `viewport={{ once: true }}` for scroll animations
   - Memoize callbacks with `useCallback`
   - Use Next.js `Image` component with `priority` for above-fold images

3. **Responsive Design**: Always test mobile (default), tablet (md:), desktop (lg:)

4. **Git Workflow**: 
   - Build before committing: `npm run build`
   - Verify types: `npx tsc --noEmit`

## Common Patterns

**Client Component with i18n:**
```typescript
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function MySection() {
  const t = useTranslations('mySection');
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={cn("container mx-auto px-4")}
    >
      <h2>{t('title')}</h2>
    </motion.section>
  );
}
```

**Update i18n (always update all 3 files):**
```json
// messages/pt.json
{ "mySection": { "title": "Título" } }

// messages/en.json
{ "mySection": { "title": "Title" } }

// messages/es.json
{ "mySection": { "title": "Título" } }
```
