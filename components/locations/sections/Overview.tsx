// components/locations/sections/Overview.tsx
'use client';

import React, { useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { Award, Zap, TrendingUp, Stethoscope, GraduationCap, Microscope, Activity, HeartPulse } from 'lucide-react';

interface OverviewSectionProps {
  title: string;
  content: string;
  stats?: { label: string; value: string; description?: string }[];
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  title,
  content,
  stats,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Color palettes to cycle through on hover
  const hoverColors = [
    { border: 'border-violet-500/40', glow: 'rgba(139, 92, 246, 0.4)', bg: 'from-violet-500/20 to-transparent' },
    { border: 'border-fuchsia-500/40', glow: 'rgba(217, 70, 239, 0.4)', bg: 'from-fuchsia-500/20 to-transparent' },
    { border: 'border-blue-500/40', glow: 'rgba(59, 130, 246, 0.4)', bg: 'from-blue-500/20 to-transparent' },
  ];

  const getStatIcon = (index: number) => {
    const icons = [Award, Zap, TrendingUp];
    const Icon = icons[index % icons.length];
    return <Icon className="w-5 h-5" />;
  };

  // Right side visual elements data
  const visualElements = [
    { icon: Stethoscope, label: 'Healthcare', color: 'from-emerald-400 to-cyan-400', delay: 0.2 },
    { icon: Microscope, label: 'Biotech', color: 'from-violet-400 to-fuchsia-400', delay: 0.4 },
    { icon: GraduationCap, label: 'Higher Ed', color: 'from-blue-400 to-indigo-400', delay: 0.6 },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* === ADVANCED BACKGROUND EFFECTS === */}
      
      {/* 1. Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0418] via-[#140628] to-[#0d0618]" />
      
      {/* 2. Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* 3. Animated Floating Particles */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/5 rounded-full blur-[80px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <div className="relative z-10 mx-auto px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column - Content */}
          <div className="lg:pl-48 lg:pr-4">
            {/* Content */}
            <motion.div variants={itemVariants} className="relative">
              
              {/* Eyebrow Line */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-3 text-eyebrow text-violet-400"
              >
                <span className="w-8 h-px bg-gradient-to-r from-violet-400 to-transparent" />
                <span>Overview</span>
              </motion.div>

              {/* Title with Gradient */}
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-display"
              >
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-200 bg-clip-text text-transparent">
                  {title}
                </span>
              </motion.h2>

              {/* Paragraphs with staggered smooth entrance */}
              <motion.div 
                variants={itemVariants}
                className="mt-8 space-y-5 text-ink-soft leading-relaxed max-w-3xl"
              >
                {content.split('\n\n').map((paragraph: string, index: number) => (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                    className="text-base md:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

              {/* Decorative Gradient Line */}
              <motion.div
                variants={itemVariants}
                className="mt-8 w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
              />
            </motion.div>

            {/* Stats Cards - Single row */}
            {stats && stats.length > 0 && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mt-12 grid grid-cols-3 gap-4 lg:gap-6 max-w-3xl"
              >
                {stats.slice(0, 3).map((stat, index) => {
                  const colorSet = hoverColors[index % hoverColors.length];
                  
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -10, 
                        scale: 1.05,
                        borderColor: colorSet.border.split(' ')[1],
                        boxShadow: `0 0 40px -12px ${colorSet.glow}`,
                        transition: { duration: 0.2 }
                      }}
                      className={`
                        relative text-left p-4 md:p-6 rounded-2xl border border-white/10 
                        bg-white/[0.03] backdrop-blur-md
                        transition-colors duration-300
                        flex flex-col items-start justify-center
                        cursor-default group
                      `}
                    >
                      {/* Glass Reflection Effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
                        initial={{ x: '-100%', y: '-100%' }}
                        whileHover={{ x: '100%', y: '100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />

                      {/* Background Gradient Color Change */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg} opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500`}
                      />

                      {/* Icon */}
                      <motion.div 
                        className="relative mb-2 p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300"
                        whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-violet-400 group-hover:text-white transition-colors duration-300">
                          {getStatIcon(index)}
                        </div>
                      </motion.div>

                      {/* Value */}
                      <div className="relative text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:scale-110 transition-transform duration-300 origin-left">
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="relative text-xs text-white/60 mt-0.5 group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </div>

                      {/* Description */}
                      {stat.description && (
                        <div className="relative text-[10px] text-white/40 mt-0.5 group-hover:text-white/60 transition-colors duration-300">
                          {stat.description}
                        </div>
                      )}

                      {/* Bottom Highlight Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent group-hover:w-full transition-all duration-500 ease-out" />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Right Column - Visual Graphics */}
          <div className="hidden lg:flex lg:flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md"
            >
              {/* Main Orbital Circle */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-violet-500/20"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-4 rounded-full border border-fuchsia-500/20"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-blue-500/20"
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Center Pulse */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <motion.div
                  className="absolute inset-1/4 rounded-full bg-gradient-to-r from-violet-400/20 to-fuchsia-400/20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Central Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm border border-white/10"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Activity className="w-12 h-12 text-violet-300" />
                  </motion.div>
                </div>

                {/* Orbiting Elements */}
                {visualElements.map((element, index) => {
                  const angle = (index * 120) - 90; // 120° apart starting from top
                  const radius = 140;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + element.delay }}
                    >
                      <motion.div
                        className="relative group"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 25 + index * 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer">
                          <div className="relative">
                            <motion.div
                              className={`w-12 h-12 rounded-full bg-gradient-to-br ${element.color} p-0.5`}
                              whileHover={{ scale: 1.15 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="w-full h-full rounded-full bg-[#0a0418] flex items-center justify-center">
                                <element.icon className="w-6 h-6 text-white" />
                              </div>
                            </motion.div>
                            {/* Label Popup */}
                            <motion.div
                              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ y: 5 }}
                              whileHover={{ y: 0 }}
                            >
                              {element.label}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Small decorative dots on rings */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = i * 60;
                  const radius = 130;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={`dot-${i}`}
                      className="absolute w-2 h-2 rounded-full bg-violet-400/40"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>

              {/* Floating Labels */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-8 flex flex-wrap gap-3 justify-center"
              >
                {[
                  { label: 'HIPAA Compliant', color: 'border-emerald-500/30 bg-emerald-500/10' },
                  { label: 'GxP Aligned', color: 'border-violet-500/30 bg-violet-500/10' },
                  { label: 'FERPA Compliant', color: 'border-blue-500/30 bg-blue-500/10' },
                ].map((tag, index) => (
                  <motion.span
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-xs border ${tag.color} text-white/80 backdrop-blur-sm`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  >
                    {tag.label}
                  </motion.span>
                ))}
              </motion.div>

              {/* Animated Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="100"
                  fill="none"
                  stroke="url(#gradientStroke)"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <defs>
                  <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D946EF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ✅ Default export for flexibility
export default OverviewSection;