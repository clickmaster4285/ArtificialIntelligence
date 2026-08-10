'use client';

// components/sections/PricingSection.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import { 
  ChevronDown, ChevronUp, Clock, ArrowUpDown, Star, 
  CheckCircle, Zap, Layers, Cpu, DollarSign, TrendingUp
} from 'lucide-react';
import { SkeletonBar } from '@/components/locations/sections/Shimmer';

interface PricingItem {
  systemType: string;
  priceRange: string;
  timeline: string;
  primaryOutcome: string;
}

interface PricingSectionProps {
  title: string;
  description?: string;
  items: PricingItem[];
  note?: string;
  popularIndex?: number;
}

function firstNumber(priceRange: string): number {
  const match = priceRange.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

const getSystemIcon = (type: string) => {
  const lower = type.toLowerCase();
  if (lower.includes('enterprise')) return <Cpu className="w-5 h-5" />;
  if (lower.includes('pro')) return <Zap className="w-5 h-5" />;
  if (lower.includes('basic') || lower.includes('start')) return <Layers className="w-5 h-5" />;
  return <CheckCircle className="w-5 h-5" />;
};

// =========================================================
// ANIMATED PRICING VISUAL (left column)
// =========================================================

function PricingVisual() {
  const bars = [
    { x: 40, w: 46, h: 90, delay: 0 },
    { x: 100, w: 46, h: 140, delay: 0.15 },
    { x: 160, w: 46, h: 195, delay: 0.3 },
    { x: 220, w: 46, h: 150, delay: 0.45 },
    { x: 280, w: 46, h: 235, delay: 0.6 },
  ];
  const baseY = 340;

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-sm overflow-hidden p-6">
      {/* ambient glow */}
      <div className="absolute -top-20 -left-16 w-64 h-64 bg-violet-600/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-10 w-56 h-56 bg-fuchsia-600/15 rounded-full blur-[80px] pointer-events-none" />

      <svg
        viewBox="0 0 360 380"
        className="relative w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pv-bar" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#a78bfa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pv-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fdba74" stopOpacity="0" />
            <stop offset="50%" stopColor="#fdba74" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fdba74" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="pv-coin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0" />
          </radialGradient>
          <filter id="pv-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* dotted baseline grid */}
        <g opacity="0.25">
          {[0, 1, 2, 3, 4].map((row) => (
            <line
              key={row}
              x1="20"
              y1={80 + row * 65}
              x2="340"
              y2={80 + row * 65}
              stroke="#71717a"
              strokeWidth="0.6"
              strokeDasharray="2 6"
            />
          ))}
        </g>

        {/* baseline */}
        <line x1="20" y1={baseY} x2="340" y2={baseY} stroke="#a1a1aa" strokeWidth="1" opacity="0.4" />

        {/* rising bars = pricing tiers */}
        <g filter="url(#pv-glow)">
          {bars.map((bar, i) => (
            <motion.rect
              key={i}
              x={bar.x}
              width={bar.w}
              rx={10}
              fill="url(#pv-bar)"
              initial={{ height: 0, y: baseY }}
              animate={{ height: bar.h, y: baseY - bar.h }}
              transition={{
                duration: 1,
                delay: bar.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </g>

        {/* connecting trend line across bar tops */}
        <motion.polyline
          points={bars.map((b) => `${b.x + b.w / 2},${baseY - b.h - 14}`).join(' ')}
          fill="none"
          stroke="url(#pv-line)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease: 'easeInOut' }}
        />

        {/* trend line arrowhead node pulsing at the peak */}
        <motion.circle
          cx={bars[bars.length - 1].x + bars[bars.length - 1].w / 2}
          cy={baseY - bars[bars.length - 1].h - 14}
          r="5"
          fill="#fdba74"
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        />

        {/* floating coin / dollar glyphs drifting upward */}
        {[
          { cx: 70, cy: 60, delay: 0 },
          { cx: 210, cy: 40, delay: 1.1 },
          { cx: 300, cy: 80, delay: 2.1 },
        ].map((coin, i) => (
          <motion.g
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [-4, 4, -4], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: coin.delay,
            }}
          >
            <circle cx={coin.cx} cy={coin.cy} r="16" fill="url(#pv-coin-glow)" />
            <circle
              cx={coin.cx}
              cy={coin.cy}
              r="10"
              fill="none"
              stroke="#f9a8d4"
              strokeWidth="1.2"
              opacity="0.8"
            />
            <text
              x={coin.cx}
              y={coin.cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="#fbcfe8"
            >
              $
            </text>
          </motion.g>
        ))}

        {/* rotating dashed ring, top-right accent */}
        <motion.circle
          cx="300"
          cy="40"
          r="34"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.35"
          style={{ transformOrigin: '300px 40px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* caption chip */}
      <div className="relative mt-2 flex items-center gap-2 rounded-full w-fit px-3 py-1.5 bg-white/5 border border-white/10">
        <TrendingUp className="w-3.5 h-3.5 text-violet-300" />
        <span className="text-xs text-white/60">Transparent, scalable pricing</span>
      </div>
    </div>
  );
}

// =========================================================

export const PricingSection: React.FC<PricingSectionProps> = ({
  title,
  description,
  items,
  note,
  popularIndex,
}) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const indexedItems = useMemo(
    () => items.map((item, originalIndex) => ({ ...item, originalIndex })),
    [items]
  );

  const displayedItems = useMemo(() => {
    if (sortAsc === null) return indexedItems;
    const copy = [...indexedItems];
    copy.sort((a, b) => (sortAsc ? 1 : -1) * (firstNumber(a.priceRange) - firstNumber(b.priceRange)));
    return copy;
  }, [indexedItems, sortAsc]);

  // =========================================================
  // FRAMER MOTION VARIANTS
  // =========================================================
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, 
        delayChildren: 0.1,    
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    },
    hover: {
      y: -6,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  // =========================================================

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* === BACKGROUND EFFECTS === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0d0618] to-[#1a0b2e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-fuchsia-900/10 to-orange-900/20 pointer-events-none" />
      
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-start">

          {/* ============================================= */}
          {/* LEFT: sticky header + animated pricing graphic */}
          {/* ============================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-10 lg:pl-48">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Eyebrow: Horizontal line with uppercase text */}
              <motion.div 
                className="flex items-center gap-3 text-eyebrow text-violet-400 uppercase tracking-widest text-sm font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-8 h-px bg-violet-400/70" />
                Pricing
              </motion.div>
              
              {/* Main Heading: Purple -> Pink -> Orange Gradient */}
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-[#d8b4fe] via-[#f9a8d4] to-[#fdba74] bg-clip-text text-transparent">
                    {title}
                  </span>
                </h2>
              </motion.div>
              
              {/* Description: Slightly muted, lighter text */}
              {description && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 text-base text-white/70 leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </motion.div>

            {/* Animated SVG graphic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PricingVisual />
            </motion.div>
          </div>

          {/* ============================================= */}
          {/* RIGHT: sort controls + pricing cards + note    */}
          {/* ============================================= */}
          <div className="lg:col-span-6 min-w-0 space-y-6 lg:pl-4">
            {/* === SORTING CONTROLS === */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between border-b border-white/5 pb-4"
            >
              <div className="text-sm text-white/40 hidden md:block">
                {displayedItems.length} Available Options
              </div>
              
              <button
                onClick={() => setSortAsc((prev) => (prev === null ? true : !prev))}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 text-white/40 hover:text-white transition-all duration-300 text-sm ml-auto"
              >
                <span>Sort by Price</span>
                <div className="flex flex-col -space-y-1">
                  <ArrowUpDown className={`w-3.5 h-3.5 transition-transform ${sortAsc ? 'rotate-180' : ''}`} />
                </div>
              </button>
            </motion.div>

            {/* === PRICING CARDS - DECREASED WIDTH === */}
            {loading ? (
              <div className="space-y-6">
                {items.map((_, i) => (
                  <SkeletonBar key={i} className="h-[130px] rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : (
              <LayoutGroup>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="space-y-6"
                >
                  <AnimatePresence initial={false}>
                    {displayedItems.map((item) => {
                      const isPopular = item.originalIndex === popularIndex;
                      const isExpanded = expandedItem === item.originalIndex;
                      const Icon = getSystemIcon(item.systemType);

                      return (
                        <motion.div
                          layout
                          key={item.originalIndex}
                          className="relative group"
                        >
                          {/* Popular Badge */}
                          {isPopular && (
                            <div className="absolute -top-3 left-8 z-20 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold shadow-[0_0_20px_-5px_rgba(168,85,247,0.6)]">
                              <Star className="w-3.5 h-3.5 fill-white" />
                              Most Popular
                            </div>
                          )}

                          <motion.div
                            layout
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true }}
                            onClick={() => setExpandedItem(isExpanded ? null : item.originalIndex)}
                            className={`
                              relative cursor-pointer rounded-2xl p-6 md:p-8 
                              border backdrop-blur-sm transition-colors duration-300
                              min-h-[130px] md:min-h-[150px]
                              ${isPopular 
                                ? 'bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border-violet-500/40 shadow-[0_0_40px_-12px_rgba(168,85,247,0.3)]' 
                                : 'bg-white/[0.04] border-white/5 hover:border-violet-500/30 hover:bg-white/[0.07]'
                              }
                              ${isExpanded ? 'border-violet-500/60 shadow-[0_0_50px_-15px_rgba(168,85,247,0.4)]' : ''}
                            `}
                          >
                            {/* Inner Glow for Popular */}
                            {isPopular && (
                              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent rounded-2xl pointer-events-none" />
                            )}

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 py-1">
                              
                              {/* System Type - smaller width */}
                              <div className="flex items-center gap-4 md:w-[28%]">
                                <div className={`
                                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                                  ${isPopular ? 'bg-violet-500/20 text-violet-300' : 'bg-white/5 text-white/40 group-hover:text-violet-400'}
                                  transition-colors duration-300
                                `}>
                                  {Icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-white text-lg">{item.systemType}</div>
                                  <div className="text-xs text-white/40 md:hidden flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {item.timeline}
                                  </div>
                                </div>
                              </div>

                              {/* Price - smaller width */}
                              <div className="md:w-[18%] flex items-center justify-between md:justify-center">
                                <span className="text-sm text-white/40 md:hidden">Price:</span>
                                <span className={`text-2xl font-bold ${isPopular ? 'text-violet-300' : 'text-white group-hover:text-violet-400'} transition-colors duration-300`}>
                                  {item.priceRange}
                                </span>
                              </div>

                              {/* Timeline - smaller width */}
                              <div className="hidden md:flex md:w-[22%] items-center gap-2 text-white/60 text-sm justify-center">
                                <Clock className="w-4 h-4 text-white/40" />
                                {item.timeline}
                              </div>

                              {/* Outcome - smaller width */}
                              <div className="hidden md:flex md:w-[28%] items-center gap-2 text-white/60 text-sm justify-end">
                                <CheckCircle className="w-4 h-4 text-emerald-400/70" />
                                {item.primaryOutcome}
                              </div>

                              {/* Mobile Toggle */}
                              <div className="md:hidden flex justify-end text-white/40 group-hover:text-violet-400 transition-colors">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </div>
                            </div>

                            {/* Mobile Expanded Content */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="md:hidden overflow-hidden relative z-10"
                                >
                                  <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-white/40">Timeline</span>
                                      <span className="text-white/60 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {item.timeline}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-white/40">Primary Outcome</span>
                                      <span className="text-white/60 flex items-center gap-1.5">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400/70" />
                                        {item.primaryOutcome}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Bottom hover line */}
                            <div className={`
                              absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full 
                              bg-gradient-to-r from-transparent via-violet-400 to-transparent 
                              group-hover:w-full transition-all duration-700 ease-out
                              ${isPopular ? 'via-fuchsia-400' : ''}
                            `} />
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            )}

            {/* === FOOTER NOTE === */}
            {note && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-8"
              >
                <p className="text-sm text-white/40 border-t border-white/5 pt-8">
                  {note}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;