"use client";

import type { CSSProperties } from "react";
import { useEffect, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperTexture } from "@paper-design/shaders-react";
import confetti from "canvas-confetti";
import ScratchToReveal from "@/components/inspira/scratch-to-reveal";
import ImageTrailCursor from "@/components/inspira/image-trail-cursor";
import TextLoop from "@/components/react-bits/text-loop";
import InteractiveGiftBox3D from "@/components/interactive-gift-box-3d";
import { PolaroidGreeting } from "@/components/polaroid-greeting";
import InteractiveCake from "@/components/interactive-cake";


const projects = [
  {
    title: "Project One",
    shade: "bg-[#090615]",
    text: "text-[#f5efff]",
    accent: "border-[#8b5cf6]",
  },
  {
    title: "Project Two",
    shade: "bg-white",
    text: "text-[#4c1d95]",
    accent: "border-[#c084fc]",
  },
  {
    title: "Project Three",
    shade: "bg-[#d8b4fe]",
    text: "text-[#581c87]",
    accent: "border-[#a855f7]",
  },
  {
    title: "Project Four",
    shade: "bg-gradient-to-b from-white via-[#f3e8ff] to-[#e9d5ff]",
    text: "text-[#4a365f]",
    accent: "border-[#c084fc]",
  },
  {
    title: "Project Five",
    shade: "bg-gradient-to-b from-[#e9d5ff] to-[#fce7f3]",
    text: "text-[#4a365f]",
    accent: "border-pink-300",
  },
  {
    title: "Project Six",
    shade: "bg-gradient-to-br from-pink-100 to-purple-100",
    text: "text-purple-900",
    accent: "border-pink-300",
  },
];

const stars = [
  { position: "left-[2%] top-[8%] size-1", color: "#ffffff" },
  { position: "left-[5%] top-[14%] size-1.5", color: "#d8b4fe" },
  { position: "left-[7%] top-[42%] size-1", color: "#bfdbfe" },
  { position: "left-[9%] top-[64%] size-2", color: "#fbcfe8" },
  { position: "left-[12%] top-[24%] size-1", color: "#ffffff" },
  { position: "left-[13%] top-[74%] size-1", color: "#fde68a" },
  { position: "left-[15%] top-[35%] size-1.5", color: "#c4b5fd" },
  { position: "left-[18%] top-[54%] size-1", color: "#e0f2fe" },
  { position: "left-[19%] top-[4%] size-1", color: "#bae6fd" },
  { position: "left-[21%] top-[82%] size-1.5", color: "#f5d0fe" },
  { position: "left-[24%] top-[9%] size-1", color: "#ffffff" },
  { position: "left-[26%] top-[61%] size-1", color: "#a5b4fc" },
  { position: "left-[27%] top-[91%] size-1", color: "#fef3c7" },
  { position: "left-[28%] top-[20%] size-2", color: "#f0abfc" },
  { position: "left-[30%] top-[48%] size-1", color: "#ffffff" },
  { position: "left-[31%] top-[31%] size-1", color: "#e0f2fe" },
  { position: "left-[33%] top-[72%] size-1.5", color: "#ddd6fe" },
  { position: "left-[35%] top-[14%] size-1", color: "#bae6fd" },
  { position: "left-[38%] top-[38%] size-1", color: "#fbcfe8" },
  { position: "left-[39%] top-[93%] size-1", color: "#fde68a" },
  { position: "left-[40%] top-[66%] size-1", color: "#ffffff" },
  { position: "left-[42%] top-[10%] size-1.5", color: "#c4b5fd" },
  { position: "left-[43%] top-[23%] size-1", color: "#bfdbfe" },
  { position: "left-[45%] top-[55%] size-1", color: "#bfdbfe" },
  { position: "left-[47%] top-[29%] size-1", color: "#ffffff" },
  { position: "left-[49%] top-[84%] size-2", color: "#f5d0fe" },
  { position: "left-[50%] top-[18%] size-1", color: "#fef08a" },
  { position: "left-[52%] top-[34%] size-1", color: "#d8b4fe" },
  { position: "left-[54%] top-[5%] size-1", color: "#ffffff" },
  { position: "left-[56%] top-[76%] size-1", color: "#bae6fd" },
  { position: "left-[57%] top-[46%] size-1", color: "#fde68a" },
  { position: "left-[58%] top-[24%] size-1.5", color: "#e9d5ff" },
  { position: "left-[61%] top-[52%] size-1", color: "#ffffff" },
  { position: "left-[63%] top-[13%] size-1", color: "#fbcfe8" },
  { position: "left-[64%] top-[87%] size-1", color: "#e0f2fe" },
  { position: "left-[66%] top-[70%] size-2", color: "#c4b5fd" },
  { position: "left-[69%] top-[44%] size-1", color: "#bfdbfe" },
  { position: "left-[71%] top-[88%] size-1", color: "#ffffff" },
  { position: "left-[72%] top-[57%] size-1", color: "#fef3c7" },
  { position: "left-[74%] top-[12%] size-1.5", color: "#f0abfc" },
  { position: "left-[77%] top-[33%] size-1", color: "#ddd6fe" },
  { position: "left-[79%] top-[60%] size-1", color: "#bae6fd" },
  { position: "left-[80%] top-[22%] size-1", color: "#fde68a" },
  { position: "left-[82%] top-[86%] size-1.5", color: "#ffffff" },
  { position: "left-[85%] top-[7%] size-1", color: "#fbcfe8" },
  { position: "left-[86%] top-[68%] size-1", color: "#e0f2fe" },
  { position: "left-[87%] top-[48%] size-1", color: "#c4b5fd" },
  { position: "left-[89%] top-[73%] size-1", color: "#bfdbfe" },
  { position: "left-[91%] top-[28%] size-2", color: "#ffffff" },
  { position: "left-[92%] top-[41%] size-1", color: "#fef08a" },
  { position: "left-[93%] top-[78%] size-1", color: "#d8b4fe" },
  { position: "left-[95%] top-[58%] size-1.5", color: "#f5d0fe" },
  { position: "left-[98%] top-[18%] size-1", color: "#bae6fd" },
  { position: "left-[99%] top-[92%] size-1", color: "#fde68a" },
];

const constellations = [
  {
    position: "left-[4%] top-[8%] w-36 sm:w-52",
    rotate: "-10deg",
    scaleX: "1",
    scaleY: "1",
    opacity: 0.72,
    delay: "0s",
  },
  {
    position: "left-[22%] top-[6%] w-28 sm:w-44",
    rotate: "18deg",
    scaleX: "-1",
    scaleY: "1",
    opacity: 0.5,
    delay: "0.7s",
  },
  {
    position: "right-[8%] top-[12%] w-32 sm:w-48",
    rotate: "-34deg",
    scaleX: "1",
    scaleY: "-1",
    opacity: 0.64,
    delay: "1.1s",
  },
  {
    position: "left-[10%] bottom-[10%] w-40 sm:w-56",
    rotate: "42deg",
    scaleX: "-1",
    scaleY: "-1",
    opacity: 0.46,
    delay: "1.8s",
  },
  {
    position: "left-[44%] top-[26%] w-28 sm:w-40",
    rotate: "9deg",
    scaleX: "1",
    scaleY: "1",
    opacity: 0.42,
    delay: "2.4s",
  },
  {
    position: "right-[18%] bottom-[14%] w-36 sm:w-52",
    rotate: "-22deg",
    scaleX: "-1",
    scaleY: "1",
    opacity: 0.56,
    delay: "3s",
  },
  {
    position: "right-[34%] top-[58%] w-24 sm:w-36",
    rotate: "68deg",
    scaleX: "1",
    scaleY: "-1",
    opacity: 0.38,
    delay: "3.5s",
  },
];

const comets = [
  { position: "left-[-18%] top-[-5%] w-32", delay: "0s" },
  { position: "left-[-24%] top-[8%] w-24", delay: "1.5s" },
  { position: "left-[-20%] top-[20%] w-28", delay: "3.1s" },
  { position: "left-[-28%] top-[-12%] w-40", delay: "4.4s" },
  { position: "left-[-14%] top-[34%] w-20", delay: "5.8s" },
];

const balloons = [
  { color: '#f472b6', highlight: '#fda4ca', x: '8%', y: '12%', size: 52, delay: 0, duration: 7, rotateStart: -3, rotateEnd: 4, lift: -28 },
  { color: '#a78bfa', highlight: '#c4b5fd', x: '22%', y: '22%', size: 44, delay: 1.2, duration: 8.5, rotateStart: 2, rotateEnd: -3, lift: -22 },
  { color: '#fbbf24', highlight: '#fde68a', x: '38%', y: '8%', size: 56, delay: 0.5, duration: 6.5, rotateStart: -4, rotateEnd: 2, lift: -32 },
  { color: '#34d399', highlight: '#6ee7b7', x: '55%', y: '28%', size: 40, delay: 2, duration: 9, rotateStart: 1, rotateEnd: -4, lift: -18 },
  { color: '#f87171', highlight: '#fca5a5', x: '68%', y: '15%', size: 48, delay: 0.8, duration: 7.5, rotateStart: -2, rotateEnd: 5, lift: -26 },
  { color: '#60a5fa', highlight: '#93c5fd', x: '82%', y: '20%', size: 50, delay: 1.5, duration: 8, rotateStart: 3, rotateEnd: -2, lift: -30 },
  { color: '#fb923c', highlight: '#fdba74', x: '12%', y: '62%', size: 38, delay: 2.5, duration: 7.2, rotateStart: -5, rotateEnd: 3, lift: -20 },
  { color: '#e879f9', highlight: '#f0abfc', x: '90%', y: '55%', size: 46, delay: 0.3, duration: 6.8, rotateStart: 2, rotateEnd: -5, lift: -24 },
];

const sectionBgColors: Record<number, string> = {
  0: '#090615',
  1: '#e9d5ff',
  2: '#d8b4fe',
  3: '#c084fc',
  4: '#a855f7',
  5: '#fce7f3', // pink-100 to match the new pastel background
};

function ReferenceConstellation({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) {
  const starPoints = [
    [52, 10],
    [80, 44],
    [66, 78],
    [34, 86],
    [31, 97],
    [35, 38],
    [12, 48],
    [72, 7],
  ];

  return (
    <svg
      className={`reference-constellation absolute ${className}`}
      style={style}
      aria-hidden="true"
      viewBox="0 0 100 110"
    >
      <polyline points="52,10 35,38 34,86 31,97" />
      <polyline points="35,38 80,44 52,10" />
      <line x1="80" y1="44" x2="66" y2="78" />
      {starPoints.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" />
      ))}
    </svg>
  );
}

export default function Home() {
  const [countdown, setCountdown] = useState(5);
  // curtainState: "open" | "closing" | "closed" | "opening" | "finished"
  const [curtainState, setCurtainState] = useState<"open" | "closing" | "closed" | "opening" | "finished">("open");
  const [lockedSection2, setLockedSection2] = useState(false);
  const [scratchKey, setScratchKey] = useState(0);

  // Alternate the two scratch photos on each reset.
  const surpriseImages = ["/scratch/bango.jpg", "/scratch/ganda.jpg"];
  const currentSurpriseImage = surpriseImages[scratchKey % surpriseImages.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((count) => {
        if (count <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return count - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      // Step 1: Curtains slide in and meet in the middle
      // 🎆 Cinematic particle explosion before curtains close
      const burstColors = ['#a855f7', '#d8b4fe', '#fbbf24', '#f472b6', '#60a5fa', '#ffffff'];
      const duration = 700;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: burstColors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: burstColors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      confetti({ particleCount: 180, spread: 160, origin: { x: 0.5, y: 0.5 }, colors: burstColors, gravity: 0.5, scalar: 1.3, ticks: 100 });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurtainState("closing");

      // Step 2: While fully covered by closed curtains (~1.3s), switch view to Section 2
      const closeTimer = setTimeout(() => {
        setCurtainState("closed");
        setLockedSection2(true);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

        // Step 3: Part curtains open smoothly to reveal Section 2
        const openTimer = setTimeout(() => {
          setCurtainState("opening");
          const finishTimer = setTimeout(() => {
            setCurtainState("finished");
          }, 1300);
          return () => clearTimeout(finishTimer);
        }, 100);

        return () => clearTimeout(openTimer);
      }, 1300);

      return () => clearTimeout(closeTimer);
    }
  }, [countdown]);

  // Clean up overflow on unmount
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="relative w-full">
      {/* Theater Curtains Overlay */}
      {curtainState !== "open" && curtainState !== "finished" && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">

          {/* ── SVG Draped Valance Top ── */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{
              y:
                curtainState === "closing" || curtainState === "closed"
                  ? "0%"
                  : "-100%",
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 z-30"
            style={{ height: "90px" }}
          >
            <svg
              viewBox="0 0 1200 90"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="valanceFabric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4c1d95" />
                  <stop offset="40%" stopColor="#6b21a8" />
                  <stop offset="100%" stopColor="#3b0764" />
                </linearGradient>
                <linearGradient id="valanceHighlight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                </linearGradient>
              </defs>
              {/* Main valance shape with draped scallops */}
              <path
                d="M0,0 L1200,0 L1200,40 
                   Q1100,85 1000,50 Q900,15 800,55 Q700,90 600,50 
                   Q500,10 400,55 Q300,90 200,50 Q100,15 0,55 Z"
                fill="url(#valanceFabric)"
              />
              <path
                d="M0,0 L1200,0 L1200,40 
                   Q1100,85 1000,50 Q900,15 800,55 Q700,90 600,50 
                   Q500,10 400,55 Q300,90 200,50 Q100,15 0,55 Z"
                fill="url(#valanceHighlight)"
              />
              {/* Gold trim along the bottom scallop edge */}
              <path
                d="M0,55 Q100,15 200,50 Q300,90 400,55 Q500,10 600,50 
                   Q700,90 800,55 Q900,15 1000,50 Q1100,85 1200,40"
                fill="none"
                stroke="#d4a017"
                strokeWidth="3"
              />
            </svg>
          </motion.div>

          {/* ── Left Curtain Panel ── */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{
              x:
                curtainState === "closing" || curtainState === "closed"
                  ? "0%"
                  : "-100%",
            }}
            transition={{ duration: 1.3, ease: [0.25, 1, 0.35, 1] }}
            className="curtain-fabric curtain-left-edge silk-shimmer absolute top-0 left-0 bottom-0 w-1/2"
          >
            {/* Gold trim on the meeting edge */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 z-10" />
            <div className="absolute right-1 top-0 bottom-0 w-0.5 bg-amber-200/40 z-10" />

            {/* Gold Rope Tieback */}
            <div className="absolute right-6 top-[40%] z-10 flex flex-col items-center">
              <div className="w-3 h-24 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border border-amber-300/60 shadow-lg" />
              <div className="w-2 h-10 bg-gradient-to-b from-amber-400 to-amber-700 rounded-b-full mt-0.5" />
              <div className="w-4 h-4 rounded-full bg-amber-400 shadow-md mt-0.5 border border-amber-200" />
            </div>
          </motion.div>

          {/* ── Right Curtain Panel ── */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{
              x:
                curtainState === "closing" || curtainState === "closed"
                  ? "0%"
                  : "100%",
            }}
            transition={{ duration: 1.3, ease: [0.25, 1, 0.35, 1] }}
            className="curtain-fabric curtain-right-edge silk-shimmer absolute top-0 right-0 bottom-0 w-1/2"
          >
            {/* Gold trim on the meeting edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 z-10" />
            <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-amber-200/40 z-10" />

            {/* Gold Rope Tieback */}
            <div className="absolute left-6 top-[40%] z-10 flex flex-col items-center">
              <div className="w-3 h-24 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border border-amber-300/60 shadow-lg" />
              <div className="w-2 h-10 bg-gradient-to-b from-amber-400 to-amber-700 rounded-b-full mt-0.5" />
              <div className="w-4 h-4 rounded-full bg-amber-400 shadow-md mt-0.5 border border-amber-200" />
            </div>
          </motion.div>

        </div>
      )}

      {projects
        .filter((_, index) => (lockedSection2 ? index !== 0 : true))
        .map((project, actualIndex) => {
          const index = lockedSection2 ? actualIndex + 1 : actualIndex;
          return (
            <Fragment key={project.title}>
              <section
                id={`section-${index + 1}`}
                className={`relative flex min-h-screen w-full items-center overflow-hidden px-6 py-20 ${project.shade} ${project.text}`}
              >
                {index === 0 ? (
                  <>
                    <div className="star-glow absolute inset-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(3,2,10,0.2)_44%,rgba(3,2,10,0.86)_100%)]" />
                    <div className="absolute inset-0 opacity-80">
                      {stars.map((star, starIndex) => (
                        <span
                          key={`${star.position}-${star.color}`}
                          className={`twinkle-star absolute ${star.position}`}
                          style={
                            {
                              "--star-color": star.color,
                              animationDelay: `${starIndex * 0.13}s`,
                            } as CSSProperties
                          }
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0">
                      {constellations.map((constellation) => (
                        <ReferenceConstellation
                          key={`${constellation.position}-${constellation.rotate}`}
                          className={constellation.position}
                          style={
                            {
                              "--constellation-rotate": constellation.rotate,
                              "--constellation-scale-x": constellation.scaleX,
                              "--constellation-scale-y": constellation.scaleY,
                              "--constellation-opacity": constellation.opacity,
                              "--constellation-delay": constellation.delay,
                            } as CSSProperties
                          }
                        />
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {comets.map((comet) => (
                        <span
                          key={`${comet.position}-${comet.delay}`}
                          className={`comet absolute ${comet.position}`}
                          style={{ "--comet-delay": comet.delay } as CSSProperties}
                        />
                      ))}
                    </div>
                  </>
                ) : null}

                {index === 1 ? (
                  <div
                    className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-90"
                    style={{ backgroundImage: "url('/scrapbook-pattern.jpg')", backgroundSize: '300px 300px', backgroundRepeat: 'repeat' }}
                  />
                ) : null}

                {index === 2 ? (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <PaperTexture
                      colorBack="#f3e8ff"
                      colorFront="#a855f7"
                      contrast={0.45}
                      roughness={0.45}
                      fiber={0.40}
                      fiberSize={0.24}
                      crumples={0.45}
                      crumpleSize={0.40}
                      folds={0.80}
                      foldCount={9}
                      drops={0.25}
                      seed={10}
                      scale={0.68}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ) : null}

                {index === 3 ? (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {balloons.map((balloon, bi) => (
                      <div
                        key={bi}
                        className="absolute"
                        style={
                          {
                            left: balloon.x,
                            top: balloon.y,
                            animation: `balloon-float ${balloon.duration}s ease-in-out infinite`,
                            animationDelay: `${balloon.delay}s`,
                            "--balloon-rotate-start": `${balloon.rotateStart}deg`,
                            "--balloon-rotate-end": `${balloon.rotateEnd}deg`,
                            "--balloon-lift": `${balloon.lift}px`,
                          } as CSSProperties
                        }
                      >
                        <svg width={balloon.size} height={balloon.size * 1.6} viewBox="0 0 48 77" fill="none">
                          <defs>
                            <radialGradient id={`balloonGrad${bi}`} cx="38%" cy="28%" r="62%">
                              <stop offset="0%" stopColor={balloon.highlight} />
                              <stop offset="100%" stopColor={balloon.color} />
                            </radialGradient>
                          </defs>
                          <ellipse cx="24" cy="24" rx="20" ry="24" fill={`url(#balloonGrad${bi})`} opacity="0.8" />
                          <ellipse cx="31" cy="15" rx="6" ry="8" fill="rgba(255,255,255,0.3)" transform="rotate(-25 31 15)" />
                          <path d="M24 48 Q23 52 21.5 56 Q24 54 26.5 56 Q25 52 24 48" fill={balloon.color} opacity="0.65" />
                          <path d={`M24 56 C${22 - bi % 3} 62 ${26 + bi % 2} 68 ${23 + bi % 4} 77`} stroke={balloon.color} strokeWidth="0.7" fill="none" opacity="0.45" strokeLinecap="round" />
                        </svg>
                      </div>
                    ))}
                  </div>
                ) : null}

                {index === 5 ? (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-[120px]" style={{ background: 'rgba(251, 191, 36, 0.08)' }} />
                    <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-[120px]" style={{ background: 'rgba(168, 85, 247, 0.12)' }} />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/2 h-1/2 rounded-full blur-[100px]" style={{ background: 'rgba(139, 92, 246, 0.06)' }} />
                  </div>
                ) : null}

                <motion.div
                  className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8"
                  {...(index !== 0 ? {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-100px" },
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  } : {})}
                >
                  {index === 0 ? (
                    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={countdown}
                          initial={{ opacity: 0, scale: 0.5, y: 30 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 1.5, y: -30 }}
                          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                          className="text-8xl font-bold text-white font-[family-name:var(--font-cute)] sm:text-9xl"
                          aria-live="polite"
                        >
                          {countdown}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : index === 1 ? (
                    <div className="flex min-h-[70vh] flex-col items-center justify-center pt-2 pb-16 text-center w-full z-40 relative">
                      <PolaroidGreeting />
                    </div>
                  ) : index === 2 ? (
                    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] py-4">
                      <p
                        className={`w-fit border-b-2 pb-2 mb-6 text-sm font-semibold uppercase tracking-[0.24em] ${project.accent}`}
                      >
                        Project {String(index + 1).padStart(2, "0")}
                      </p>

                      {/* DIY Craft Tilted Notebook Paper Note */}
                      <div className="notebook-paper relative w-full max-w-4xl min-h-[75vh] rounded-md p-12 sm:p-16 text-slate-800 border border-slate-300 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out flex flex-col justify-between">

                        {/* Decorative Washi Tape (Top Center & Top Right) */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-amber-200/80 border border-amber-300/60 shadow-sm rotate-1 flex items-center justify-center pointer-events-none">
                          <span className="text-[10px] tracking-widest text-amber-800/60 uppercase font-semibold">washi tape</span>
                        </div>
                        <div className="absolute -top-2 right-8 w-24 h-6 bg-pink-200/80 border border-pink-300/60 shadow-sm -rotate-6 pointer-events-none" />

                        {/* DIY Craft Push Pins (Top Left & Top Right) */}
                        <div className="absolute top-4 left-4 z-20 flex items-center justify-center">
                          <div className="size-6 rounded-full bg-rose-500 shadow-md border-2 border-rose-300 flex items-center justify-center">
                            <div className="size-2 rounded-full bg-rose-200" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 z-20 flex items-center justify-center">
                          <div className="size-6 rounded-full bg-violet-500 shadow-md border-2 border-violet-300 flex items-center justify-center">
                            <div className="size-2 rounded-full bg-violet-200" />
                          </div>
                        </div>

                        {/* Red Notebook Margin Line */}
                        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-rose-400/70 pointer-events-none" />

                        {/* DIY Dog-Eared Folded Corner */}
                        <div className="absolute bottom-0 right-0 w-12 h-12 bg-slate-200 border-l border-t border-slate-300 shadow-sm rounded-tl-md pointer-events-none" />

                        <div>
                          <h3 className="text-4xl font-bold text-purple-950 font-[family-name:var(--font-cute)] mb-6 pl-8 pt-2">
                            Happy Birthday!
                          </h3>
                          <div className="pl-8 pr-4 space-y-6 font-[family-name:var(--font-cute)] text-[1.6rem] leading-[2.2rem] sm:text-2xl sm:leading-[2.4rem] text-slate-700">
                            <p>It's your day, baby! Happiest birthday to you, my pretty princess.</p>
                            <p>I'm so glad I get to be a part of your celebration this year, and even more grateful to call myself someone special to you. A year isn't very long, but I'm thankful for everything we've done and shared in our time together. Every moment with you feels amazing and exciting, no matter how simple it is. You've grown, learned, and pushed through things you doubted yourself about — and through all of it, I stayed grounded and believed in you, baby.</p>
                            <p>To my favorite teasing enemy, my small eater, my smarty-pants princess, my little menace who kicks and punches me for no reason, and my most supportive person — I wish you the best in every way, always. You're a ray of sunshine to me and to everyone around you. Your captivating smile brings joy to everyone, and the energy you bring lights up every room.</p>
                            <p className="italic font-semibold text-purple-800">Proverbs 31:29</p>
                          </div>
                        </div>

                        <div className="pl-8 pt-8 flex items-center justify-end font-[family-name:var(--font-cute)] text-2xl font-bold text-purple-900 border-t border-slate-200/80 mt-8">
                          <span className="text-purple-800 italic pr-4">Sean</span>
                        </div>
                      </div>
                    </div>
                  ) : index === 4 ? (
                    <ImageTrailCursor className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
                      {/* Soft ambient blurs to add depth without being dark */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                        <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] bg-white/40 rounded-full blur-[80px]" />
                        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] min-w-[400px] bg-pink-100/40 rounded-full blur-[100px]" />
                      </div>

                      {/* Floating Cute Background Symbols (Scattered widely across the section) */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                        <motion.div className="absolute top-[8%] left-[6%] text-4xl opacity-60" animate={{ y: [0, -15, 0], rotate: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>💖</motion.div>
                        <motion.div className="absolute bottom-[12%] left-[10%] text-5xl opacity-50" animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>✨</motion.div>
                        <motion.div className="absolute top-[15%] right-[8%] text-4xl opacity-70" animate={{ y: [0, 10, 0], rotate: [0, 20, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>🎀</motion.div>
                        <motion.div className="absolute bottom-[10%] right-[5%] text-5xl opacity-60" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>🌸</motion.div>
                        <motion.div className="absolute top-[45%] left-[3%] text-3xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>⭐</motion.div>
                        <motion.div className="absolute top-[35%] right-[3%] text-3xl opacity-60" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>🎈</motion.div>
                        <motion.div className="absolute bottom-[35%] left-[4%] text-4xl opacity-40" animate={{ y: [0, 15, 0], rotate: [-5, 5, -5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>💖</motion.div>
                        <motion.div className="absolute top-[8%] right-[25%] text-2xl opacity-50" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>✨</motion.div>
                        <motion.div className="absolute bottom-[20%] right-[30%] text-4xl opacity-50" animate={{ rotate: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>🎀</motion.div>
                        <motion.div className="absolute top-[75%] left-[25%] text-5xl opacity-40" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>🌸</motion.div>
                      </div>

                      {/* Cute Minimalist Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-3xl pointer-events-none">
                        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-purple-900 font-[family-name:var(--font-cute)] drop-shadow-sm">
                          Trail of Memories
                        </h2>
                      </div>
                    </ImageTrailCursor>
                  ) : index === 5 ? (
                    <div className="w-full relative overflow-visible flex flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-24">
                      {/* Left side: Scratch Reveal Space */}
                      <div className="w-1/2 flex flex-col items-start justify-center text-left relative z-10 pl-4 sm:pl-8 lg:pl-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 text-pink-600 font-[family-name:var(--font-cute)] drop-shadow-sm max-w-lg">
                          Scratch for Your Surprise! ✨
                        </h2>

                        {/* Cute Polaroid Wrapper for Scratch Component */}
                        <motion.div
                          className="relative z-10 flex flex-col items-center w-full max-w-[420px] sm:max-w-[480px] bg-[#fffdf7] p-5 sm:p-6 pb-10 sm:pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm cursor-pointer border border-slate-100 mt-8 mx-auto"
                          initial={{ rotate: -2, y: 30, opacity: 0 }}
                          whileInView={{ rotate: -2, y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ rotate: 0, scale: 1.02 }}
                          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        >
                          {/* Peeking Character: Snoopy (Top-Left) */}
                          <motion.div
                            className="absolute -top-[60px] sm:-top-[80px] left-2 sm:left-4 w-20 sm:w-28 z-15 pointer-events-auto"
                            style={{ filter: "drop-shadow(0 -4px 8px rgba(0,0,0,0.12))" }}
                            animate={{ y: [0, -4, 0], rotate: [-1, 1, -1] }}
                            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <img src="/card_image_copy/snoopy-removebg-preview.png" alt="Snoopy Peeking" className="w-full h-auto block pointer-events-none" draggable={false} />
                          </motion.div>

                          {/* Washi Tape (Centered Top) */}
                          <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-8 sm:h-10 bg-amber-100/90 shadow-sm z-20 flex items-center justify-center overflow-hidden rotate-[2deg] mix-blend-multiply">
                            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#f472b6_10px,#f472b6_20px,transparent_20px,transparent_30px,#60a5fa_30px,#60a5fa_40px)]" />
                          </div>

                          {/* Peeking Character: Kuromi (Top-Right) */}
                          <motion.div
                            className="absolute -top-[58px] sm:-top-[82px] right-2 sm:right-4 w-24 sm:w-32 z-15 pointer-events-auto"
                            style={{ filter: "drop-shadow(0 -4px 10px rgba(0,0,0,0.14))" }}
                            animate={{ y: [0, -5, 0], rotate: [2, -2, 2] }}
                            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <img src="/card_image_copy/korumi-removebg-preview.png" alt="Kuromi Peeking" className="w-full h-auto block pointer-events-none" draggable={false} />
                          </motion.div>

                          {/* Peeking Character: Chiikawa (Left-Side) */}
                          <motion.div
                            className="absolute top-[30%] left-0 w-20 sm:w-28 z-25 pointer-events-auto origin-right"
                            style={{ filter: "drop-shadow(-5px 5px 12px rgba(0,0,0,0.18))" }}
                            initial={{ x: "-90%" }}
                            animate={{ x: ["-90%", "-95%", "-90%"], rotate: [-1, 1.5, -1] }}
                            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <img src="/card_image_copy/chiikawa-removebg-preview.png" alt="Chiikawa Peeking" className="w-full h-auto block pointer-events-none" draggable={false} />
                          </motion.div>

                          {/* Peeking Character: Hello Kitty (Right-Side) */}
                          <motion.div
                            className="absolute top-[40%] right-0 w-24 sm:w-32 z-25 pointer-events-auto origin-left"
                            style={{ filter: "drop-shadow(5px 5px 12px rgba(0,0,0,0.18))" }}
                            initial={{ x: "65%" }}
                            animate={{ x: ["65%", "70%", "65%"], rotate: [1.5, -1.5, 1.5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <img src="/card_image_copy/hellokitty-removebg-preview.png" alt="Hello Kitty Peeking" className="w-full h-auto block pointer-events-none" draggable={false} />
                          </motion.div>

                          {/* Scratch Component Inner Container */}
                          <div className="relative border-2 border-dashed border-slate-300 p-2 bg-slate-50">
                            <ScratchToReveal
                              key={scratchKey}
                              width={380}
                              height={380}
                              minScratchPercentage={25}
                              scratchRadius={50}
                              gradientColors={["#fbcfe8", "#c4b5fd", "#bae6fd"]}
                              onComplete={() => {
                                confetti({ particleCount: 150, spread: 100, origin: { x: 0.5, y: 0.6 }, colors: ['#a855f7', '#d8b4fe', '#fbbf24', '#f472b6', '#60a5fa'] });
                                setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { x: 0.3, y: 0.5 }, colors: ['#fbbf24', '#f472b6', '#34d399'] }), 250);
                                setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { x: 0.7, y: 0.5 }, colors: ['#60a5fa', '#e879f9', '#fbbf24'] }), 500);
                              }}
                            >
                              <div className="flex flex-col items-center justify-center text-center h-[380px] w-[380px] bg-white overflow-hidden relative">
                                <img src={currentSurpriseImage} alt="Surprise Image" className="w-full h-full object-cover object-left" />
                              </div>
                            </ScratchToReveal>
                          </div>

                          {/* Polaroid Text (Date / Caption) */}
                          <div className="w-full mt-4 flex justify-center items-end font-[family-name:var(--font-cute)] text-slate-700 px-3">
                            <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase opacity-85 text-pink-500">SCRATCH ME!</span>
                          </div>
                        </motion.div>

                        {/* Reset Scratch Button */}
                        <button
                          onClick={() => setScratchKey((prev) => prev + 1)}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-pink-500 hover:bg-pink-400 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 border border-pink-300 active:scale-95 cursor-pointer"
                        >
                          <span>Scratch Again</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>

                      {/* Right side: Interactive Gift Box */}
                      <div className="w-1/2 flex flex-col items-end justify-center relative z-10 pr-0 sm:pr-2 lg:pr-4">
                        <div className="w-full max-w-[480px] h-[460px] sm:h-[500px] md:h-[540px] relative flex items-center justify-center pointer-events-auto ml-auto translate-x-4 lg:translate-x-8">
                          <InteractiveGiftBox3D />
                        </div>
                      </div>
                    </div>
                  ) : index === 3 ? (
                    <div className="w-full flex items-center justify-center pointer-events-auto">
                      <InteractiveCake />
                    </div>
                  ) : (
                    <>
                      <p
                        className={`w-fit border-b-2 pb-2 text-sm font-semibold uppercase tracking-[0.24em] ${project.accent}`}
                      >
                        Project {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="max-w-3xl">
                        <h2 className="text-5xl font-bold leading-tight sm:text-7xl">
                          {project.title}
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg leading-8 opacity-85 sm:text-xl">
                          A full-height project section with its own purple shade,
                          ready for photos, details, links, or birthday memories.
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* SVG Wave Section Divider */}
                {index > 0 && index < 5 && index !== 1 && (
                  <div className="absolute bottom-0 left-0 w-full z-20" style={{ lineHeight: 0 }}>
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block h-[50px] sm:h-[70px] md:h-[90px]">
                      <path
                        d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z"
                        fill={sectionBgColors[index + 1]}
                      />
                    </svg>
                  </div>
                )}
              </section>

              {/* React Bits Text Loop ribbon bridging between Section 2 and Section 3 */}
              {index === 1 && (
                <div className="relative z-30 w-full pointer-events-none" style={{ height: 0, overflow: 'visible' }}>
                  <div style={{ transform: 'translateY(-50%)' }}>
                    <TextLoop />
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
    </main>
  );
}
