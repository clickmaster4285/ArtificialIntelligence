'use client';

// components/sections/HeroSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { FloatingObjects } from '@/components/locations/sections/FloatingObjects';
import { Shimmer } from '@/components/locations/sections/Shimmer';

interface HeroSectionProps {
  tagline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  startingPrice?: string;
  badge?: string;
  stats?: { label: string; value: string; description?: string }[];
  industries?: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaLink,
  startingPrice,
  badge,
  stats,
  industries,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  // --- SLIDING VIDEO CAROUSEL LOGIC ---
  const [isVideo1Front, setIsVideo1Front] = useState(true);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Swap which card is in front every 7000ms (7 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVideo1Front((prev) => !prev);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Control Play, Pause, and Reset based on which card is in the Front position
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    if (v1 && v2) {
      if (isVideo1Front) {
        // Card 1 is Front: Play 1, Pause & Reset 2
        v1.play().catch(() => {});
        v2.pause();
        v2.currentTime = 0;
      } else {
        // Card 2 is Front: Play 2, Pause & Reset 1
        v2.play().catch(() => {});
        v1.pause();
        v1.currentTime = 0;
      }
    }
  }, [isVideo1Front]);

  // --- MAXIMIZED WIDTH & HEIGHT POSITIONS ---
  const frontPosition = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 20,
    scale: 1,
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.5)',
    borderWidth: '2px',
  };

  const backPosition = {
    top: '6%',     
    left: '4%',    
    width: '98%',  
    height: '98%', 
    zIndex: 10,
    scale: 0.98,
    boxShadow: '0px 10px 30px -12px rgba(0, 0, 0, 0.3)',
    borderWidth: '2px',
  };

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden min-h-[800px] flex items-center">
      <FloatingObjects variant="hero" />

      <div className="relative z-10 mx-auto px-8 w-full">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:pl-48 lg:pr-4"
          >
            {/* === UPDATED EYEBROW (Line + Uppercase) === */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
              whileHover={{ scale: 1.02 }}
            >
              <span className="w-8 h-px bg-violet-400/70" />
              {tagline}
            </motion.div>

            {/* === UPDATED TITLE (Purple -> Pink -> Orange Gradient) === */}
            <motion.div 
              className="mt-4"
              variants={itemVariants}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
                <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            </motion.div>

            {/* Badge */}
            {badge && (
              <motion.div variants={itemVariants} className="mt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-violet-400 bg-violet-500/10">
                  <Shield className="w-3 h-3" />
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.a
                href={ctaLink}
                whileHover={{ y: -3, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ y: 0 }}
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-600 text-white font-medium shadow-lg shadow-violet-900/40 transition-all duration-300"
              >
                <Shimmer />
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}
                  <Sparkles className="w-4 h-4" />
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
              </motion.a>
              {startingPrice && (
                <span className="text-sm text-white/50">
                  From <span className="text-white font-semibold">{startingPrice}</span>
                </span>
              )}
            </motion.div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-5 max-w-2xl"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-xl bg-white/5 backdrop-blur-sm text-left hover:bg-white/10 transition-colors"
                  >
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                    {stat.description && (
                      <div className="text-xs text-white/40 mt-1">{stat.description}</div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Industries */}
            {industries && industries.length > 0 && (
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-3">
                <span className="text-sm text-white/50 mr-1">Serving:</span>
                {industries.map((industry, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/70"
                  >
                    {industry}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: SLIDING VIDEO STACK - INCREASED SIZE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex lg:justify-center lg:items-center h-full relative w-full lg:pl-4"
          >
            {/* Background Glow Effect - INCREASED SIZE */}
            <div className="absolute -inset-20 bg-emerald-500/20 blur-3xl rounded-full animate-pulse pointer-events-none" />
            <div className="absolute -inset-32 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

            {/* Floating Container - INCREASED WIDTH & HEIGHT */}
            <div className="relative w-full max-w-[700px] aspect-[4/5] animate-[float_6s_ease-in-out_infinite] transition-all duration-500">
              
              {/* VIDEO 1 */}
              <motion.div
                className="absolute rounded-3xl overflow-hidden border-white/20 shadow-2xl"
                animate={isVideo1Front ? frontPosition : backPosition}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                whileHover={{ scale: isVideo1Front ? 1.05 : 1.02, rotate: 2, zIndex: 30 }}
              >
                <video 
                  ref={video1Ref}
                  className="w-full h-full object-cover"
                  muted 
                  playsInline
                >
                  <source src="/video/location1.mp4" type="video/mp4" />
                </video>
                <div className="absolute -inset-2 -z-10 rounded-3xl border-[3px] border-white/40" />
              </motion.div>

              {/* VIDEO 2 */}
              <motion.div
                className="absolute rounded-3xl overflow-hidden border-white/20 shadow-2xl"
                animate={isVideo1Front ? backPosition : frontPosition}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                whileHover={{ scale: !isVideo1Front ? 1.05 : 1.02, rotate: -2, zIndex: 30 }}
              >
                <video 
                  ref={video2Ref}
                  className="w-full h-full object-cover"
                  muted 
                  playsInline
                >
                  <source src="/video/location2.mp4" type="video/mp4" />
                </video>
              </motion.div>

              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-15px); }
                }
              `}</style>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};