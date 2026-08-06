// components/locations/sections/Objections.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';

interface ObjectionItem {
  question: string;
  answer: string;
}

interface ObjectionsSectionProps {
  title: string;
  description?: string;
  items: ObjectionItem[];
}

export const ObjectionsSection: React.FC<ObjectionsSectionProps> = ({
  title,
  description,
  items,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-20 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="text-eyebrow text-amber-400">Objections Answered</span>
          <GradientHeading
            text={title}
            as="h2"
            className="text-3xl md:text-4xl mt-2"
          />
          {description && (
            <p className="mt-4 text-ink-soft max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Objections List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="group p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-amber-500/30 hover:bg-white/8 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {item.question}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">
                    {item.answer}
                  </p>
                </div>

                {/* Checkmark indicator */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer / Trust signal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-sm text-ink-mute">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All objections answered transparently</span>
            </span>
            <span className="text-white/20">|</span>
            <span>Fixed-price quotes after Discovery</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectionsSection;