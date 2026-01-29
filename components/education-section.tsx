'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Maximize2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useExpandable } from '@/contexts/expandable-context';

const educationData = [
  {
    institution: "FIAP",
    degree: "Software Engineering",
    period: "2024 — Present",
    status: "in_progress",
  },
  {
    institution: "UFBA",
    degree: "Computer Science",
    period: "2023",
    status: "completed",
  },
];

export function EducationSection() {
  const t = useTranslations('education');
  const { expandSection } = useExpandable();

  return (
    <motion.div
      layoutId="education-card"
      className="h-full flex flex-col cursor-pointer group"
      onClick={() => expandSection('education')}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <span className="text-primary font-mono text-sm sm:text-base">04.</span>
          {t('title')}
          <span className="flex-1 h-px bg-border" />
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            expandSection('education');
          }}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="flex-1 space-y-3 sm:space-y-4">
        {educationData.map((edu, index) => (
          <div
            key={edu.institution}
            className="p-3 sm:p-4 bg-secondary/30 rounded-sm border border-primary/20 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  {t(`institution${index + 1}.name`)}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t(`institution${index + 1}.degree`)}
                </p>
                <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mt-1">
                  {t(`institution${index + 1}.period`)}
                </p>
              </div>
              {edu.status === 'in_progress' && (
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono bg-primary/10 text-primary rounded-full whitespace-nowrap">
                  {t('inProgress')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end mt-2">
        <p className="text-[10px] sm:text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {t('clickToExpand')}
        </p>
      </div>
    </motion.div>
  );
}
