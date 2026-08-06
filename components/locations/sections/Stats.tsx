'use client';

// components/sections/StatsSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, Users, Clock, Zap, TrendingUp, Shield } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  description?: string;
  timeline?: string;  // ✅ Added for compatibility
  icon?: React.ReactNode;
  highlight?: boolean;
}

interface StatsSectionProps {
  stats: StatItem[];
  title?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
};

const getIconByLabel = (label: string): React.ReactNode => {
  const normalizedLabel = label.replace(/\s/g, '');
  if (normalizedLabel in iconMap) {
    return iconMap[normalizedLabel as keyof typeof iconMap];
  }
  const matchedKey = Object.keys(iconMap).find(
    (key) => label.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(label.toLowerCase())
  );
  if (matchedKey) {
    return iconMap[matchedKey as keyof typeof iconMap];
  }
  return <TrendingUp className="w-5 h-5" />;
};

// Color palettes to cycle through on hover
const hoverColors = [
  { border: 'border-violet-500/40', glow: 'rgba(139, 92, 246, 0.4)', bg: 'from-violet-500/20 to-transparent' },
  { border: 'border-fuchsia-500/40', glow: 'rgba(217, 70, 239, 0.4)', bg: 'from-fuchsia-500/20 to-transparent' },
  { border: 'border-blue-500/40', glow: 'rgba(59, 130, 246, 0.4)', bg: 'from-blue-500/20 to-transparent' },
  { border: 'border-emerald-500/40', glow: 'rgba(16, 185, 129, 0.4)', bg: 'from-emerald-500/20 to-transparent' },
  { border: 'border-orange-500/40', glow: 'rgba(249, 115, 22, 0.4)', bg: 'from-orange-500/20 to-transparent' },
];

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, title }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />
      
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === LEFT-ALIGNED HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          {/* Eyebrow: Horizontal line with uppercase text */}
          <motion.div 
            className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-8 h-px bg-violet-400/70" />
            Metrics
          </motion.div>
          
          {/* Main Heading: Purple -> Pink -> Orange Gradient */}
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
          </motion.div>
          
          {/* Description: Slightly muted, lighter text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed"
          >
            Real-time performance metrics and milestones driving our success globally.
          </motion.p>
        </motion.div>

        {/* === LEFT-ALIGNED STATS GRID === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl"
        >
          {stats.map((stat, index) => {
            // Assign a color from the palette for each card
            const colorSet = hoverColors[index % hoverColors.length];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  borderColor: colorSet.border.split(' ')[1],
                  boxShadow: `0 0 40px -12px ${colorSet.glow}`,
                  transition: { duration: 0.2 }
                }}
                className={`
                  relative text-left p-6 md:p-8 rounded-2xl border border-white/10 
                  bg-white/[0.03] backdrop-blur-md
                  transition-colors duration-300
                  flex flex-col items-start justify-center
                  cursor-default group
                `}
              >
                {/* Glass Reflection Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
                  initial={{ x: '-100%', y: '-100%' }}
                  whileHover={{ x: '100%', y: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Background Gradient Color Change */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg} opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500`}
                />

                {/* Icon (Left-aligned) */}
                <motion.div 
                  className="relative mb-4 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-violet-400 group-hover:text-white transition-colors duration-300">
                    {stat.icon || getIconByLabel(stat.label)}
                  </div>
                </motion.div>

                {/* Value (Left-aligned) */}
                <div className="relative text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:scale-110 transition-transform duration-300 origin-left">
                  {stat.value}
                </div>

                {/* Label (Left-aligned) */}
                <div className="relative text-sm text-white/60 mt-1 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>

                {/* Description OR Timeline (Left-aligned) */}
                {(stat.description || stat.timeline) && (
                  <div className="relative text-xs text-white/40 mt-1 group-hover:text-white/60 transition-colors duration-300">
                    {stat.description || stat.timeline}
                  </div>
                )}

                {/* Bottom Highlight Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;