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

  // Animated graphic data - Price trend visualization
  const pricePoints = [
    { x: 0, y: 60, label: 'Basic' },
    { x: 25, y: 40, label: 'Standard' },
    { x: 50, y: 70, label: 'Professional' },
    { x: 75, y: 30, label: 'Enterprise' },
    { x: 100, y: 50, label: 'Custom' },
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative py-24 md:py-32 overflow-hidden",
        className
      )}
    >
      {/* BLACK BACKGROUND - Updated to pure black */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-black to-fuchsia-950/20 pointer-events-none" />
      
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
        className="mx-auto px-8 w-full relative z-10 lg:pl-48 lg:pr-4"
        style={{ opacity }}
      >
        <div className="max-w-7xl">
          {/* Header Section - Left Aligned with Graphic */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Left Column - Title and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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

            {/* Right Column - Animated Visual Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-64 md:h-72 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-orange-500/5 rounded-2xl border border-white/5 overflow-hidden"
            >
              {/* Graph Background Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }} />
              </div>

              {/* Graph Area */}
              <div className="absolute inset-0 p-6">
                {/* Y-Axis Labels */}
                <div className="absolute left-2 top-2 text-xs text-white/20">High</div>
                <div className="absolute left-2 bottom-8 text-xs text-white/20">Low</div>

                {/* Price Line with Gradient */}
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#D946EF" />
                      <stop offset="100%" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill under the line */}
                  <motion.path
                    d={`
                      M 0,${200 - pricePoints[0].y}
                      ${pricePoints.map((p, i) => `
                        L ${p.x * 4},${200 - p.y}
                      `).join('')}
                      L ${pricePoints[pricePoints.length - 1].x * 4},200
                      L 0,200
                      Z
                    `}
                    fill="url(#areaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />

                  {/* Main Price Line */}
                  <motion.polyline
                    points={pricePoints.map(p => `${p.x * 4},${200 - p.y}`).join(' ')}
                    fill="none"
                    stroke="url(#priceGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                  />

                  {/* Data Points with Pulses */}
                  {pricePoints.map((point, index) => (
                    <g key={index}>
                      <motion.circle
                        cx={point.x * 4}
                        cy={200 - point.y}
                        r="6"
                        fill="#8B5CF6"
                        stroke="#fff"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      />
                      <motion.circle
                        cx={point.x * 4}
                        cy={200 - point.y}
                        r="12"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + index * 0.1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Labels */}
                      <text
                        x={point.x * 4}
                        y={210 - point.y}
                        textAnchor="middle"
                        className="text-[8px] fill-white/40"
                      >
                        {point.label}
                      </text>
                    </g>
                  ))}

                  {/* Animated Scanner Line */}
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="200"
                    stroke="rgba(139, 92, 246, 0.2)"
                    strokeWidth="1"
                    initial={{ x1: 0, x2: 0 }}
                    animate={{
                      x1: [0, 400, 0],
                      x2: [0, 400, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </svg>

                {/* Floating value indicators */}
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-medium"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ⚡ Market Value
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Table Section - Full width below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
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
                        transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {data.note}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}