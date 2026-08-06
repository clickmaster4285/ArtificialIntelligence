"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";

interface ApplicationItem {
  title: string;
  description: string;
  keyFeatures?: string[];
  technicalApproach?: string;
  typicalOutcome?: string;
}

interface ServiceApplicationsProps {
  data: {
    title: string;
    description?: string;
    items: ApplicationItem[];
  };
  className?: string;
}

/** Advanced 3D card with enhanced animations */
function ApplicationCard({ item, index }: { item: ApplicationItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Enhanced 3D transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -15]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index % 2 === 0 ? [-15, 0, 10] : [15, 0, -10],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 0.9]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.4]);
  const glare = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0, 0.45]);

  return (
    <div 
      style={{ perspective: 1400 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          scale,
          z,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 backdrop-blur-xl transition-all duration-700 hover:border-violet-500/40"
      >
        {/* Advanced hover glow */}
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-orange-500/30 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
        
        {/* Animated border gradient */}
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-500/0 via-fuchsia-500/50 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Scroll-linked glare sweep */}
        <motion.div
          style={{ opacity: glare }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Top gradient bar */}
        <motion.span 
          className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Corner decorations */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-violet-500/10 blur-xl group-hover:bg-violet-500/20 transition-all duration-500" />
        <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-fuchsia-500/10 blur-xl group-hover:bg-fuchsia-500/20 transition-all duration-500" />

        <div className="relative flex items-start gap-5" style={{ transform: "translateZ(60px)" }}>
          <motion.span 
            className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-6xl font-bold leading-none tracking-tight text-transparent"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <div>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors duration-500">
              {item.title}
            </h3>
            <div className="mt-1 h-0.5 w-12 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full group-hover:w-20 transition-all duration-500" />
          </div>
        </div>

        <motion.p 
          className="relative mt-5 text-base leading-relaxed text-white/60"
          style={{ transform: "translateZ(30px)" }}
        >
          {item.description}
        </motion.p>

        {item.keyFeatures && item.keyFeatures.length > 0 && (
          <motion.div 
            className="relative mt-7"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
              <motion.span 
                className="h-1.5 w-1.5 rounded-full bg-violet-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Key Features
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {item.keyFeatures.map((feature, fi) => (
                <motion.li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-relaxed text-white/70"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: fi * 0.05 }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {(item.technicalApproach || item.typicalOutcome) && (
          <motion.div 
            className="relative mt-7 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2"
            style={{ transform: "translateZ(10px)" }}
          >
            {item.technicalApproach && (
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
                  Technical Approach
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.technicalApproach}
                </p>
              </motion.div>
            )}
            {item.typicalOutcome && (
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
                  Typical Outcome
                </div>
                <p className="mt-2 text-sm leading-relaxed text-emerald-400/70">
                  {item.typicalOutcome}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Hover indicator */}
        <motion.div 
          className="absolute bottom-4 right-4 text-xs text-white/20"
          animate={{ opacity: isHovered ? 0.5 : 0.2 }}
        >
          {isHovered ? "✦ Interactive" : "✦ Hover me"}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ServiceApplications({ data, className }: ServiceApplicationsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.3, 1, 1, 0.4]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (i * 37 + 13) % 100,
        y: (i * 53 + 7) % 100,
        size: 1 + ((i * 7 + 3) % 4),
        duration: 10 + ((i * 3 + 5) % 15),
        delay: (i % 7) * 0.6,
      })),
    [],
  );

  // Circuit-like decorative lines
  const circuitLines = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x1: 5 + (i * 16),
        y1: 10 + (i * 12) % 80,
        x2: 15 + (i * 14),
        y2: 20 + (i * 10) % 70,
      })),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden py-28", className)}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0618] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      
      {/* Animated gradient orbs - Left */}
      <motion.div
        style={{ y: orbY, scale: orbScale }}
        className="pointer-events-none absolute -left-32 top-20 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[150px]"
      />
      
      {/* Animated gradient orbs - Right */}
      <motion.div
        style={{ y: orbY, scale: orbScale }}
        className="pointer-events-none absolute -right-32 bottom-20 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[150px]"
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none" />

      {/* Advanced grid pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal circuit lines */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.05]">
        {circuitLines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="#a78bfa"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: line.id * 0.3, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0 ? '#a78bfa' : p.id % 3 === 1 ? '#e879f9' : '#fb923c',
            }}
            animate={{ 
              y: [0, -40, 0], 
              x: [0, 20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-[14px]">
        {/* Header - Left Aligned */}
        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-violet-400 backdrop-blur">
            <motion.span 
              className="h-1.5 w-1.5 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Applications
          </div>
          <motion.h2 
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
              {data.title}
            </span>
          </motion.h2>
          {data.description && (
            <motion.p 
              className="mt-5 text-lg leading-relaxed text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.description}
            </motion.p>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {data.items.map((item, index) => (
            <ApplicationCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Bottom decorative indicator */}
        <motion.div 
          className="mt-20 flex justify-center items-center gap-4 text-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}