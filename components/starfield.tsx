"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[][]>([]);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Create three layers of stars for parallax effect
    const createStars = () => {
      const layers: Star[][] = [];
      const layerConfigs = [
        { count: 150, minSize: 0.5, maxSize: 1, speed: 0.1, minOpacity: 0.3, maxOpacity: 0.5 },
        { count: 100, minSize: 1, maxSize: 2, speed: 0.2, minOpacity: 0.5, maxOpacity: 0.7 },
        { count: 50, minSize: 2, maxSize: 3, speed: 0.4, minOpacity: 0.7, maxOpacity: 1 },
      ];

      for (const config of layerConfigs) {
        const stars: Star[] = [];
        for (let i = 0; i < config.count; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 3,
            size: config.minSize + Math.random() * (config.maxSize - config.minSize),
            speed: config.speed,
            opacity: config.minOpacity + Math.random() * (config.maxOpacity - config.minOpacity),
          });
        }
        layers.push(stars);
      }
      starsRef.current = layers;
    };

    createStars();

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
    });

    let animationId: number;
    let twinkleOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      twinkleOffset += 0.02;

      for (let layerIndex = 0; layerIndex < starsRef.current.length; layerIndex++) {
        const layer = starsRef.current[layerIndex];
        const parallaxOffset = scrollRef.current * (0.1 + layerIndex * 0.15);

        for (const star of layer) {
          const y = ((star.y - parallaxOffset) % (canvas.height * 3) + canvas.height * 3) % (canvas.height * 3) - canvas.height;
          
          if (y > -10 && y < canvas.height + 10) {
            const twinkle = Math.sin(twinkleOffset + star.x * 0.01 + star.y * 0.01) * 0.3 + 0.7;
            const alpha = star.opacity * twinkle;

            ctx.beginPath();
            ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            // Add glow for larger stars
            if (star.size > 1.5) {
              ctx.beginPath();
              ctx.arc(star.x, y, star.size * 2, 0, Math.PI * 2);
              const gradient = ctx.createRadialGradient(star.x, y, 0, star.x, y, star.size * 2);
              gradient.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.3})`);
              gradient.addColorStop(1, "rgba(200, 220, 255, 0)");
              ctx.fillStyle = gradient;
              ctx.fill();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, #0a0a1a 0%, #0d1025 50%, #0a0a1a 100%)" }}
      aria-hidden="true"
    />
  );
}
