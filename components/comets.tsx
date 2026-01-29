"use client";

import { useEffect, useRef } from "react";

interface Comet {
  x: number;
  y: number;
  speed: number;
  length: number;
  angle: number;
  opacity: number;
  active: boolean;
  delay: number;
  size: number;
}

export function Comets() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cometsRef = useRef<Comet[]>([]);
  const timeRef = useRef(0);

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

    const createComet = (delay: number = 0): Comet => {
      const startFromLeft = Math.random() > 0.5;
      const angle = startFromLeft 
        ? -Math.PI / 6 + Math.random() * (Math.PI / 12)
        : Math.PI - Math.PI / 6 + Math.random() * (Math.PI / 12);
      
      return {
        x: startFromLeft ? -50 : canvas.width + 50,
        y: Math.random() * canvas.height * 0.6,
        speed: 8 + Math.random() * 8,
        length: 100 + Math.random() * 150,
        angle,
        opacity: 0.6 + Math.random() * 0.4,
        active: false,
        delay,
        size: 2 + Math.random() * 2,
      };
    };

    // Initialize comets with staggered delays
    cometsRef.current = [
      createComet(0),
      createComet(3000),
      createComet(6000),
      createComet(10000),
      createComet(15000),
    ];

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      timeRef.current += deltaTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cometsRef.current.length; i++) {
        const comet = cometsRef.current[i];

        // Check if comet should activate
        if (!comet.active && timeRef.current >= comet.delay) {
          comet.active = true;
        }

        if (!comet.active) continue;

        // Update position
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y -= Math.sin(comet.angle) * comet.speed;

        // Draw comet tail
        const tailX = comet.x - Math.cos(comet.angle) * comet.length;
        const tailY = comet.y + Math.sin(comet.angle) * comet.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
        gradient.addColorStop(0, "rgba(100, 200, 255, 0)");
        gradient.addColorStop(0.5, `rgba(150, 220, 255, ${comet.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${comet.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(comet.x, comet.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = comet.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw comet head glow
        const headGradient = ctx.createRadialGradient(
          comet.x, comet.y, 0,
          comet.x, comet.y, comet.size * 4
        );
        headGradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
        headGradient.addColorStop(0.3, `rgba(200, 230, 255, ${comet.opacity * 0.5})`);
        headGradient.addColorStop(1, "rgba(100, 200, 255, 0)");

        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = headGradient;
        ctx.fill();

        // Reset comet when it goes off screen
        const isOffScreen = comet.angle < Math.PI / 2
          ? comet.x > canvas.width + comet.length + 100 || comet.y < -comet.length - 100
          : comet.x < -comet.length - 100 || comet.y < -comet.length - 100;

        if (isOffScreen) {
          cometsRef.current[i] = createComet(2000 + Math.random() * 8000);
          cometsRef.current[i].delay += timeRef.current;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
