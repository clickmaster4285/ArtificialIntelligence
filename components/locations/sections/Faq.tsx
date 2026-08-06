'use client';

// components/sections/FAQSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* === BACKGROUND EFFECTS === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />

      <div className="relative z-10 mx-auto px-8 w-full">
        
        {/* ========================================= */}
        {/* GRID LAYOUT: LEFT (Content) / RIGHT (Graphics) */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: FAQ Content (Spans 7 cols) */}
          {/* ========================================= */}
          <div className="lg:col-span-7">
            {/* === UNIFIED LEFT-ALIGNED HEADER === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <motion.div 
                className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-8 h-px bg-violet-400/70" />
                FAQ
              </motion.div>
              
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed"
              >
                Find answers to the most common questions about our services, processes, and solutions.
              </motion.p>
            </motion.div>

            {/* === ACCORDION LIST === */}
            <div className="space-y-3 max-w-2xl">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-violet-500/40 bg-violet-500/5 shadow-[0_0_30px_-10px_rgba(139,92,246,0.2)]' : 'border-white/5 hover:bg-white/[0.03]'
                    }`}
                  >
                
                    <button
                      onClick={() => toggleItem(index)}
                      className="relative w-full text-left p-5 flex items-start justify-between gap-4"
                    >
                      <span className="font-medium text-white flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-violet-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative px-5 pb-5 pt-0 text-white/70 leading-relaxed border-t border-white/5">
                            {item.answer.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className={idx > 0 ? 'mt-3' : 'mt-3'}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: Visual Graphics (Spans 5 cols) */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center h-full relative"
          >
            {/* 1. Background Soft Glow */}
            <div className="absolute inset-0 bg-violet-600/20 blur-[100px] rounded-full" />

            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              
              {/* 2. Floating Question Marks */}
              <motion.div
                className="absolute text-6xl font-bold text-violet-500/20"
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: '10%', left: '10%' }}
              >
                ?
              </motion.div>
              <motion.div
                className="absolute text-4xl font-bold text-fuchsia-500/20"
                animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ bottom: '15%', right: '5%' }}
              >
                !
              </motion.div>
              <motion.div
                className="absolute text-5xl font-bold text-violet-500/20"
                animate={{ y: [0, -20, 0], rotate: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{ top: '20%', right: '15%' }}
              >
                ?
              </motion.div>

              {/* 3. The "Help" 3D Cube */}
              <div className="relative w-40 h-40 perspective-[800px]">
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Cube Faces */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ transform: "translateZ(80px)" }}>
                    <MessageCircle className="w-12 h-12 text-violet-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ transform: "rotateY(180deg) translateZ(80px)" }}>
                    <MessageCircle className="w-12 h-12 text-violet-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ transform: "rotateY(90deg) translateZ(80px)" }}>
                    <MessageCircle className="w-12 h-12 text-violet-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ transform: "rotateY(-90deg) translateZ(80px)" }}>
                    <MessageCircle className="w-12 h-12 text-violet-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ transform: "rotateX(90deg) translateZ(80px)" }}>
                    <MessageCircle className="w-12 h-12 text-violet-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ transform: "rotateX(-90deg) translateZ(80px)" }}>
                    <MessageCircle className="w-12 h-12 text-violet-300" />
                  </div>
                </motion.div>
              </div>

              {/* Bottom floating text */}
              <motion.div
                className="absolute bottom-0 text-sm text-white/40 font-medium tracking-widest uppercase"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Ask us anything
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};