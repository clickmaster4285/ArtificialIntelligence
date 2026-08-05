'use client';

// components/sections/CTASection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { FloatingObjects } from '@/components/locations/sections/FloatingObjects';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';
import { BorderDraw } from '@/components/locations/sections/BorderDraw';
import { Shimmer } from '@/components/locations/sections/Shimmer';

interface CTASectionProps {
  eyebrow?: string;
  /** Wrap any word(s) in *asterisks* to render them as the italic gradient highlight */
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  eyebrow = "Let's build it",
  title,
  description,
  ctaText,
  ctaLink,
  secondaryText,
  secondaryLink = '#contact',
}) => {
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <FloatingObjects variant="cta" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-4xl"
        >
          <span className="text-eyebrow text-violet-400">{eyebrow}</span>

          <div className="mt-4">
            <GradientHeading
              text={title}
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl leading-[1.03]"
            />
          </div>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-ink-soft max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* Primary: solid pill, shimmer on hover */}
            <motion.a
              href={ctaLink}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.99 }}
              className="group relative overflow-hidden inline-flex items-center gap-3 pl-6 pr-3 py-3 rounded-full bg-white text-black font-medium transition-shadow duration-300 hover:shadow-violet-glow/60"
            >
              <Shimmer />
              <Mail className="relative z-10 w-4 h-4 text-black/60" />
              <span className="relative z-10">{ctaText}</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 group-hover:translate-x-0.5 transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>

            {/* Secondary: outline pill, border-draw on hover */}
            {secondaryText && (
              <a
                href={secondaryLink}
                onMouseEnter={() => setSecondaryHovered(true)}
                onMouseLeave={() => setSecondaryHovered(false)}
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:text-white transition-colors duration-300"
              >
                <BorderDraw hovered={secondaryHovered} rounded={9999} />
                <Phone className="w-4 h-4 text-white/60" />
                {secondaryText}
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};