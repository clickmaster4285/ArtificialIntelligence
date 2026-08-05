// src/components/services/ServiceFAQs.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("relative py-20 bg-background overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[var(--grad-fade)] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-eyebrow text-violet-soft">FAQ</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {data.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className={cn(
                    "glass rounded-xl overflow-hidden transition-all duration-300",
                    isOpen ? "border-violet-500/30 violet-glow" : "hover:border-white/15"
                  )}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-violet-500/[0.05] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className={cn(
                      "font-medium pr-4 transition-colors duration-200",
                      isOpen ? "text-violet-soft" : "text-foreground"
                    )}>
                      {faq.question}
                    </span>
                    <span className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      isOpen ? "bg-violet-500/20 text-violet-soft rotate-180" : "bg-white/5 text-ink-mute"
                    )}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-4">
                          <p className="text-ink-mute leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}