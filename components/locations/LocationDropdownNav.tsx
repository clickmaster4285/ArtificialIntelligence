// src/components/services/LocationDropdownNav.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe2, MapPin, ArrowRight, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllLocationPageData } from '@/data/ai-development-company-pages-data';

export function LocationDropdownNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Get all location data
  const allLocations = getAllLocationPageData();

  // Get state/province abbreviation for a location
  const getState = (slug: string): string => {
    const stateMap: Record<string, string> = {
      'new-york': 'NY',
      'san-francisco': 'CA',
      'los-angeles': 'CA',
      'chicago': 'IL',
      'boston': 'MA',
      'seattle': 'WA',
      'austin': 'TX',
      'dallas': 'TX',
      'denver': 'CO',
      'atlanta': 'GA',
      'houston': 'TX',
      'washington-dc': 'DC',
      'toronto': 'ON',
      'miami': 'FL',
      'phoenix': 'AZ',
      'portland': 'OR',
      'minneapolis': 'MN',
      'vancouver': 'BC',
      'san-diego': 'CA',
      'calgary': 'AB',
      'nashville': 'TN',
      'raleigh': 'NC',
      'las-vegas': 'NV',
      'salt-lake-city': 'UT',
      'detroit': 'MI',
      'pittsburgh': 'PA',
      'orlando': 'FL',
      'charlotte': 'NC',
      'new-jersey': 'NJ',
      'cleveland': 'OH',
      'indianapolis': 'IN',
      'kansas-city': 'MO',
      'sacramento': 'CA',
      'st-louis': 'MO',
      'tampa': 'FL',
      'cincinnati': 'OH',
      'montreal': 'QC'
    };
    return stateMap[slug] || '';
  };

  // US locations (all except Canadian)
  const usLocations = allLocations.filter(({ slug }) =>
    !['toronto', 'vancouver', 'calgary', 'montreal'].includes(slug)
  );

  // Canadian locations
  const caLocations = allLocations.filter(({ slug }) =>
    ['toronto', 'vancouver', 'calgary', 'montreal'].includes(slug)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200",
          isOpen && "text-white"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Locations</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300 ease-out",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="location-dropdown-panel absolute top-full left-0 mt-2 w-[700px] max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="flex h-[420px]">
            {/* Left Side - Main Page */}
            <div className="w-1/3 border-r border-zinc-800 overflow-y-auto p-4 bg-zinc-900">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                Main Page
              </div>

              <Link
                href="/ai-development-company"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block p-4 rounded-xl transition-all duration-200",
                  "hover:bg-violet-600/15",
                  "border border-transparent hover:border-violet-500/40",
                  pathname === '/ai-development-company' && "bg-violet-600/15 border-violet-500/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                    <Globe2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      AI Development Company
                    </div>
                    <div className="text-xs text-white/50">
                      All AI development locations
                    </div>
                  </div>
                </div>
              </Link>

              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">
                    {allLocations.length} locations available
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                    </span>
                    Global
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - All Locations */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>All Locations</span>
                <span className="text-[10px] text-violet-400 font-semibold">{allLocations.length} locations</span>
              </div>

              {/* US Locations */}
              <div className="mb-3">
                <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">
                  United States
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {usLocations.map(({ slug, data }, i) => (
                    <Link
                      key={slug}
                      href={`/ai-development-company/${slug}`}
                      onClick={() => setIsOpen(false)}
                      style={{ animationDelay: `${Math.min(i, 12) * 20}ms` }}
                      className={cn(
                        "location-dropdown-item group p-2.5 rounded-lg transition-all duration-200",
                        "hover:bg-violet-600/15 hover:translate-x-0.5",
                        "border border-transparent hover:border-violet-500/30",
                        pathname === `/ai-development-company/${slug}` && "bg-violet-600/15 border-violet-500/30"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 shrink-0 rounded-md bg-zinc-800 group-hover:bg-violet-600/30 flex items-center justify-center transition-colors duration-200">
                          <MapPin className="w-3.5 h-3.5 text-white/70 group-hover:text-violet-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-white flex items-center gap-1">
                            {data.h1.split('  ')[0].replace('AI Development Company in ', '')}
                            <span className="text-[10px] font-normal text-white/35">
                              {getState(slug)}
                            </span>
                          </div>
                          <div className="text-[10px] text-white/35 truncate">
                            {data.hero.tagline.split(' ').slice(0, 4).join(' ')}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Canadian Locations */}
              {caLocations.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">
                    Canada
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {caLocations.map(({ slug, data }, i) => (
                      <Link
                        key={slug}
                        href={`/ai-development-company/${slug}`}
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${(usLocations.length + i) % 12 * 20}ms` }}
                        className={cn(
                          "location-dropdown-item group p-2.5 rounded-lg transition-all duration-200",
                          "hover:bg-violet-600/15 hover:translate-x-0.5",
                          "border border-transparent hover:border-violet-500/30",
                          pathname === `/ai-development-company/${slug}` && "bg-violet-600/15 border-violet-500/30"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 shrink-0 rounded-md bg-zinc-800 group-hover:bg-violet-600/30 flex items-center justify-center transition-colors duration-200">
                            <MapPin className="w-3.5 h-3.5 text-white/70 group-hover:text-violet-300" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white flex items-center gap-1">
                              {data.h1.split('  ')[0].replace('AI Development Company in ', '')}
                              <span className="text-[10px] font-normal text-white/35">
                                {getState(slug)}
                              </span>
                            </div>
                            <div className="text-[10px] text-white/35 truncate">
                              {data.hero.tagline.split(' ').slice(0, 4).join(' ')}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-zinc-800">
                <Link
                  href="/ai-development-company"
                  onClick={() => setIsOpen(false)}
                  className="group text-sm font-medium text-white flex items-center gap-1 transition-all duration-200 hover:gap-2"
                >
                  View All AI Development Company Locations
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 p-3 bg-zinc-900">
            <div className="flex items-center justify-between text-xs text-white/50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <CircleDot className="w-3 h-3 text-emerald-400" />
                  USA & Canada
                </span>
                <span className="text-white/15">|</span>
                <span>Eastern to Pacific timezones</span>
                <span className="text-white/15">|</span>
                <span>On-site available</span>
              </div>
              <span className="text-white font-semibold">
                {allLocations.length} locations
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes location-dropdown-in {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes location-item-in {
          from {
            opacity: 0;
            transform: translateY(-3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .location-dropdown-panel {
          animation: location-dropdown-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: top left;
        }
        .location-dropdown-item {
          animation: location-item-in 220ms ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .location-dropdown-panel,
          .location-dropdown-item {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}