'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Adiciona uma animação suave ao progresso
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/30 origin-left z-[60]"
      style={{ scaleX }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
    </motion.div>
  );
}
