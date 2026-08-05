'use client';

// components/sections/PricingSection.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, ArrowUpDown, Star } from 'lucide-react';
import { GradientHeading } from '@/components/locations/sections/GradientHeading';
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
  /** index (in the original `items` order) to badge as "Most Popular" with a glow */
  popularIndex?: number;
}

function firstNumber(priceRange: string): number {
  const match = priceRange.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

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

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12 text-left"
        >
          <span className="text-eyebrow text-violet-400">Pricing</span>
          <div className="mt-2">
            <GradientHeading text={title} as="h2" className="text-3xl md:text-4xl" />
          </div>
          {description && <p className="mt-4 text-ink-soft">{description}</p>}
        </motion.div>

        <div className="space-y-3">
          {/* Header + sort control */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-ink-mute border-b border-white/5">
            <div className="col-span-4">System Type</div>
            <button
              onClick={() => setSortAsc((prev) => (prev === null ? true : !prev))}
              className="col-span-3 flex items-center gap-1.5 hover:text-violet-400 transition-colors w-fit"
            >
              Price Range
              <ArrowUpDown className={`w-3.5 h-3.5 transition-transform ${sortAsc ? 'rotate-180' : ''}`} />
            </button>
            <div className="col-span-2">Timeline</div>
            <div className="col-span-3">Primary Outcome</div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {items.map((_, i) => (
                <SkeletonBar key={i} className="h-[68px] rounded-xl" />
              ))}
            </div>
          ) : (
            <LayoutGroup>
              <motion.div layout className="space-y-3">
                <AnimatePresence initial={false}>
                  {displayedItems.map((item) => {
                    const isPopular = item.originalIndex === popularIndex;
                    const isExpanded = expandedItem === item.originalIndex;
                    return (
                      <motion.div
                        layout
                        key={item.originalIndex}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                      >
                        {isPopular && (
                          <div className="absolute -top-3 left-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[11px] font-semibold shadow-violet-glow">
                            <Star className="w-3 h-3 fill-white" />
                            Most Popular
                          </div>
                        )}
                        <div
                          className={`
                            grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 md:p-5
                            rounded-xl border bg-white/5 backdrop-blur-sm
                            hover:bg-white/[0.08] transition-all duration-300 cursor-pointer
                            ${isPopular ? 'border-violet-500/40 shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)]' : 'border-white/5 hover:border-violet-500/30'}
                            ${isExpanded ? 'border-violet-500/40 bg-violet-500/5' : ''}
                          `}
                          onClick={() => setExpandedItem(isExpanded ? null : item.originalIndex)}
                        >
                          <div className="md:col-span-4 flex items-center gap-3">
                            <div className="md:hidden text-xs text-ink-mute font-medium">System Type</div>
                            <span className="font-medium text-white">{item.systemType}</span>
                          </div>
                          <div className="md:col-span-3 flex items-center gap-3">
                            <div className="md:hidden text-xs text-ink-mute font-medium">Price</div>
                            <span className="text-violet-400 font-semibold">{item.priceRange}</span>
                          </div>
                          <div className="md:col-span-2 flex items-center gap-3">
                            <div className="md:hidden text-xs text-ink-mute font-medium">Timeline</div>
                            <span className="text-ink-soft flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-ink-mute" />
                              {item.timeline}
                            </span>
                          </div>
                          <div className="md:col-span-3 flex items-center gap-3">
                            <div className="md:hidden text-xs text-ink-mute font-medium">Outcome</div>
                            <span className="text-ink-soft text-sm">{item.primaryOutcome}</span>
                          </div>
                          <div className="md:hidden flex justify-end">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-ink-mute" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-ink-mute" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="md:hidden overflow-hidden"
                            >
                              <div className="p-4 mt-1 rounded-xl border border-white/5 bg-white/5">
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-ink-mute">Price</span>
                                    <span className="text-violet-400 font-semibold">{item.priceRange}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-ink-mute">Timeline</span>
                                    <span className="text-ink-soft">{item.timeline}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-ink-mute">Outcome</span>
                                    <span className="text-ink-soft">{item.primaryOutcome}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}
        </div>

        {note && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-sm text-ink-mute text-left border-t border-white/5 pt-6"
          >
            {note}
          </motion.p>
        )}
      </div>
    </section>
  );
};