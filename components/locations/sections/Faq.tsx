'use client';

// components/sections/FAQSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';
import { BorderDraw } from '@/components/locations/sections/BorderDraw';

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
    <section className="py-16 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-left"
        >
          <span className="text-eyebrow text-violet-400">FAQ</span>
          <div className="mt-2">
            <GradientHeading text="Frequently Asked *Questions*" as="h2" className="text-3xl md:text-4xl" />
          </div>
        </motion.div>

        <div className="space-y-3">
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
                className={`relative rounded-xl border transition-colors duration-300 overflow-hidden ${
                  isOpen ? 'border-violet-500/30 bg-violet-500/5' : 'border-white/5 hover:bg-white/[0.03]'
                }`}
              >
                <BorderDraw hovered={hoveredIndex === index || isOpen} rounded={12} />

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
                      <ChevronDown className="w-5 h-5 text-ink-mute" />
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
                      <div className="relative px-5 pb-5 pt-0 text-ink-soft leading-relaxed border-t border-white/5">
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
    </section>
  );
};