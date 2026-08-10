// src/components/services/ServiceOverview.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';
import { Layers, Sparkles, Zap, Box } from 'lucide-react';

interface ServiceOverviewProps {
  data: {
    title: string;
    content: string;
    stats?: {
      label: string;
      value: string;
      description?: string;
    }[];
  };
  className?: string;
}

export function ServiceOverview({ data, className }: ServiceOverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative py-24 md:py-32 overflow-hidden",
        className
      )}
    >
      {/* Background with gradient matching heading colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      
      {/* Animated gradient overlay matching heading colors */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-fuchsia-900/20 to-orange-900/20 pointer-events-none" />
      
      {/* Floating Particles with matching colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(232, 121, 249, 0.2))`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs matching heading colors */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* UPDATED: Same padding as HeroSection - px-8 with lg:pl-48 for left padding */}
      <motion.div 
        className="mx-auto px-8 w-full relative z-10 lg:pl-48 lg:pr-4"
        style={{ opacity, scale }}
      >
        {/* ========================================= */}
        {/* GRID LAYOUT: LEFT (Content) / RIGHT (Graphic) */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: Content (Spans 7 cols) */}
          {/* ========================================= */}
          <div className="lg:col-span-7">
            
            {/* Overview Badge with Glow */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <motion.span 
                className="inline-flex items-center gap-2 text-eyebrow text-violet-400"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-8 h-px bg-gradient-to-r from-violet-400 to-transparent" />
                <span className="relative">
                  Overview
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-400 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </motion.span>
            </motion.div>

            {/* Title with Gradient and Animation */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
                {data.title}
              </span>
            </motion.h2>

            {/* Content with Line Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-violet-500/50 via-fuchsia-500/30 to-orange-500/20"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <div className="pl-8">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
                  {data.content}
                </p>
              </div>
            </motion.div>

            {/* Stats with 3D Hover Effect */}
            {data.stats && data.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {data.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="group relative"
                  >
                    {/* Glow effect on hover matching heading colors */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative glass rounded-2xl p-8 text-center border border-white/5 hover:border-violet-500/30 transition-all duration-500 backdrop-blur-sm bg-white/5 min-h-[180px] flex flex-col items-center justify-center">
                      {/* Icon/Decoration */}
                      <motion.div
                        className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        whileHover={{ scale: 1.2 }}
                      />
                      
                      <motion.div
                        className="text-4xl md:text-5xl font-bold mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                          {stat.value}
                        </span>
                      </motion.div>
                      
                      <div className="text-sm font-medium text-white/80">{stat.label}</div>
                      {stat.description && (
                        <div className="text-xs text-white/40 mt-2">{stat.description}</div>
                      )}
                      
                      {/* Animated underline on hover matching heading colors */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 group-hover:w-3/4 transition-all duration-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: "75%" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: Visual Graphic (Spans 5 cols) */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center h-full relative w-full"
          >
            {/* Background Glow for the Graphic */}
            <div className="absolute inset-0 bg-violet-600/20 blur-[100px] rounded-full" />
            <div className="absolute -inset-4 bg-gradient-to-br from-fuchsia-600/10 to-orange-500/10 blur-[80px] rounded-full" />

            {/* 3D Stacked Knowledge Base */}
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center perspective-[1200px]">
              
              {/* Floating abstract elements (Background) */}
              <motion.div
                className="absolute text-4xl font-bold text-violet-500/20"
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: '5%', right: '0%' }}
              >
                <Sparkles className="w-12 h-12" />
              </motion.div>
              
              <motion.div
                className="absolute text-4xl font-bold text-orange-500/20"
                animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ bottom: '10%', left: '0%' }}
              >
                <Zap className="w-10 h-10" />
              </motion.div>

              {/* 3D Rotating Glass Stack */}
              <div className="relative w-48 h-48" style={{ transformStyle: "preserve-3d" }}>
                
                {/* Layer 1 (Bottom Back) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-violet-900/20"
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 45],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ 
                    transform: "translateZ(-60px) rotateX(15deg)", 
                    transformStyle: "preserve-3d" 
                  }}
                >
                  <Box className="w-12 h-12 text-white/20" />
                </motion.div>

                {/* Layer 2 (Middle) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/15 to-orange-500/10 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-xl shadow-fuchsia-900/20"
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, -45],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3,
                  }}
                  style={{ 
                    transform: "translateZ(0px) rotateY(10deg)", 
                    transformStyle: "preserve-3d" 
                  }}
                >
                  <Layers className="w-14 h-14 text-violet-300/60" />
                </motion.div>

                {/* Layer 3 (Top Front - Main Focus) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-orange-500/15 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-violet-500/20"
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 60],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 6,
                  }}
                  style={{ 
                    transform: "translateZ(60px) rotateX(-10deg)", 
                    transformStyle: "preserve-3d" 
                  }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/40">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    {/* Pulsing ring around the center */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-violet-400/30"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Bottom floating text */}
              <motion.div
                className="absolute -bottom-8 text-sm text-white/40 font-medium tracking-widest uppercase"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Scalable & Secure Architecture
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}