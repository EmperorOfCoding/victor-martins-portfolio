'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const technologies = [
  { name: "Node.js", icon: "🟢" },
  { name: "React", icon: "⚛️" },
  { name: "Java", icon: "☕" },
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "JS" },
  { name: "Express", icon: "🚂" },
  { name: "MySQL", icon: "🐬" },
  { name: "Oracle", icon: "🔶" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "📦" },
  { name: "Bootstrap", icon: "🅱️" },
];

export function TechStackCard() {
  const t = useTranslations('techStack');

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {t('title')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Tech Icons Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 flex-1">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            className="group relative aspect-square flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-2xl md:text-3xl">{tech.icon}</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors truncate max-w-full px-1">
                {tech.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-xs text-muted-foreground text-center">
          {t('footer')}
        </p>
      </div>
    </div>
  );
}
