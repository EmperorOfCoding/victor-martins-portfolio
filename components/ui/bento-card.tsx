'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function BentoCard({ children, className, glowOnHover = true }: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md",
        "transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/10",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {glowOnHover && (
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/10 to-accent/10" />
      )}
      <div className="relative z-10 p-6 md:p-8 h-full">
        {children}
      </div>
    </motion.div>
  );
}