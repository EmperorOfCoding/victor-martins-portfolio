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
    "PostgreSQL",
    "AWS",
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="text-primary font-mono text-base">01.</span>
        {t('title')}
        <span className="flex-1 h-px bg-border" />
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>{t('bio1')}</p>
        <p>{t('bio2')}</p>
        <p className="font-medium">{t('skillsTitle')}</p>
        <ul className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center gap-2 text-xs">
              <span className="text-primary">▹</span>
              <span className="font-mono">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
