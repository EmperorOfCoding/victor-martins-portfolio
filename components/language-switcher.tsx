'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const locales = [
  { code: 'pt', label: 'Português', shortLabel: 'PT', country: 'Brasil' },
  { code: 'en', label: 'English', shortLabel: 'EN', country: 'USA' },
  { code: 'es', label: 'Español', shortLabel: 'ES', country: 'España' },
];

function BrazilFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#009c3b"/>
      <polygon points="256,64 492,256 256,448 20,256" fill="#ffdf00"/>
      <circle cx="256" cy="256" r="96" fill="#002776"/>
      <path d="M160,256 Q256,200 352,256" stroke="#fff" strokeWidth="12" fill="none"/>
    </svg>
  );
}

function USAFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#bf0a30"/>
      <rect y="39" width="512" height="39" fill="#fff"/>
      <rect y="118" width="512" height="39" fill="#fff"/>
      <rect y="197" width="512" height="39" fill="#fff"/>
      <rect y="276" width="512" height="39" fill="#fff"/>
      <rect y="355" width="512" height="39" fill="#fff"/>
      <rect y="434" width="512" height="39" fill="#fff"/>
      <rect width="256" height="276" fill="#002868"/>
    </svg>
  );
}

function SpainFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#c60b1e"/>
      <rect y="128" width="512" height="256" fill="#ffc400"/>
    </svg>
  );
}

const flagComponents: Record<string, React.FC<{ className?: string }>> = {
  pt: BrazilFlag,
  en: USAFlag,
  es: SpainFlag,
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocaleData = locales.find(l => l.code === currentLocale) || locales[0];
  const CurrentFlag = flagComponents[currentLocale] || BrazilFlag;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
          "bg-secondary/30 border border-primary/20 hover:border-primary/40",
          "text-sm font-medium text-foreground hover:bg-secondary/50"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <CurrentFlag className="w-5 h-4 rounded-sm overflow-hidden shadow-sm" />
        <span className="hidden sm:inline">{currentLocaleData.shortLabel}</span>
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-primary/20 bg-background/95 backdrop-blur-md shadow-xl overflow-hidden z-50">
          <div className="p-1">
            {locales.map((locale) => {
              const Flag = flagComponents[locale.code];
              const isActive = currentLocale === locale.code;
              return (
                <button
                  key={locale.code}
                  onClick={() => switchLocale(locale.code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Flag className="w-6 h-4 rounded-sm overflow-hidden shadow-sm" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{locale.label}</span>
                    <span className="text-xs text-muted-foreground">{locale.country}</span>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
