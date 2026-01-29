'use client';

import { useEffect, useState } from 'react';

export function FloatingPlanet() {
  const [position, setPosition] = useState({ x: -100, y: 20 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after a delay
    const startDelay = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 120000; // 120 seconds for full journey
    const startTime = Date.now();
    const startX = -10;
    const endX = 110;
    const startY = 15;
    const endY = 85;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;

      // Smooth easing
      const easeProgress = progress;

      // Calculate position with slight wave motion
      const x = startX + (endX - startX) * easeProgress;
      const waveAmplitude = 5;
      const waveFrequency = 3;
      const y = startY + (endY - startY) * easeProgress + Math.sin(easeProgress * Math.PI * waveFrequency) * waveAmplitude;

      setPosition({ x, y });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-0 transition-opacity duration-1000"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: position.x > 0 && position.x < 100 ? 0.6 : 0,
      }}
    >
      {/* Planet */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary/30 blur-xl animate-pulse" />

        {/* Planet body */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary/50 rounded-full" />

          {/* Surface details */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 bg-white/20 rounded-full blur-sm" />
            <div className="absolute bottom-1/3 right-1/4 w-1/4 h-1/5 bg-white/10 rounded-full blur-sm" />
          </div>

          {/* Atmosphere */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10" />

          {/* Shadow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/40" />
        </div>

        {/* Ring */}
        <div
          className="absolute top-1/2 left-1/2 w-28 sm:w-36 md:w-44 h-6 sm:h-8 md:h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%) rotateX(70deg) rotateZ(-15deg)' }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary/40 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>

        {/* Orbiting moon */}
        <div
          className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg animate-[spin_8s_linear_infinite]"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
            transform: 'translate(35px, -35px)',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/30" />
        </div>
      </div>
    </div>
  );
}
