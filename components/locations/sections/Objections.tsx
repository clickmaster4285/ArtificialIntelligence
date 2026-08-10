// components/locations/sections/Objections.tsx
'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle, CheckCircle2, Shield, XCircle, MessageCircle, ThumbsUp, Sparkles, TrendingUp, Zap, Check } from 'lucide-react';

interface ObjectionItem {
  question: string;
  answer: string;
}

interface ObjectionsSectionProps {
  title: string;
  description?: string;
  items: ObjectionItem[];
}

function ObjectionCard({ item, index }: { item: ObjectionItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-left overflow-hidden hover:border-violet-500/40 transition-all duration-500"
    >
      {/* Expanding "Halo" Ring Glow on Hover */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-violet-500/20 blur-xl pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 4, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="relative flex items-start gap-4">
        {/* Icon Box */}
        <motion.div
          className={`
            relative z-10 p-3 rounded-xl w-fit shrink-0 transition-all duration-300
            ${hovered 
              ? 'bg-violet-500/30 text-violet-300 shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)] border border-violet-400/30' 
              : 'bg-white/5 text-violet-400 border border-white/10'
            }
          `}
        >
          <HelpCircle className="w-5 h-5" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="relative z-10 text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-violet-200">
            {item.question}
          </h3>
          <p className="relative z-10 text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
            {item.answer}
          </p>
        </div>

        {/* Checkmark indicator */}
        <div className="flex-shrink-0 mt-1">
          <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

// Animated Objection Handling Graphic - Optimized
function ObjectionsVisual() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center min-h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Main Graphic Container - Centered with Increased Size */}
        <div className="relative flex flex-col items-center scale-110">
          
          {/* Animated Outer Ring */}
          <motion.div
            className="absolute -inset-8 rounded-full border border-violet-500/10"
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
          
          {/* Animated Second Ring */}
          <motion.div
            className="absolute -inset-4 rounded-full border border-fuchsia-500/10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Shield Icon with Pulse Animation - Increased Size */}
          <motion.div
            className="relative p-10 rounded-3xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent backdrop-blur-sm border border-white/10"
            animate={{
              boxShadow: [
                '0 0 40px -10px rgba(139, 92, 246, 0.2)',
                '0 0 60px -5px rgba(139, 92, 246, 0.4)',
                '0 0 40px -10px rgba(139, 92, 246, 0.2)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glow Behind Shield */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-violet-500/20 blur-2xl"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Shield Icon - Increased Size */}
            <motion.div
              className="relative z-10"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-400/20">
                <Shield className="w-28 h-28 text-violet-300" />
              </div>
            </motion.div>

            {/* Floating Checkmarks - Adjusted Positions */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`check-${i}`}
                className="absolute"
                style={{
                  top: `${20 + i * 30}%`,
                  right: `-${20 + i * 10}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  y: [0, -20, -40, -60],
                } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: 3,
                  delay: 0.5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                  <Check className="w-5 h-5" />
                </div>
              </motion.div>
            ))}

            {/* Floating Sparkles - Adjusted Positions */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-2.5 h-2.5 rounded-full bg-violet-400/40"
                style={{
                  left: `${10 + i * 25}%`,
                  top: `${-10 - i * 15}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Title Below Shield */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <motion.h3 
              className="text-3xl font-bold text-white tracking-tight"
              animate={{
                background: [
                  'linear-gradient(135deg, #d8b4fe, #f9a8d4)',
                  'linear-gradient(135deg, #f9a8d4, #fdba74)',
                  'linear-gradient(135deg, #d8b4fe, #f9a8d4)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'linear-gradient(135deg, #d8b4fe, #f9a8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Objection Handling
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white/40 text-base mt-1 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Proactive objection management
            </motion.p>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            {[
              { label: '100% Transparency', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400/70' },
              { label: 'Fixed Pricing', color: 'border-violet-500/30 bg-violet-500/10 text-violet-400/70' },
              { label: '24/7 Support', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400/70' },
            ].map((tag, index) => (
              <motion.span
                key={index}
                className={`px-4 py-1.5 rounded-full text-xs border ${tag.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3" />
                  {tag.label}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* Decorative Animated Dots */}
          <motion.div
            className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`dot-${i}`}
                className="w-2 h-2 rounded-full bg-violet-400/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const ObjectionsSection: React.FC<ObjectionsSectionProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      
      {/* Professional Background Effects */}
      
      {/* Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0418] via-[#100525] to-[#0d0618]" />
      
      {/* Massive "Aurora" Right-Side Glow Effect */}
      <motion.div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-violet-600/30 via-fuchsia-500/10 to-transparent rounded-full blur-[120px] pointer-events-none"
        animate={{ 
          x: [0, 60, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Floating Ambient Orb (Bottom Left) */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 mx-auto px-8 w-full">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-7">
            {/* Unified Left-Aligned Header with Left Padding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 lg:pl-48"
            >
              <motion.div 
                className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-8 h-px bg-violet-400/70" />
                Objections Answered
              </motion.div>
              
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                    {title}
                  </span>
                </h2>
              </motion.div>
              
              {description && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 text-lg text-white/70 leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </motion.div>

            {/* Objections Grid with Left Padding */}
            <div className="space-y-4 lg:pl-48">
              {items.map((item, index) => (
                <ObjectionCard key={index} item={item} index={index} />
              ))}
            </div>

            {/* Footer / Trust signal with Left Padding */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 lg:pl-48"
            >
              <div className="inline-flex flex-wrap items-center gap-3 px-5 py-2.5 rounded-full border border-violet-500/10 bg-violet-500/5 text-sm text-ink-mute hover:border-violet-500/20 hover:bg-violet-500/10 transition-all duration-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/70">All objections answered transparently</span>
                </span>
                <span className="text-white/20">|</span>
                <span className="text-white/60">Fixed-price quotes after Discovery</span>
                <span className="text-white/20">|</span>
                <span className="text-white/60">24-hour response</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Animated Objection Handling Graphic - Centered */}
          <div className="lg:col-span-5 lg:sticky lg:top-1/2 lg:-translate-y-1/2">
            <ObjectionsVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectionsSection;