'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Maximize2, MapPin, Briefcase } from 'lucide-react';
import { useExpandable } from '@/contexts/expandable-context';

export function AboutSectionVisual() {
  const t = useTranslations('about');
  const { expandSection } = useExpandable();

  return (
    <motion.div
      className="h-full flex flex-col cursor-pointer group"
      onClick={() => expandSection('about')}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t('title')}
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            expandSection('about');
          }}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">São Paulo, BR</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
          <Briefcase className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">Full Stack</span>
        </div>
      </div>

      {/* Bio TL;DR */}
      <div className="flex-1 space-y-4">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {t('bio1')}
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {t('bio2')}
        </p>
      </div>

      {/* Expand hint */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <Maximize2 className="w-3 h-3" />
          {t('clickToExpand')}
        </p>
      </div>
    </motion.div>
  );
}
