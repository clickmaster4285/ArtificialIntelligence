'use client';

// components/sections/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { FloatingObjects } from '@/components/locations/sections/FloatingObjects';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';
import { Shimmer } from '@/components/locations/sections/Shimmer';

interface HeroSectionProps {
  tagline: string;
  /** Wrap any word(s) in *asterisks* to render them as the italic gradient highlight */
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  startingPrice?: string;
  badge?: string;
  stats?: { label: string; value: string; description?: string }[];
  industries?: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaLink,
  startingPrice,
  badge,
  stats,
  industries,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <FloatingObjects variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl text-left"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <span className="text-eyebrow text-violet-400">{tagline}</span>
          </motion.div>

          {/* Title - bold, left-aligned, gradient highlight support via *word* */}
          <div className="mt-4">
            <GradientHeading
              text={title}
              as="h1"
              trigger="mount"
              delay={0.25}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]"
            />
          </div>

          {/* Badge */}
          {badge && (
            <motion.div variants={itemVariants} className="mt-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-violet-500/30 text-violet-400 bg-violet-500/10">
                <Shield className="w-3 h-3" />
                {badge}
              </span>
            </motion.div>
          )}

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <motion.a
              href={ctaLink}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium shadow-violet-glow hover:shadow-violet-glow/70 transition-shadow duration-300"
            >
              <Shimmer />
              <span className="relative z-10">{ctaText}</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            {startingPrice && (
              <span className="text-sm text-ink-mute">
                From <span className="text-white font-semibold">{startingPrice}</span>
              </span>
            )}
          </motion.div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm text-left"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-ink-mute">{stat.label}</div>
                  {stat.description && (
                    <div className="text-xs text-ink-mute/70 mt-1">{stat.description}</div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Industries */}
          {industries && industries.length > 0 && (
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-sm text-ink-mute mr-1">Serving:</span>
              {industries.map((industry, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-ink-soft"
                >
                  {industry}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};