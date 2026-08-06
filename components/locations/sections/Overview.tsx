// components/locations/sections/Overview.tsx
'use client';

import React, { useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { Award, Zap, TrendingUp, Users } from 'lucide-react';

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

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Cycle through icons for variety if you have more stats
  const getStatIcon = (index: number) => {
    const icons = [Award, Zap, TrendingUp, Users];
    const Icon = icons[index % icons.length];
    return <Icon className="w-5 h-5" />;
  };

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start"
        >
          {/* LEFT: Content */}
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
              className="mt-8 space-y-5 text-ink-soft leading-relaxed"
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

          {/* RIGHT: Interactive Stats Cards */}
          {stats && stats.length > 0 && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.2 } 
                  }}
                  className="group relative p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-md hover:border-violet-500/40 transition-all duration-500"
                >
                  {/* Inner glowing overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-1">
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-base font-medium text-ink-mute group-hover:text-violet-300 transition-colors duration-300">
                        {stat.label}
                      </div>
                      {stat.description && (
                        <div className="text-sm text-ink-mute/60 max-w-[200px]">
                          {stat.description}
                        </div>
                      )}
                    </div>
                    
                    {/* Glass Icon Container */}
                    <motion.div 
                      className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-400 border border-white/10 shadow-lg shadow-violet-900/20 group-hover:scale-110 group-hover:border-violet-500/50 transition-all duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {getStatIcon(index)}
                    </motion.div>
                  </div>

                  {/* Bottom decorative bar */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent group-hover:w-full transition-all duration-700 ease-in-out" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ✅ Default export for flexibility
export default OverviewSection;