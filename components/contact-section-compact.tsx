'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from 'next-intl';

export function ContactSectionCompact() {
  const t = useTranslations('contact');
  
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Title */}
      <div className="text-center">
        <p className="text-primary font-mono text-xs mb-2">{t('subtitle')}</p>
        <h3 className="text-xl font-bold text-foreground">{t('title')}</h3>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        <motion.a
          href="https://github.com/EmperorOfCoding"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-primary transition-all border border-white/10 rounded-xl hover:border-primary/30 hover:bg-white/5"
          aria-label="GitHub Profile"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/victor-martins-9095092b5/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-primary transition-all border border-white/10 rounded-xl hover:border-primary/30 hover:bg-white/5"
          aria-label="LinkedIn Profile"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="mailto:victorameno@hotmail.com"
          className="p-3 text-muted-foreground hover:text-primary transition-all border border-white/10 rounded-xl hover:border-primary/30 hover:bg-white/5"
          aria-label="Email"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Email CTA */}
      <motion.a
        href="mailto:victorameno@hotmail.com"
        className="px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all font-medium text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t('button')}
      </motion.a>
    </div>
  );
}
