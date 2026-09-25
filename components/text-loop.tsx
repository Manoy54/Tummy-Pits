"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TextLoopProps {
  text?: string;
  speed?: number;
  className?: string;
  ribbonColor?: string;
  textColor?: string;
}

export const TextLoop: React.FC<TextLoopProps> = ({
  text = "NAUGHTY ✦ SWEET ✦ KIND ✦ SUPPORTIVE ✦ BANGO ✦ CUTE TUMMY ✦ YUMMY ✦ LOVELY ✦ SMART ✦ BULLY ✦ ",
  speed = 20,
  className = "",
  ribbonColor = "#6366f1",
  textColor = "#ffffff",
}) => {
  // Multiply the text to ensure continuous seamless looping across full page width
  const repeatedTextStr = `${text}${text}${text}${text}${text}`;

  const renderText = (str: string) => {
    const parts = str.split("✦");
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < parts.length - 1 && <tspan fill="#d8b4fe">✦</tspan>}
      </React.Fragment>
    ));
  };

  return (
    <div className={`relative w-full overflow-hidden select-none z-30 pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1800 220"
        className="w-full h-auto min-w-[1200px] overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Stretched, elegant flowing wave path */}
          <path
            id="react-bits-wave-path"
            d="M -200,110 C -50,175 100,175 250,110 C 400,45 550,45 700,110 C 850,175 1000,175 1150,110 C 1300,45 1450,45 1600,110 C 1750,175 1900,175 2050,110 C 2200,45 2350,45 2500,110"
            fill="none"
          />

          {/* Ribbon Gradient inspired by React Bits */}
          <linearGradient id="reactBitsRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#5865f2" />
          </linearGradient>
        </defs>

        {/* Solid Wavy Ribbon Body */}
        <use
          href="#react-bits-wave-path"
          stroke={ribbonColor || "url(#reactBitsRibbonGrad)"}
          strokeWidth="78"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Continuous Looping Text along Wavy Path */}
        <text
          fill={textColor}
          fontSize="25"
          fontWeight="900"
          letterSpacing="3"
          className="font-extrabold uppercase tracking-widest"
          dy="9"
        >
          <motion.textPath
            href="#react-bits-wave-path"
            startOffset="0%"
            animate={{ startOffset: ["0%", "-50%"] }}
            transition={{
              duration: speed,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {renderText(repeatedTextStr)}
          </motion.textPath>
        </text>
      </svg>
    </div>
  );
};

export default TextLoop;
