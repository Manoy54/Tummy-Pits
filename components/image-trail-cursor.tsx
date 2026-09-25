"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getHoverImages } from "@/app/actions";

export interface ImageTrailCursorProps {
  children?: React.ReactNode;
  className?: string;
  minDistance?: number;
  maxItems?: number;
  rotationRange?: number;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  imageSrc: string;
}

export const ImageTrailCursor: React.FC<ImageTrailCursorProps> = ({
  children,
  className = "",
  minDistance = 65,
  maxItems = 8,
  rotationRange = 18,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [hoverImages, setHoverImages] = useState<string[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const imageIndexRef = useRef(0);
  const idCounterRef = useRef(0);

  // Fetch images exclusively from the /hover_images directory on mount
  useEffect(() => {
    let cancelled = false;
    getHoverImages()
      .then((fetched) => {
        if (!cancelled && fetched.length > 0) {
          setHoverImages(fetched);
          imageIndexRef.current = 0; // reset cycle index
        }
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't create trail items if we have no images loaded
      if (hoverImages.length === 0) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastPosRef.current) {
        const dx = x - lastPosRef.current.x;
        const dy = y - lastPosRef.current.y;
        const distance = Math.hypot(dx, dy);

        if (distance < minDistance) {
          return;
        }
      }

      lastPosRef.current = { x, y };

      const currentItemIndex = imageIndexRef.current % hoverImages.length;
      imageIndexRef.current += 1;

      const randomRotation = (Math.random() - 0.5) * rotationRange * 2;

      const newItem: TrailItem = {
        id: idCounterRef.current++,
        x,
        y,
        rotation: randomRotation,
        imageSrc: hoverImages[currentItemIndex],
      };

      setTrail((prev) => {
        const updated = [...prev, newItem];
        if (updated.length > maxItems) {
          return updated.slice(updated.length - maxItems);
        }
        return updated;
      });
    },
    [hoverImages, minDistance, maxItems, rotationRange]
  );

  const handleMouseLeave = () => {
    lastPosRef.current = null;
    setTrail([]);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden select-none cursor-crosshair ${className}`}
    >
      {/* Interactive Background Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        {children || (
          <h3 className="text-4xl sm:text-7xl font-bold tracking-wider text-white/90 font-[family-name:var(--font-cute)]">
            Hover Here
          </h3>
        )}
      </div>

      {/* Floating Image Trail — only renders actual images from /hover_images */}
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.4, rotate: item.rotation - 12 }}
            animate={{ opacity: 1, scale: 1, rotate: item.rotation }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none z-20"
          >
            {/* Polaroid Scrapbook Frame */}
            <div className="w-52 h-64 sm:w-64 sm:h-[312px] rounded-md bg-white p-3 pb-12 sm:pb-16 shadow-[0_15px_35px_rgba(0,0,0,0.15)] flex flex-col border border-slate-200 relative rotate-[2deg]">
              
              {/* Cute Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/80 shadow-sm -rotate-2 mix-blend-multiply flex items-center justify-center opacity-90 z-10" />

              {/* Photo Area */}
              <div className="flex-1 w-full border border-slate-100 rounded-sm relative overflow-hidden bg-slate-100">
                <img
                  src={item.imageSrc}
                  alt="Memory photo"
                  className="w-full h-full object-cover absolute inset-0"
                  onError={(e) => {
                    // If an image fails to load, hide its polaroid
                    const polaroid = e.currentTarget.closest('.pointer-events-none');
                    if (polaroid) {
                      (polaroid as HTMLElement).style.display = 'none';
                    }
                    // Remove the broken image from rotation
                    setHoverImages((prev) => prev.filter((src) => src !== item.imageSrc));
                  }}
                />
              </div>
              
              {/* Sparkle at the bottom */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 w-full text-center px-4">
                <span className="text-lg text-purple-900 font-[family-name:var(--font-cute)] transform rotate-1 inline-block">
                  ✨
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ImageTrailCursor;
