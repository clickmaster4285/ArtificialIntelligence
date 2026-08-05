'use client';

// components/sections/ComplianceSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileCheck, Server, Users, Eye } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';
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
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-violet-400" />,
  Lock: <Lock className="w-6 h-6 text-violet-400" />,
  FileCheck: <FileCheck className="w-6 h-6 text-violet-400" />,
  Server: <Server className="w-6 h-6 text-violet-400" />,
  Users: <Users className="w-6 h-6 text-violet-400" />,
  Eye: <Eye className="w-6 h-6 text-violet-400" />,
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
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent text-left overflow-hidden"
    >
      <BorderDraw hovered={hovered} rounded={16} />
      <motion.div
        variants={iconVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit mb-4"
      >
        {iconMap[item.title.replace(/\s/g, '')] || <ShieldCheck className="w-6 h-6 text-violet-400" />}
      </motion.div>
      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12 text-left"
        >
          <span className="text-eyebrow text-violet-400">Compliance</span>
          <div className="mt-2">
            <GradientHeading text={title} as="h2" className="text-3xl md:text-4xl" />
          </div>
          <p className="mt-4 text-ink-soft">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ComplianceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};