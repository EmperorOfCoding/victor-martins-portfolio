'use client';

import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');

  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "C++",
    "PostgreSQL",
    "AWS",
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <span className="text-primary font-mono text-sm sm:text-base">01.</span>
        {t('title')}
        <span className="flex-1 h-px bg-border" />
      </h2>
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
