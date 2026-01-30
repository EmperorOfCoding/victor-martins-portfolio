'use client';

import { useTranslations } from 'next-intl';
import { Maximize2 } from 'lucide-react';
import { useExpandable } from '@/contexts/expandable-context';

export function AboutSection() {
  const t = useTranslations('about');
  const { expandSection } = useExpandable();

  const skills = [
    "Node.js",
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Express.js",
    "MySQL",
    "Oracle SQL",
    "AWS RDS",
    "Docker",
    "GitHub",
    "Bootstrap",
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <span className="text-primary font-mono text-sm sm:text-base">01.</span>
          {t('title')}
        </h2>
        <button
          onClick={() => expandSection('about')}
          className="p-1.5 sm:p-2 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-xs sm:text-sm">
        <p>{t('bio1')}</p>
        <p>{t('bio2')}</p>
        <p>{t('bio3')}</p>
        <p>{t('bio4')}</p>
        <p>{t('bio5')}</p>
        <p className="font-medium pt-2">{t('skillsTitle')}</p>
        <ul className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="text-primary">▹</span>
              <span className="font-mono">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
