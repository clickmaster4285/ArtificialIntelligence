'use client';

// components/sections/ComplianceSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileCheck, Server, Users, Eye } from 'lucide-react';
import { BorderDraw } from '@/components/locations/sections/BorderDraw';

interface ComplianceItem {
  title: string;
  description: string;
}

interface ComplianceSectionProps {
  title: string;
  description: string;
  items: ComplianceItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
  FileCheck: <FileCheck className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Eye: <Eye className="w-6 h-6" />,
};

function ComplianceCard({ item, index }: { item: ComplianceItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const iconVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-left overflow-hidden hover:border-violet-500/40 transition-all duration-500"
    >
      {/* === Expanding "Halo" Ring Glow on Hover === */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-violet-500/20 blur-xl pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={hovered ? { scale: 4, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Standard Border Draw Effect */}
      <BorderDraw hovered={hovered} rounded={16} />

      {/* === Icon Box === */}
      <motion.div
        variants={iconVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`
          relative z-10 p-3 rounded-xl w-fit mb-5 transition-all duration-300
          ${hovered 
            ? 'bg-violet-500/30 text-violet-300 shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)] border border-violet-400/30' 
            : 'bg-white/5 text-violet-400 border border-white/10'
          }
        `}
      >
        {iconMap[item.title.replace(/\s/g, '')] || <ShieldCheck className="w-6 h-6" />}
      </motion.div>

      {/* === Title & Description === */}
      <h3 className="relative z-10 text-xl font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-violet-200">
        {item.title}
      </h3>
      <p className="relative z-10 text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
        {item.description}
      </p>

      {/* === Bottom Decorative Line === */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      
      {/* === PROFESSIONAL BACKGROUND EFFECTS === */}
      
      {/* Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0418] via-[#100525] to-[#0d0618]" />
      
      {/* Massive "Aurora" Right-Side Glow Effect */}
      <motion.div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-violet-600/30 via-fuchsia-500/10 to-transparent rounded-full blur-[120px] pointer-events-none"
        animate={{ 
          x: [0, 60, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Floating Ambient Orb (Bottom Left) */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* === UNIFIED LEFT-ALIGNED HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <motion.div 
            className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-8 h-px bg-violet-400/70" />
            Compliance & Security
          </motion.div>
          
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* === ADVANCED CARD GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ComplianceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};