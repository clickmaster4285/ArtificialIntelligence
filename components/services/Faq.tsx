// src/components/services/ServiceFAQs.tsx

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceFAQsProps {
  data: {
    question: string;
    answer: string;
  }[];
  className?: string;
}

export function ServiceFAQs({ data, className }: ServiceFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        className="max-w-7xl mx-auto px-[14px] relative z-10"
        style={{ opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - FAQ Content */}
          <div>
            {/* Header - Left Aligned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <motion.span 
                className="inline-flex items-center gap-2 text-eyebrow text-violet-400"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-8 h-px bg-gradient-to-r from-violet-400 to-transparent" />
                FAQ
              </motion.span>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-white/60 max-w-xl text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Everything you need to know about our services. Can't find what you're looking for? 
                <span className="text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"> Contact us</span>
              </motion.p>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-3">
              {data.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={cn(
                      "glass rounded-2xl overflow-hidden transition-all duration-300 border",
                      isOpen 
                        ? "border-violet-500/30 violet-glow" 
                        : "border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                    )}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-violet-500/[0.05] transition-colors duration-200 group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                          isOpen 
                            ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30" 
                            : "bg-white/5 text-white/40 group-hover:bg-white/10"
                        )}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={cn(
                          "font-medium pr-4 transition-colors duration-200 text-sm md:text-base",
                          isOpen ? "text-violet-400" : "text-white/90"
                        )}>
                          {faq.question}
                        </span>
                      </div>
                      <motion.span 
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                          isOpen 
                            ? "bg-violet-500/20 text-violet-400" 
                            : "bg-white/5 text-white/40 group-hover:bg-white/10"
                        )}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-5 pl-14">
                            <div className="relative">
                              <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-violet-400 via-fuchsia-400 to-orange-300 rounded-full" />
                              <p className="text-white/60 leading-relaxed pl-4">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - UPDATED WITH VERTICAL CENTERING & THINKING FACE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            /* CHANGED: Added flex items-center justify-center to vertically center the SVG */
            className="hidden lg:flex lg:items-center lg:justify-center lg:h-full"
          >
            <div className="sticky top-32 w-full max-w-[400px] mx-auto">
              
              {/* Glass background card for the graphic */}
              <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-xl" />
              <div className="relative glass rounded-3xl p-8 border border-white/10 bg-white/5 overflow-hidden">
                
                {/* ANIMATED SVG ILLUSTRATION */}
                <svg width="100%" height="100%" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">
                  <style>
                    {`
                      @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-12px); }
                      }
                      @keyframes pop {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                      }
                      @keyframes headTilt {
                        0%, 100% { transform: rotate(0deg); }
                        50% { transform: rotate(-5deg); }
                      }
                      .question-mark { animation: pop 2.5s ease-in-out infinite; transform-origin: center; }
                      .question-mark:nth-child(2) { animation-delay: 0.3s; }
                      .question-mark:nth-child(3) { animation-delay: 0.6s; }
                      .character-group { animation: float 3.5s ease-in-out infinite; }
                      .head { animation: headTilt 4s ease-in-out infinite; transform-origin: 200px 180px; }
                    `}
                  </style>

                  {/* Question Marks */}
                  <g className="question-mark">
                    <text x="70" y="100" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="bold" fill="#d32f2f">?</text>
                  </g>
                  <g className="question-mark">
                    <text x="160" y="85" fontFamily="Arial, sans-serif" fontSize="100" fontWeight="bold" fill="#d32f2f">?</text>
                  </g>
                  <g className="question-mark">
                    <text x="260" y="100" fontFamily="Arial, sans-serif" fontSize="90" fontWeight="bold" fill="#d32f2f">?</text>
                  </g>

                  {/* Character */}
                  <g className="character-group">
                    {/* Legs */}
                    <path d="M 165 380 L 155 460 L 195 460 L 205 380 Z" fill="#6b8e9c"/>
                    <path d="M 190 380 L 195 460 L 235 460 L 230 380 Z" fill="#5c7a87"/>
                    <rect x="150" y="375" width="90" height="15" fill="#4a6a75" rx="2"/>

                    {/* Arms (Behind) */}
                    <path d="M 120 260 C 90 280, 80 350, 130 390 L 160 360 C 130 330, 140 290, 160 270 Z" fill="#f4e5c3"/>
                    <path d="M 260 260 C 290 280, 300 350, 250 390 L 220 360 C 250 330, 240 290, 220 270 Z" fill="#f4e5c3"/>

                    {/* Body */}
                    <path d="M 140 300 C 130 400, 160 420, 200 420 C 240 420, 270 400, 260 300 C 250 260, 230 250, 200 250 C 170 250, 150 260, 140 300 Z" fill="#fce4c5"/>
                    <rect x="155" y="310" width="90" height="35" fill="#f05d2e" rx="5"/>

                    {/* Arms (Front) */}
                    <path d="M 130 260 C 120 300, 140 340, 170 350 L 200 320 C 180 300, 170 280, 180 260 Z" fill="#fce4c5"/>
                    <path d="M 270 260 C 280 300, 260 340, 230 350 L 200 320 C 220 300, 230 280, 220 260 Z" fill="#fce4c5"/>

                    {/* Head */}
                    <g className="head">
                      {/* Neck */}
                      <rect x="175" y="235" width="50" height="30" fill="#b37b5e"/>
                      
                      {/* Hair Back */}
                      <path d="M 140 150 C 140 110, 260 110, 260 150 C 270 180, 260 280, 250 320 C 240 280, 220 260, 200 260 C 180 260, 160 280, 150 320 C 140 280, 130 180, 140 150 Z" fill="#4a2c2a"/>
                      
                      {/* Face */}
                      <path d="M 150 170 C 150 130, 250 130, 250 170 C 250 230, 240 260, 200 260 C 160 260, 150 230, 150 170 Z" fill="#c88466"/>
                      <circle cx="170" cy="205" r="12" fill="#b36b4e" opacity="0.6"/>
                      <circle cx="230" cy="205" r="12" fill="#b36b4e" opacity="0.6"/>

                      {/* Hair Front */}
                      <path d="M 145 160 C 145 110, 255 110, 255 160 C 250 150, 240 145, 220 150 C 210 135, 190 135, 180 150 C 160 145, 150 150, 145 160 Z" fill="#4a2c2a"/>
                      <path d="M 145 160 C 140 200, 155 230, 160 240 C 155 200, 160 180, 160 160 Z" fill="#4a2c2a"/>
                      <path d="M 255 160 C 260 200, 245 230, 240 240 C 245 200, 240 180, 240 160 Z" fill="#4a2c2a"/>

                      {/* --- UPDATED THINKING FACE --- */}
                      {/* Eyes looking slightly upward */}
                      <ellipse cx="175" cy="188" rx="3.5" ry="5" fill="#3a201e"/>
                      <ellipse cx="225" cy="188" rx="3.5" ry="5" fill="#3a201e"/>
                      
                      {/* Raised left eyebrow (curiosity/thinking) */}
                      <path d="M 164 175 Q 175 168, 185 174" stroke="#3a201e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      {/* Normal right eyebrow */}
                      <path d="M 215 176 Q 225 172, 235 176" stroke="#3a201e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

                      {/* Mouth: small "O" shape like she's saying "Hmm..." */}
                      <ellipse cx="200" cy="221" rx="5" ry="5" fill="#3a201e"/>

                      {/* Hand on chin */}
                      <path d="M 185 240 C 180 220, 175 200, 180 180 C 185 175, 195 180, 190 200 C 188 210, 195 220, 200 240 Z" fill="#c88466"/>
                    </g>
                  </g>
                </svg>
                
                {/* Caption below graphic */}
                <div className="text-center mt-4">
                  <p className="text-white/40 text-sm">
                    Have more questions? <span className="text-violet-400 hover:text-violet-300 cursor-pointer transition-colors">Chat with our AI support</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}