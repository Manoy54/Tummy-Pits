"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

export interface ScratchToRevealProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  minScratchPercentage?: number;
  className?: string;
  onComplete?: () => void;
  gradientColors?: string[];
  scratchRadius?: number;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  children,
  width = 320,
  height = 320,
  minScratchPercentage = 50,
  className = "",
  onComplete,
  gradientColors = ["#c084fc", "#7e22ce", "#3b0764"],
  scratchRadius = 25,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const controls = useAnimation();
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas with metallic/gradient background
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, gradientColors[0] || "#c084fc");
    gradient.addColorStop(0.5, gradientColors[1] || "#7e22ce");
    gradient.addColorStop(1, gradientColors[2] || "#3b0764");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative glitter pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    for (let i = 0; i < width; i += 6) {
      for (let j = 0; j < height; j += 6) {
        if ((i * 3 + j * 7) % 11 === 0) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }

    // Scratch card shimmer border on canvas
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    setIsCompleted(false);
    setHasScratched(false);
    controls.set({ opacity: 1 });
  }, [width, height, gradientColors, controls]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const checkScratchPercentage = useCallback(() => {
    if (isCompleted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let totalSampled = 0;
    let clearSampled = 0;

    // Sample every 16th pixel for high performance
    for (let i = 3; i < pixels.length; i += 16) {
      totalSampled++;
      if (pixels[i] === 0) {
        clearSampled++;
      }
    }

    const percentage = Math.round((clearSampled / totalSampled) * 100);

    if (percentage >= minScratchPercentage && !isCompleted) {
      setIsCompleted(true);
      controls.start({ opacity: 0, transition: { duration: 0.6 } }).then(() => {
        if (onComplete) {
          onComplete();
        }
      });
    }
  }, [width, height, minScratchPercentage, isCompleted, controls, onComplete]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();

    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.lineWidth = scratchRadius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    ctx.arc(x, y, scratchRadius, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = { x, y };
    if (!hasScratched) {
      setHasScratched(true);
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (!e.touches || e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isCompleted) return;
    setIsScratching(true);
    const coords = getCoordinates(e);
    if (coords) {
      lastPointRef.current = coords;
      scratch(coords.x, coords.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching || isCompleted) return;
    const coords = getCoordinates(e);
    if (coords) {
      scratch(coords.x, coords.y);
      checkScratchPercentage();
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isCompleted) return;
    setIsScratching(true);
    const coords = getCoordinates(e);
    if (coords) {
      lastPointRef.current = coords;
      scratch(coords.x, coords.y);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching || isCompleted) return;
    const coords = getCoordinates(e);
    if (coords) {
      scratch(coords.x, coords.y);
      checkScratchPercentage();
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl border border-white/20 shadow-2xl ${className}`}
      style={{ width, height }}
    >
      {/* Hidden Revealed Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-slate-900 p-6">
        {children}
      </div>

      {/* Canvas Scratch Layer */}
      {!isCompleted && (
        <motion.canvas
          ref={canvasRef}
          width={width}
          height={height}
          animate={controls}
          className="absolute inset-0 z-10 cursor-pointer touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* Overlay Scratch Prompt */}
      {!hasScratched && !isCompleted && (
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
          <div className="rounded-full bg-black/60 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md border border-white/30 shadow-xl animate-bounce">
            ✨ Scratch to reveal!
          </div>
        </div>
      )}
    </div>
  );
};
export default ScratchToReveal;
