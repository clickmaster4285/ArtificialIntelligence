'use client';

// components/sections/ApplicationsSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { GradientHeading } from '@/components/locations/sections/GradientHeading';
import { BorderDraw } from '@/components/locations/sections/BorderDraw';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  } as const;

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
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12 text-left"
        >
          <span className="text-eyebrow text-violet-400">Applications</span>
          <div className="mt-2">
            <GradientHeading text={title} as="h2" className="text-3xl md:text-4xl" />
          </div>
          {description && <p className="mt-4 text-ink-soft">{description}</p>}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Navigation - each item scales up slightly when selected */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-2"
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
                  animate={{ scale: isActive ? 1.02 : 1 }}
                  transition={{ duration: 0.25 }}
                  className={`
                    relative w-full text-left p-4 rounded-xl overflow-hidden
                    flex items-center gap-3 group
                    ${isActive ? 'bg-violet-500/10 text-white' : 'hover:bg-white/5 text-ink-soft'}
                  `}
                >
                  <BorderDraw hovered={isActive || hoveredNav === index} rounded={12} />
                  <span
                    className={`
                    relative p-2 rounded-lg transition-colors
                    ${isActive ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-ink-mute'}
                  `}
                  >
                    {getIcon(index)}
                  </span>
                  <span className="relative flex-1 font-medium text-sm">{item.title}</span>
                  <ChevronRight
                    className={`
                    relative w-4 h-4 transition-all
                    ${isActive ? 'text-violet-400 opacity-100 translate-x-0.5' : 'opacity-0 group-hover:opacity-50'}
                  `}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent text-left"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {items[activeIndex].title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed mb-4">
                    {items[activeIndex].description}
                  </p>

                  {items[activeIndex].keyFeatures && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-ink-mute mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {items[activeIndex].keyFeatures!.map((feature, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.04 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {items[activeIndex].technicalApproach && (
                    <div className="mt-4 p-4 rounded-xl border border-white/5 bg-white/5">
                      <h4 className="text-sm font-semibold text-ink-mute mb-1">Technical Approach</h4>
                      <p className="text-sm text-ink-soft">{items[activeIndex].technicalApproach}</p>
                    </div>
                  )}

                  {items[activeIndex].typicalOutcome && (
                    <div className="mt-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                      <h4 className="text-sm font-semibold text-green-400 mb-1">Typical Outcome</h4>
                      <p className="text-sm text-ink-soft">{items[activeIndex].typicalOutcome}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};