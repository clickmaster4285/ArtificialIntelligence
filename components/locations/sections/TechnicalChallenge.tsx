'use client';

// components/sections/TechnicalChallengesSection.tsx
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Wrench } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';

interface Challenge {
  title: string;
  description: string;
  solution?: string;
}

interface TechnicalChallengesSectionProps {
  title: string;
  description: string;
  challenges: Challenge[];
}

function ChallengeRow({ challenge, index }: { challenge: Challenge; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative pl-14 md:pl-20 pb-10 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="absolute left-[18px] md:left-[26px] top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-violet-glow ring-4 ring-background"
      />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.07] transition-colors duration-300 text-left overflow-hidden"
      >
        
        <div className="flex items-start gap-3">
          <span className="p-2 rounded-lg bg-orange-500/10 text-orange-400 flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </span>
          <h3 className="text-lg font-semibold text-white pt-1">{challenge.title}</h3>
        </div>
        <p className="mt-3 text-ink-soft leading-relaxed">{challenge.description}</p>

        {challenge.solution && (
          <div className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-violet-500/20 bg-violet-500/5">
            <span className="p-1.5 rounded-lg bg-violet-500/15 text-violet-400 flex-shrink-0">
              <Wrench className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-sm font-semibold text-violet-300">Solution</span>
              <p className="text-sm text-ink-soft mt-0.5">{challenge.solution}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export const TechnicalChallengesSection: React.FC<TechnicalChallengesSectionProps> = ({
  title,
  description,
  challenges,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-16 md:py-20 relative">
      <div className="relative z-10 mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-left"
        >
          <span className="text-eyebrow text-violet-400">Engineering Challenges</span>
          <div className="mt-2">
            <GradientHeading text={title} as="h2" className="text-3xl md:text-4xl" />
          </div>
          <p className="mt-4 text-ink-soft max-w-2xl">{description}</p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Static track */}
          <div className="absolute left-[18px] md:left-[26px] top-1 bottom-0 w-px bg-white/10" />
          {/* Scroll-linked fill */}
          <motion.div
            className="absolute left-[18px] md:left-[26px] top-1 w-px bg-gradient-to-b from-violet-500 to-fuchsia-500 origin-top"
            style={{ height: lineHeight }}
          />

          {challenges.map((challenge, index) => (
            <ChallengeRow key={index} challenge={challenge} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};