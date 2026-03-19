"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Floating particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      type: "circle" | "ring" | "dot";
    }

    const particles: Particle[] = [];
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 230 : 45, // blue or gold
        type: ["circle", "ring", "dot"][
          Math.floor(Math.random() * 3)
        ] as Particle["type"],
      });
    }

    // Floating geometric shapes
    interface Shape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      speedY: number;
      driftX: number;
      opacity: number;
      type: "square" | "triangle" | "hexagon" | "cross";
      color: string;
    }

    const shapes: Shape[] = [];
    const shapeColors = [
      "rgba(41, 121, 255, 0.12)",  // blue
      "rgba(26, 35, 126, 0.10)",   // navy
      "rgba(255, 193, 7, 0.12)",   // gold
      "rgba(41, 121, 255, 0.08)",  // light blue
    ];

    for (let i = 0; i < 12; i++) {
      shapes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.3,
        driftX: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        type: ["square", "triangle", "hexagon", "cross"][
          Math.floor(Math.random() * 4)
        ] as Shape["type"],
        color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
      });
    }

    const drawShape = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color.replace(/[\d.]+\)$/, `${0.2})`);
      ctx.lineWidth = 2;

      switch (shape.type) {
        case "square":
          ctx.beginPath();
          ctx.roundRect(
            -shape.size / 2,
            -shape.size / 2,
            shape.size,
            shape.size,
            4
          );
          ctx.fill();
          ctx.stroke();
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case "hexagon":
          ctx.beginPath();
          for (let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j - Math.PI / 6;
            const hx = (shape.size / 2) * Math.cos(angle);
            const hy = (shape.size / 2) * Math.sin(angle);
            j === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case "cross":
          const t = shape.size / 5;
          const s = shape.size / 2;
          ctx.beginPath();
          ctx.moveTo(-t, -s);
          ctx.lineTo(t, -s);
          ctx.lineTo(t, -t);
          ctx.lineTo(s, -t);
          ctx.lineTo(s, t);
          ctx.lineTo(t, t);
          ctx.lineTo(t, s);
          ctx.lineTo(-t, s);
          ctx.lineTo(-t, t);
          ctx.lineTo(-s, t);
          ctx.lineTo(-s, -t);
          ctx.lineTo(-t, -t);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    // Glowing orbs
    interface Orb {
      x: number;
      y: number;
      radius: number;
      color1: string;
      color2: string;
      phaseX: number;
      phaseY: number;
      speedX: number;
      speedY: number;
      amplitudeX: number;
      amplitudeY: number;
    }

    const orbs: Orb[] = [
      {
        x: rect.width * 0.75,
        y: rect.height * 0.25,
        radius: 220,
        color1: "rgba(41, 121, 255, 0.14)",
        color2: "rgba(41, 121, 255, 0)",
        phaseX: 0,
        phaseY: 0.5,
        speedX: 0.0006,
        speedY: 0.0008,
        amplitudeX: 80,
        amplitudeY: 50,
      },
      {
        x: rect.width * 0.2,
        y: rect.height * 0.7,
        radius: 180,
        color1: "rgba(26, 35, 126, 0.10)",
        color2: "rgba(26, 35, 126, 0)",
        phaseX: 1,
        phaseY: 0,
        speedX: 0.0007,
        speedY: 0.0005,
        amplitudeX: 60,
        amplitudeY: 60,
      },
      {
        x: rect.width * 0.5,
        y: rect.height * 0.15,
        radius: 150,
        color1: "rgba(255, 193, 7, 0.10)",
        color2: "rgba(255, 193, 7, 0)",
        phaseX: 2,
        phaseY: 1.5,
        speedX: 0.0008,
        speedY: 0.0006,
        amplitudeX: 90,
        amplitudeY: 40,
      },
    ];

    const animate = () => {
      const currentRect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, currentRect.width, currentRect.height);
      time++;

      // Draw orbs
      orbs.forEach((orb) => {
        const ox = orb.x + Math.sin(time * orb.speedX + orb.phaseX) * orb.amplitudeX;
        const oy = orb.y + Math.cos(time * orb.speedY + orb.phaseY) * orb.amplitudeY;

        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
        gradient.addColorStop(0, orb.color1);
        gradient.addColorStop(1, orb.color2);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw & update shapes
      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        shape.y += shape.speedY;
        shape.x += shape.driftX;

        // Wrap around
        if (shape.y > currentRect.height + shape.size) shape.y = -shape.size;
        if (shape.y < -shape.size) shape.y = currentRect.height + shape.size;
        if (shape.x > currentRect.width + shape.size) shape.x = -shape.size;
        if (shape.x < -shape.size) shape.x = currentRect.width + shape.size;

        drawShape(shape);
      });

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x > currentRect.width) p.x = 0;
        if (p.x < 0) p.x = currentRect.width;
        if (p.y > currentRect.height) p.y = 0;
        if (p.y < 0) p.y = currentRect.height;

        // Pulse opacity
        const pulse = Math.sin(time * 0.02 + p.x * 0.01) * 0.1;

        ctx.beginPath();
        if (p.type === "ring") {
          ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity + pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity + pulse})`;
          ctx.fill();
        }
      });

      // Connect nearby particles with faint lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(41, 121, 255, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9, zIndex: 1 }}
    />
  );
}
