'use client';

// components/sections/ApplicationsSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  Target,
  Code2,
  Shield,
  Zap,
  Star,
} from 'lucide-react';

interface ApplicationItem {
  title: string;
  description: string;
  keyFeatures?: string[];
  technicalApproach?: string;
  typicalOutcome?: string;
}

interface ApplicationsSectionProps {
  title: string;
  description?: string;
  items: ApplicationItem[];
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  title,
  description,
  items,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const contentVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.98,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    },
  };

  const getIcon = (index: number) => {
    const icons = [
      <Lightbulb key="lightbulb" className="w-5 h-5" />,
      <Target key="target" className="w-5 h-5" />,
      <Code2 key="code" className="w-5 h-5" />,
      <Shield key="shield" className="w-5 h-5" />,
      <Zap key="zap" className="w-5 h-5" />,
      <Star key="star" className="w-5 h-5" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />
      
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto px-8 w-full">
        
        {/* === HEADER WITH LEFT PADDING === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:pl-48"
        >
          <motion.div 
            className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-8 h-px bg-violet-400/70" />
            Applications
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
              className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* === CONTENT WITH LEFT PADDING AND DECREASED RIGHT WIDTH === */}
        <div className="lg:pl-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT: Navigation - Increased width */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-3"
            >
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setHoveredNav(index)}
                    onMouseLeave={() => setHoveredNav(null)}
                    whileHover={{ y: -2 }}
                    className={`
                      relative w-full text-left p-5 rounded-xl overflow-hidden
                      flex items-center gap-4 group transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/10 shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)]' 
                        : 'bg-white/[0.03] hover:bg-white/[0.06]'
                      }
                    `}
                  >
                    <span
                      className={`
                        relative p-2.5 rounded-xl transition-all duration-300
                        ${isActive 
                          ? 'bg-violet-500/30 text-violet-300 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]' 
                          : 'bg-white/5 text-white/40 group-hover:text-white/70'
                        }
                      `}
                    >
                      {getIcon(index)}
                    </span>
                    
                    <div className="relative flex-1 flex flex-col items-start">
                      <span className="font-medium text-sm text-white group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors hidden sm:block">
                        Learn more
                      </span>
                    </div>

                    <ChevronRight
                      className={`
                        relative w-4 h-4 transition-all duration-300
                        ${isActive 
                          ? 'text-violet-400 opacity-100 translate-x-0.5' 
                          : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-0.5'
                        }
                      `}
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* RIGHT: Content Area - Decreased width */}
            <div className="lg:col-span-6 lg:pl-4">
              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                  <motion.div
                    key={activeIndex}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl shadow-2xl overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10">
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold text-white mb-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {items[activeIndex].title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-white/70 leading-relaxed mb-4 text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {items[activeIndex].description}
                      </motion.p>

                      {items[activeIndex].keyFeatures && (
                        <motion.div 
                          className="mt-5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {items[activeIndex].keyFeatures!.map((feature, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (idx * 0.05) }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-gradient-to-r from-violet-500/20 to-fuchsia-500/10 text-violet-300"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                        {items[activeIndex].technicalApproach && (
                          <motion.div 
                            className="p-4 rounded-xl bg-white/[0.04]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h4 className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1">Technical Approach</h4>
                            <p className="text-xs text-white/70">{items[activeIndex].technicalApproach}</p>
                          </motion.div>
                        )}

                        {items[activeIndex].typicalOutcome && (
                          <motion.div 
                            className="p-4 rounded-xl bg-emerald-500/5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <h4 className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Typical Outcome</h4>
                            <p className="text-xs text-white/70">{items[activeIndex].typicalOutcome}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};