'use client';

// components/sections/StatsSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, Users, Clock, Zap, TrendingUp, Shield } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  description?: string;
  timeline?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

interface StatsSectionProps {
  stats: StatItem[];
  title?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
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
  return <TrendingUp className="w-6 h-6" />;
};

// Color palettes for each card
const cardColors = [
  { 
    gradient: 'from-violet-500 to-fuchsia-500',
    border: 'border-violet-500/30',
    glow: 'rgba(139, 92, 246, 0.3)',
    bg: 'bg-violet-500/10',
    shadow: 'shadow-violet-500/20'
  },
  { 
    gradient: 'from-fuchsia-500 to-pink-500',
    border: 'border-fuchsia-500/30',
    glow: 'rgba(217, 70, 239, 0.3)',
    bg: 'bg-fuchsia-500/10',
    shadow: 'shadow-fuchsia-500/20'
  },
  { 
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/30',
    glow: 'rgba(59, 130, 246, 0.3)',
    bg: 'bg-blue-500/10',
    shadow: 'shadow-blue-500/20'
  },
  { 
    gradient: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/30',
    glow: 'rgba(16, 185, 129, 0.3)',
    bg: 'bg-emerald-500/10',
    shadow: 'shadow-emerald-500/20'
  },
];

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, title }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
      } 
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto px-8 w-full">
        
        {/* === LEFT-ALIGNED HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:pl-48"
        >
          {/* Eyebrow */}
          <motion.div 
            className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-8 h-px bg-violet-400/70" />
            <span>Metrics</span>
          </motion.div>
          
          {/* Main Heading */}
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
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed"
          >
            Real-time performance metrics and milestones driving our success globally.
          </motion.p>
        </motion.div>

        {/* === CENTERED STATS GRID === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => {
            const colorSet = cardColors[index % cardColors.length];
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -15,
                  scale: 1.08,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className={`
                  relative text-center p-6 md:p-8 rounded-2xl 
                  border border-white/10 
                  bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                  backdrop-blur-md
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  cursor-pointer group
                  overflow-hidden
                `}
              >
                {/* Animated Gradient Background on Hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${colorSet.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Glow Effect on Hover */}
                <motion.div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{
                    boxShadow: `inset 0 0 80px ${colorSet.glow}`,
                  }}
                />

                {/* Animated Border Glow */}
                <motion.div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{
                    boxShadow: `0 0 60px ${colorSet.glow}`,
                  }}
                />

                {/* Icon with Rotating Animation */}
                <motion.div 
                  className={`relative mb-4 p-3 rounded-xl ${colorSet.bg} border ${colorSet.border} group-hover:border-white/30 transition-all duration-300`}
                  whileHover={{ 
                    rotate: [0, -15, 15, -10, 10, 0],
                    scale: 1.15,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`text-${colorSet.gradient.split(' ')[0].replace('from-', '')} group-hover:text-white transition-colors duration-300`}>
                    {stat.icon || getIconByLabel(stat.label)}
                  </div>
                </motion.div>

                {/* Value with Counter-like Animation */}
                <motion.div 
                  className="relative text-3xl md:text-4xl font-bold text-white tracking-tight"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + (index * 0.1),
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  {stat.value}
                  
                  {/* Decorative underline that expands on hover */}
                  <motion.div 
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${colorSet.gradient} group-hover:w-full transition-all duration-700 ease-out`}
                  />
                </motion.div>

                {/* Label */}
                <div className="relative text-sm text-white/60 mt-2 group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>

                {/* Description or Timeline */}
                {(stat.description || stat.timeline) && (
                  <div className="relative text-xs text-white/40 mt-1 group-hover:text-white/70 transition-colors duration-300">
                    {stat.description || stat.timeline}
                  </div>
                )}

                {/* Animated Corner Accents */}
                <motion.div 
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-tl-2xl"
                />
                <motion.div 
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-tr-2xl"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-bl-2xl"
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-br-2xl"
                />

                {/* Particle Effects on Hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={false}
                  whileHover={{
                    background: [
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0) 0%, transparent 70%)',
                      'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0) 0%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;