'use client';

// components/sections/StatsSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, Users, Clock, Zap, TrendingUp, Shield } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';

interface StatItem {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

interface StatsSectionProps {
  stats: StatItem[];
  title?: string;
}

const iconMap = {
  Award: <Award className="w-6 h-6 text-violet-400" />,
  Users: <Users className="w-6 h-6 text-violet-400" />,
  Clock: <Clock className="w-6 h-6 text-violet-400" />,
  Zap: <Zap className="w-6 h-6 text-violet-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-violet-400" />,
  Shield: <Shield className="w-6 h-6 text-violet-400" />,
};

const getIconByLabel = (label: string): React.ReactNode => {
  const normalizedLabel = label.replace(/\s/g, '');
  if (normalizedLabel in iconMap) return iconMap[normalizedLabel as keyof typeof iconMap];
  const matchedKey = Object.keys(iconMap).find(
    (key) => label.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(label.toLowerCase())
  );
  if (matchedKey) return iconMap[matchedKey as keyof typeof iconMap];
  return <TrendingUp className="w-6 h-6 text-violet-400" />;
};

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, title }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-left"
          >
            <GradientHeading text={title} as="h2" className="text-3xl md:text-4xl" />
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className={`
                relative text-left p-6 rounded-2xl border overflow-hidden
                bg-gradient-to-br from-white/5 to-transparent
                ${stat.highlight
                  ? 'border-violet-500/40 shadow-[0_0_40px_-12px_rgba(168,85,247,0.55)]'
                  : 'border-white/5 hover:border-violet-500/30'}
              `}
            >
              {stat.highlight && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(168,85,247,0.35), transparent 60%)',
                  }}
                />
              )}
              <div className="relative mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon || getIconByLabel(stat.label)}
              </div>
              <div className="relative text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="relative text-sm text-ink-mute mt-1">{stat.label}</div>
              {stat.description && (
                <div className="relative text-xs text-ink-mute/70 mt-1">{stat.description}</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};