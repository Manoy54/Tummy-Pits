"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const InteractiveGiftBox = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened) return;
    setIsOpened(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.max(0, x - 0.05), y: y },
        colors: ["#ffb7b2", "#ffdac1", "#e2f0cb", "#b5ead7", "#c7ceea"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.min(1, x + 0.05), y: y },
        colors: ["#ff9a9e", "#fecfef", "#fbc2eb", "#a18cd1", "#fbc2eb"],
      });
    }, 250);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[400px] sm:h-[500px]">
      <div
        className="relative cursor-pointer w-48 h-64 flex flex-col items-center justify-end pb-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
      >
        {/* Surprise Element that pops out */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ y: 80, scale: 0.3, opacity: 0 }}
              animate={{ y: -140, scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
              className="absolute top-20 w-[280px] flex justify-center z-0 pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 rotate-[-6deg] border-4 border-pink-300 flex flex-col items-center">
                <span className="text-5xl mb-3 animate-bounce">🎁</span>
                <span className="text-pink-600 font-bold text-3xl font-[family-name:var(--font-cute)] text-center leading-tight">
                  A Special<br />Surprise!
                </span>
                <span className="text-purple-400 font-medium text-sm mt-3 text-center">
                  Wishing you the best day ever ✨
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Gift Box */}
        <motion.div
          animate={
            isOpened
              ? { scale: 1 }
              : isHovered
              ? {
                  rotate: [-3, 3, -3, 3, 0],
                  scale: 1.05,
                  transition: { repeat: Infinity, duration: 0.4 },
                }
              : { scale: 1, rotate: 0 }
          }
          className="relative w-48 h-48 z-10 transition-transform"
        >
          {/* Box Lid */}
          <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={
              isOpened
                ? { y: -180, x: 100, rotate: 45, opacity: 0 }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.7, type: "spring" }}
            className="absolute top-2 left-[-10px] w-[212px] h-14 bg-pink-400 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] z-20 overflow-visible"
          >
            {/* Lid Ribbon Horizontal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-full bg-yellow-200 shadow-sm" />
            
            {/* Lid Ribbon Bow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center w-full">
              {/* left loop */}
              <div className="w-14 h-14 border-[10px] border-yellow-200 rounded-full rounded-br-sm rotate-[-35deg] absolute right-[50%] origin-bottom-right" />
              {/* right loop */}
              <div className="w-14 h-14 border-[10px] border-yellow-200 rounded-full rounded-bl-sm rotate-[35deg] absolute left-[50%] origin-bottom-left" />
            </div>
          </motion.div>

          {/* Box Body */}
          <div className="absolute top-16 left-0 w-48 h-40 bg-pink-500 rounded-b-lg shadow-2xl z-10 overflow-hidden border-t-2 border-pink-600/20">
            {/* Body Ribbon Horizontal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-full bg-yellow-200 shadow-inner" />
          </div>
          
          {/* Box Shadow on the ground */}
          <motion.div 
            animate={isOpened ? { opacity: 0 } : { opacity: 1 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-6 bg-black/10 blur-md rounded-full -z-10" 
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveGiftBox;
