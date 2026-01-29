"use client";

import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  y: number;
  speed: number;
  length: number;
  angle: number;
  opacity: number;
  active: boolean;
  delay: number;
  size: number;
  hue: number;
}

export function Meteors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
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

    const createMeteor = (delay: number = 0): Meteor => {
      // Meteors always come from top-right area, moving diagonally down-left
      const startX = canvas.width * 0.3 + Math.random() * canvas.width * 0.7;
      const startY = -50 - Math.random() * 100;
      
      // Steeper angle than comets (more vertical)
      const angle = Math.PI * 0.6 + Math.random() * (Math.PI * 0.15);
      
      return {
        x: startX,
        y: startY,
        speed: 15 + Math.random() * 10, // Faster than comets
        length: 40 + Math.random() * 60, // Shorter trails
        angle,
        opacity: 0.7 + Math.random() * 0.3,
        active: false,
        delay,
        size: 1.5 + Math.random() * 1.5, // Thinner than comets
        hue: 20 + Math.random() * 30, // Orange to red-orange colors
      };
    };

    // Initialize meteors with staggered delays
    meteorsRef.current = [
      createMeteor(2000),
      createMeteor(7000),
      createMeteor(12000),
      createMeteor(18000),
    ];

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      timeRef.current += deltaTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < meteorsRef.current.length; i++) {
        const meteor = meteorsRef.current[i];

        // Check if meteor should activate
        if (!meteor.active && timeRef.current >= meteor.delay) {
          meteor.active = true;
        }

        if (!meteor.active) continue;

        // Update position - meteors move faster
        meteor.x -= Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;

        // Calculate tail position (shorter than comets)
        const tailX = meteor.x + Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        // Draw meteor tail with fiery gradient (orange/red colors)
        const gradient = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        gradient.addColorStop(0, `hsla(${meteor.hue}, 100%, 50%, 0)`);
        gradient.addColorStop(0.3, `hsla(${meteor.hue}, 100%, 60%, ${meteor.opacity * 0.3})`);
        gradient.addColorStop(0.7, `hsla(${meteor.hue + 10}, 100%, 70%, ${meteor.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(60, 100%, 90%, ${meteor.opacity})`); // Bright yellow-white head

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = meteor.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw meteor head with fiery glow
        const headGradient = ctx.createRadialGradient(
          meteor.x, meteor.y, 0,
          meteor.x, meteor.y, meteor.size * 5
        );
        headGradient.addColorStop(0, `hsla(60, 100%, 95%, ${meteor.opacity})`);
        headGradient.addColorStop(0.2, `hsla(40, 100%, 70%, ${meteor.opacity * 0.7})`);
        headGradient.addColorStop(0.5, `hsla(${meteor.hue}, 100%, 50%, ${meteor.opacity * 0.3})`);
        headGradient.addColorStop(1, `hsla(${meteor.hue}, 100%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = headGradient;
        ctx.fill();

        // Add small sparks/particles behind meteor
        for (let j = 0; j < 3; j++) {
          const sparkOffset = (j + 1) * 15;
          const sparkX = meteor.x + Math.cos(meteor.angle) * sparkOffset + (Math.random() - 0.5) * 8;
          const sparkY = meteor.y - Math.sin(meteor.angle) * sparkOffset + (Math.random() - 0.5) * 8;
          const sparkSize = Math.random() * 1.5;
          const sparkOpacity = meteor.opacity * (0.3 - j * 0.08);
          
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${meteor.hue + 20}, 100%, 70%, ${sparkOpacity})`;
          ctx.fill();
        }

        // Reset meteor when it goes off screen
        const isOffScreen = meteor.x < -meteor.length - 100 || meteor.y > canvas.height + meteor.length + 100;

        if (isOffScreen) {
          meteorsRef.current[i] = createMeteor(4000 + Math.random() * 10000);
          meteorsRef.current[i].delay += timeRef.current;
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
