"use client";

import React from "react";
import { motion } from "framer-motion";

export function PolaroidGreeting() {
  return (
    <div className="relative w-full max-w-3xl aspect-[4/5] sm:aspect-auto sm:h-[80vh] flex items-center justify-center p-8 z-40 mx-auto">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {/* Cute Flower 1 */}
        <motion.svg
          className="absolute top-[5%] left-[20%] w-14 h-14 text-rose-300 drop-shadow-md"
          viewBox="0 0 100 100"
          fill="currentColor"
          animate={{ rotate: 360, y: [0, -10, 0] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        >
          <circle cx="50" cy="20" r="15" />
          <circle cx="80" cy="50" r="15" />
          <circle cx="50" cy="80" r="15" />
          <circle cx="20" cy="50" r="15" />
          <circle cx="28" cy="28" r="15" />
          <circle cx="72" cy="28" r="15" />
          <circle cx="72" cy="72" r="15" />
          <circle cx="28" cy="72" r="15" />
          <circle cx="50" cy="50" r="18" fill="#fef08a" />
        </motion.svg>

        {/* Cute Flower 2 */}
        <motion.svg
          className="absolute bottom-[5%] right-[20%] w-12 h-12 text-purple-300 drop-shadow-md"
          viewBox="0 0 100 100"
          fill="currentColor"
          animate={{ rotate: -360, y: [0, 15, 0] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <circle cx="50" cy="20" r="15" />
          <circle cx="80" cy="50" r="15" />
          <circle cx="50" cy="80" r="15" />
          <circle cx="20" cy="50" r="15" />
          <circle cx="28" cy="28" r="15" />
          <circle cx="72" cy="28" r="15" />
          <circle cx="72" cy="72" r="15" />
          <circle cx="28" cy="72" r="15" />
          <circle cx="50" cy="50" r="18" fill="#fbcfe8" />
        </motion.svg>

        {/* Yellow Star 1 */}
        <motion.svg
          className="absolute top-[15%] right-[10%] w-12 h-12 text-yellow-300 drop-shadow-md"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ y: [0, -15, 0], rotate: [15, 25, 15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </motion.svg>

        {/* Yellow Star 2 */}
        <motion.svg
          className="absolute bottom-[20%] left-[5%] w-10 h-10 text-yellow-200 drop-shadow-md"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ y: [0, 15, 0], rotate: [-10, 5, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </motion.svg>

        {/* Pink Heart 1 */}
        <motion.svg
          className="absolute top-[35%] left-[2%] w-10 h-10 text-pink-400 drop-shadow-md"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
        </motion.svg>

        {/* Golden Heart 1 */}
        <motion.svg
          className="absolute bottom-[30%] right-[5%] w-12 h-12 text-amber-400 drop-shadow-md"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ y: [0, 12, 0], scale: [1, 1.1, 1], rotate: [-15, -5, -15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
        </motion.svg>

        {/* Bubble 1 */}
        <motion.div
          className="absolute top-[25%] right-[20%] w-16 h-16 rounded-full border border-white/40 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm shadow-[inset_0_0_15px_rgba(255,255,255,0.5)]"
          animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bubble 2 */}
        <motion.div
          className="absolute bottom-[15%] left-[20%] w-10 h-10 rounded-full border border-white/40 bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"
          animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main Interactive Polaroid Frame */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-[90%] sm:w-full max-w-[500px] bg-[#fffdf7] p-5 sm:p-7 pb-14 sm:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm cursor-pointer border border-slate-100"
        initial={{ rotate: 5, y: 60, opacity: 0 }}
        whileInView={{ rotate: 5, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.4, ease: "easeOut" } }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        {/* Peeking Character: Snoopy (Top-Left of the card) */}
        <motion.div
          className="absolute -top-[76px] sm:-top-[102px] left-3 sm:left-6 w-24 sm:w-32 z-15 pointer-events-auto cursor-pointer select-none"
          style={{ filter: "drop-shadow(0 -4px 8px rgba(0,0,0,0.12))" }}
          animate={{
            y: [0, -5, 0],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            y: -14,
            scale: 1.12,
            rotate: -4,
            transition: { type: "spring", stiffness: 350, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
          title="Snoopy peeking!"
        >
          <img
            src="/card_image_copy/snoopy-removebg-preview.png"
            alt="Snoopy Peeking"
            className="w-full h-auto block pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Washi Tape (Centered Between Snoopy and Kuromi) */}
        <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-10 sm:h-12 bg-amber-100/90 shadow-sm z-20 flex items-center justify-center overflow-hidden rotate-[-3deg] mix-blend-multiply">
          {/* Washi Tape Patterns */}
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#f472b6_10px,#f472b6_20px,transparent_20px,transparent_30px,#60a5fa_30px,#60a5fa_40px)]" />
          <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#fbbf24_10px,#fbbf24_20px)]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#a855f7_2px,transparent_2.5px)] bg-[length:15px_15px]" />
        </div>

        {/* Peeking Character: Kuromi (Top-Right of the card - Peeking over top edge) */}
        <motion.div
          className="absolute -top-[74px] sm:-top-[106px] right-3 sm:right-6 w-28 sm:w-40 z-15 pointer-events-auto cursor-pointer select-none"
          style={{ filter: "drop-shadow(0 -4px 10px rgba(0,0,0,0.14))" }}
          animate={{
            y: [0, -6, 0],
            rotate: [2, -2, 2],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            y: -14,
            scale: 1.12,
            rotate: 6,
            transition: { type: "spring", stiffness: 350, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
          title="Kuromi peeking!"
        >
          <img
            src="/card_image_copy/korumi-removebg-preview.png"
            alt="Kuromi Peeking"
            className="w-full h-auto block pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Peeking Character: Chiikawa (Left-Side, Sticks to the Card Edge - 50% larger) */}
        <motion.div
          className="absolute top-[22%] sm:top-[18%] left-0 w-24 sm:w-36 z-25 pointer-events-auto cursor-pointer select-none"
          style={{
            filter: "drop-shadow(-5px 5px 12px rgba(0,0,0,0.18))",
            transformOrigin: "right center",
          }}
          initial={{ x: "-93%" }}
          animate={{
            x: ["-93%", "-97%", "-93%"],
            rotate: [-1, 1.5, -1],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            x: "-102%",
            scale: 1.08,
            rotate: -4,
            transition: { type: "spring", stiffness: 350, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
          title="Chiikawa peeking!"
        >
          <img
            src="/card_image_copy/chiikawa-removebg-preview.png"
            alt="Chiikawa Peeking"
            className="w-full h-auto block pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Peeking Character: Hello Kitty (Right-Side, Sticks to the Card Edge - 50% larger) */}
        <motion.div
          className="absolute top-[30%] sm:top-[28%] right-0 w-28 sm:w-40 z-25 pointer-events-auto cursor-pointer select-none"
          style={{
            filter: "drop-shadow(5px 5px 12px rgba(0,0,0,0.18))",
            transformOrigin: "left center",
          }}
          initial={{ x: "63%" }}
          animate={{
            x: ["63%", "67%", "63%"],
            rotate: [1.5, -1.5, 1.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            x: "72%",
            scale: 1.1,
            rotate: 5,
            transition: { type: "spring", stiffness: 350, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
          title="Hello Kitty peeking!"
        >
          <img
            src="/card_image_copy/hellokitty-removebg-preview.png"
            alt="Hello Kitty Peeking"
            className="w-full h-auto block pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Photo Area */}
        <div className="w-full aspect-square bg-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]">
          <svg className="w-20 h-20 sm:w-24 sm:h-24 mb-5 text-slate-300 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-semibold text-xl sm:text-2xl text-slate-500 mb-2">Your Photo Here</span>
          <span className="text-sm sm:text-base text-slate-400 max-w-[220px] text-center">Drag & Drop Your Favorite B-Day Memory</span>
          
          {/* subtle glare effect over the photo area on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 translate-x-[-150%] skew-x-[-25deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>

        {/* Polaroid Text (Date / Caption) */}
        <div className="w-full mt-6 sm:mt-8 flex justify-between items-end font-[family-name:var(--font-cute)] text-slate-700 px-3">
          <span className="text-2xl sm:text-3xl font-bold tracking-widest uppercase opacity-85 rotate-[-2deg]">MY B-DAY FUN!</span>
          <span className="text-lg sm:text-xl opacity-60 italic rotate-[1deg]">June 14th, 2024</span>
        </div>

        {/* Big Puffy "Happy Birthday" Text SVG overlay */}
        <motion.div 
          className="absolute -bottom-8 -left-10 sm:-bottom-10 sm:-left-16 w-[150%] sm:w-[140%] z-30 pointer-events-none scale-105 sm:scale-100 origin-bottom-left"
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", bounce: 0.6 }}
        >
          {/* Vibrant Glow Drop Shadow added to the SVG */}
          <svg viewBox="0 0 600 280" className="w-full h-auto" style={{ filter: 'drop-shadow(0px 10px 20px rgba(168,85,247,0.6))' }}>
            <defs>
              {/* Optional puffy filters can go here, but SVG layered strokes work best for puffy stickers */}
            </defs>

            <g className="pointer-events-auto cursor-pointer">
              {/* Layer 1: Thickest Outer White Border (Sticker Outline) */}
              <text x="30" y="110" fontFamily="var(--font-cute), cursive" fontSize="125" fontWeight="900" fill="white" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-6, 30, 110)">
                Happy
              </text>
              <text x="60" y="230" fontFamily="var(--font-cute), cursive" fontSize="135" fontWeight="900" fill="white" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-4, 60, 230)">
                Birthday
              </text>

              {/* Layer 2: Dark Purple Stroke (Edge of the letters) */}
              <text x="30" y="110" fontFamily="var(--font-cute), cursive" fontSize="125" fontWeight="900" fill="none" stroke="#4c1d95" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-6, 30, 110)">
                Happy
              </text>
              <text x="60" y="230" fontFamily="var(--font-cute), cursive" fontSize="135" fontWeight="900" fill="none" stroke="#4c1d95" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-4, 60, 230)">
                Birthday
              </text>

              {/* Layer 3: Main Purple Fill */}
              <text x="30" y="110" fontFamily="var(--font-cute), cursive" fontSize="125" fontWeight="900" fill="#7c3aed" transform="rotate(-6, 30, 110)">
                Happy
              </text>
              <text x="60" y="230" fontFamily="var(--font-cute), cursive" fontSize="135" fontWeight="900" fill="#7c3aed" transform="rotate(-4, 60, 230)">
                Birthday
              </text>

              {/* Layer 4: Inner Highlight to make it look puffy/3D */}
              <text x="30" y="110" fontFamily="var(--font-cute), cursive" fontSize="125" fontWeight="900" fill="white" opacity="0.35" transform="translate(-4, -4) rotate(-6, 30, 110)">
                Happy
              </text>
              <text x="60" y="230" fontFamily="var(--font-cute), cursive" fontSize="135" fontWeight="900" fill="white" opacity="0.35" transform="translate(-5, -5) rotate(-4, 60, 230)">
                Birthday
              </text>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
