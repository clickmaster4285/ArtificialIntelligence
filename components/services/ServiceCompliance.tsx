// src/components/services/ServiceCompliance.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

interface ServiceComplianceProps {
  data: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };
  className?: string;
}

export function ServiceCompliance({ data, className }: ServiceComplianceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  const complianceIcons = [
    "🔒",
    "🛡️",
    "📋",
    "⚡",
    "🔐",
    "✅",
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative py-24 md:py-32 overflow-hidden",
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-violet-500/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
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

      {/* Animated Orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"
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
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none"
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

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div 
        className="mx-auto max-w-[92vw] sm:max-w-[84vw] px-4 sm:px-6 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl">
          {/* Header - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-eyebrow text-violet-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-8 h-px bg-gradient-to-r from-violet-400 to-transparent" />
              Compliance & Security
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
                {data.title}
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-white/60 max-w-2xl text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.description}
            </motion.p>
          </motion.div>

          {/* Cards Grid with Flip Animation - Increased height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.items.map((item, index) => {
              const isFlipped = flippedIndex === index;
              const icon = complianceIcons[index % complianceIcons.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.08 * index,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="relative h-[280px] cursor-pointer perspective-1000"
                  onMouseEnter={() => setFlippedIndex(index)}
                  onMouseLeave={() => setFlippedIndex(null)}
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ 
                      rotateY: isFlipped ? 180 : 0,
                      scale: isFlipped ? 1.02 : 1,
                    }}
                    transition={{ 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front Face */}
                    <motion.div
                      className="absolute inset-0 glass rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-all duration-500 backdrop-blur-sm bg-white/5 overflow-hidden"
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)"
                      }}
                    >
                      {/* Animated gradient bar */}
                      <motion.div 
                        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                      />
                      
                      {/* Glow effect on hover */}
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{ opacity: isFlipped ? 0.5 : 0 }}
                      />

                      <div className="relative flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-3">
                          <motion.div 
                            className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-2xl border border-violet-500/20"
                            animate={{ 
                              scale: isFlipped ? 1.1 : 1,
                              rotate: isFlipped ? 10 : 0
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {icon}
                          </motion.div>
                          <h3 className="text-lg font-semibold text-white pt-1">
                            {item.title}
                          </h3>
                        </div>
                        
                        <p className="text-sm text-white/60 leading-relaxed flex-1">
                          {item.description}
                        </p>

                        {/* Flip indicator */}
                        <motion.div 
                          className="mt-3 text-xs text-white/30 flex items-center gap-1"
                          animate={{ opacity: isFlipped ? 0 : 0.5 }}
                        >
                          <span>Hover to flip</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Back Face */}
                    <motion.div
                      className="absolute inset-0 glass rounded-2xl p-6 border border-violet-500/30 backdrop-blur-sm bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-orange-500/10 overflow-hidden"
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl" />
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-2xl" />
                      
                      <div className="relative h-full flex flex-col justify-center items-center text-center">
                        <motion.div 
                          className="text-4xl mb-4"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: isFlipped ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        >
                          🔐
                        </motion.div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {item.description}
                        </p>
                        <motion.div 
                          className="mt-4 inline-flex items-center gap-2 text-xs text-violet-400"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5,
                            repeat: isFlipped ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        >
                          <span>✓ Security Verified</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}