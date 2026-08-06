// components/locations/sections/Objections.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

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
        
        {/* Unified Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
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

        {/* Objections Grid */}
        <div className="space-y-4 max-w-4xl">
          {items.map((item, index) => (
            <ObjectionCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Footer / Trust signal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-violet-500/10 bg-violet-500/5 text-sm text-ink-mute hover:border-violet-500/20 hover:bg-violet-500/10 transition-all duration-300">
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
    </section>
  );
};

export default ObjectionsSection;