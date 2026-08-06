// src/components/services/ServicePricing.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface ServicePricingProps {
  data: {
    title: string;
    description?: string;
    items: {
      systemType: string;
      priceRange: string;
      timeline: string;
      primaryOutcome: string;
    }[];
    note?: string;
  };
  className?: string;
}

export function ServicePricing({ data, className }: ServicePricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
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
      {/* Background matching theme */}
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
              opacity: [0.2, 0.5, 0.2],
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

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid Pattern Overlay */}
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
        className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10"
        style={{ opacity }}
      >
        <div className="max-w-5xl">
          {/* Header Section - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-eyebrow text-violet-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-8 h-px bg-gradient-to-r from-violet-400 to-transparent" />
              Investment
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
            
            {data.description && (
              <motion.p 
                className="text-white/60 max-w-2xl text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {data.description}
              </motion.p>
            )}
          </motion.div>

          {/* Table Container with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative group"
          >
            {/* Glow effect behind table */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative glass rounded-2xl overflow-hidden border border-white/5 backdrop-blur-sm bg-white/5">
              {/* Table Header with gradient */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-orange-500/10">
                      <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
                        System Type
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
                        Price Range
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
                        Timeline
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-white/60">
                        Primary Outcome
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.items.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        whileHover={{
                          scale: 1.01,
                          backgroundColor: "rgba(139, 92, 246, 0.05)",
                          transition: { duration: 0.2 }
                        }}
                        className="relative group/row transition-all duration-300 cursor-default"
                      >
                        {/* Animated gradient border on hover */}
                        <motion.td 
                          className="px-6 py-5 text-sm font-medium text-white/80 relative"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="relative z-10">{item.systemType}</span>
                          <motion.div 
                            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-400 via-fuchsia-400 to-orange-300 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
                            initial={{ scaleY: 0 }}
                            whileHover={{ scaleY: 1 }}
                          />
                        </motion.td>
                        
                        <td className="px-6 py-5">
                          <motion.span 
                            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 text-violet-400 font-semibold text-sm"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                            }}
                          >
                            {item.priceRange}
                          </motion.span>
                        </td>
                        
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3
                              }}
                            />
                            <span className="text-sm text-white/60">{item.timeline}</span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-5">
                          <motion.span 
                            className="text-sm text-white/60 flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.primaryOutcome}
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Note with animation - Left Aligned */}
          {data.note && (
            <motion.p 
              className="mt-6 text-sm text-white/40 italic"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {data.note}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}