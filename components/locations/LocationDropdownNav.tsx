// src/components/services/LocationDropdownNav.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  
  // Get icon for each location
  const getIcon = (slug: string): string => {
    const icons: Record<string, string> = {
      'new-york': '🗽',
      'san-francisco': '🌉',
      'los-angeles': '🎬',
      'chicago': '🌆',
      'boston': '🏛️',
      'seattle': '☕',
      'austin': '🤠',
      'dallas': '⭐',
      'denver': '🏔️',
      'atlanta': '🍑',
      'houston': '🚀',
      'washington-dc': '🏛️',
      'toronto': '🍁',
      'miami': '🌴',
      'phoenix': '🌵',
      'portland': '🌲',
      'minneapolis': '❄️',
      'vancouver': '🌊',
      'san-diego': '🌅',
      'calgary': '⛰️',
      'nashville': '🎵',
      'raleigh': '🔬',
      'las-vegas': '🎰',
      'salt-lake-city': '⛷️',
      'detroit': '🚗',
      'pittsburgh': '🏗️',
      'orlando': '🎢',
      'charlotte': '🏦',
      'new-jersey': '💊',
      'cleveland': '🏥',
      'indianapolis': '🏎️',
      'kansas-city': '🌾',
      'sacramento': '🏛️',
      'st-louis': '🌉',
      'tampa': '🌊',
      'cincinnati': '🏙️',
      'montreal': '⚜️'
    };
    return icons[slug] || '📍';
  };

  // Get state/province from meta description or title
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

  // Check if we're on a location page
  const isLocationPage = pathname?.startsWith('/ai-development-company/');
  const currentSlug = pathname?.split('/').pop() || '';

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
          "text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1",
          isOpen && "text-white"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Locations</span>
        <svg
          className={cn(
            "w-3 h-3 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[700px] max-w-[90vw] glass rounded-xl shadow-2xl overflow-hidden dropdown-enter">
          <div className="flex h-[420px]">
            {/* Left Side - Main Page */}
            <div className="w-1/3 border-r border-white/10 overflow-y-auto p-4 bg-background/60">
              <div className="text-xs font-semibold text-ink-mute uppercase tracking-wider mb-3">
                Main Page
              </div>

              <Link
                href="/ai-development-company"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block p-4 rounded-xl transition-all duration-300",
                  "hover:bg-violet-500/10 hover:shadow-lg",
                  "border border-transparent hover:border-violet-500/30",
                  pathname === '/ai-development-company' && "bg-violet-500/10 border-violet-500/30 shadow-lg"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-xl shadow-lg shadow-violet-500/20">
                    🌍
                  </div>
                  <div>
                    <div className={cn(
                      "text-sm font-semibold",
                      pathname === '/ai-development-company' ? "text-violet-soft" : "text-white/80"
                    )}>
                      AI Development Company
                    </div>
                    <div className="text-xs text-ink-mute">
                      All AI development locations
                    </div>
                  </div>
                </div>
              </Link>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-mute">
                    {allLocations.length} locations available
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Global
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - All Locations */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-xs font-semibold text-ink-mute uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>All Locations</span>
                <span className="text-[10px] text-violet-soft font-medium">{allLocations.length} locations</span>
              </div>

              {/* US Locations */}
              <div className="mb-3">
                <div className="text-[10px] font-semibold text-ink-mute/50 uppercase tracking-wider mb-1.5">
                  United States
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {usLocations.map(({ slug, data }) => (
                    <Link
                      key={slug}
                      href={`/ai-development-company/${slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group p-2.5 rounded-lg transition-all duration-300",
                        "hover:bg-violet-500/10 hover:shadow-sm hover:scale-[1.02]",
                        "border border-transparent hover:border-violet-500/20",
                        pathname === `/ai-development-company/${slug}` && "bg-violet-500/10 border-violet-500/20 shadow-sm"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-base group-hover:scale-110 transition-transform duration-300">
                          {getIcon(slug)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className={cn(
                            "text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                            pathname === `/ai-development-company/${slug}` ? "text-violet-soft" : "text-white/70 group-hover:text-violet-soft"
                          )}>
                            {data.h1.split(' — ')[0].replace('AI Development Company in ', '')}
                            <span className="text-[10px] font-normal text-white/30 group-hover:text-violet-soft/50 transition-colors duration-200">
                              {getState(slug)}
                            </span>
                          </div>
                          <div className="text-[10px] text-white/30 truncate">
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
                  <div className="text-[10px] font-semibold text-ink-mute/50 uppercase tracking-wider mb-1.5">
                    Canada
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {caLocations.map(({ slug, data }) => (
                      <Link
                        key={slug}
                        href={`/ai-development-company/${slug}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group p-2.5 rounded-lg transition-all duration-300",
                          "hover:bg-violet-500/10 hover:shadow-sm hover:scale-[1.02]",
                          "border border-transparent hover:border-violet-500/20",
                          pathname === `/ai-development-company/${slug}` && "bg-violet-500/10 border-violet-500/20 shadow-sm"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-base group-hover:scale-110 transition-transform duration-300">
                            {getIcon(slug)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className={cn(
                              "text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                              pathname === `/ai-development-company/${slug}` ? "text-violet-soft" : "text-white/70 group-hover:text-violet-soft"
                            )}>
                              {data.h1.split(' — ')[0].replace('AI Development Company in ', '')}
                              <span className="text-[10px] font-normal text-white/30 group-hover:text-violet-soft/50 transition-colors duration-200">
                                {getState(slug)}
                              </span>
                            </div>
                            <div className="text-[10px] text-white/30 truncate">
                              {data.hero.tagline.split(' ').slice(0, 4).join(' ')}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href="/ai-development-company"
                  onClick={() => setIsOpen(false)}
                  className="group text-sm text-violet-soft hover:text-violet-400 font-medium flex items-center gap-1 transition-all duration-200 hover:gap-2"
                >
                  View All AI Development Company Locations
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-3 bg-background/60">
            <div className="flex items-center justify-between text-xs text-ink-mute">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  USA & Canada
                </span>
                <span className="text-white/20">|</span>
                <span>Eastern to Pacific timezones</span>
                <span className="text-white/20">|</span>
                <span>On-site available</span>
              </div>
              <span className="text-violet-soft font-medium">
                {allLocations.length} locations
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}