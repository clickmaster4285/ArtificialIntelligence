// src/components/services/ServiceDropdownNav.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { serviceNavigationItems } from '@/data/service-navigation';

export function ServiceDropdownNav() {
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
        <span>Services</span>
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
                href="/ai-development"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block p-4 rounded-xl transition-all duration-300",
                  "hover:bg-violet-500/10 hover:shadow-lg",
                  "border border-transparent hover:border-violet-500/30",
                  pathname === '/ai-development' && "bg-violet-500/10 border-violet-500/30 shadow-lg"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-xl shadow-lg shadow-violet-500/20">
                    🤖
                  </div>
                  <div>
                    <div className={cn(
                      "text-sm font-semibold",
                      pathname === '/ai-development' ? "text-violet-soft" : "text-white/80"
                    )}>
                      AI Development
                    </div>
                    <div className="text-xs text-ink-mute">
                      All AI development services
                    </div>
                  </div>
                </div>
              </Link>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-mute">
                    {serviceNavigationItems.length} services available
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - All Subpages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-xs font-semibold text-ink-mute uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>All AI Development Services</span>
                <span className="text-[10px] text-violet-soft font-medium">{serviceNavigationItems.length} services</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {serviceNavigationItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group p-3 rounded-lg transition-all duration-300",
                      "hover:bg-violet-500/10 hover:shadow-sm hover:scale-[1.02]",
                      "border border-transparent hover:border-violet-500/20",
                      pathname === item.path && "bg-violet-500/10 border-violet-500/20 shadow-sm"
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <div className={cn(
                          "text-sm font-medium transition-colors duration-200",
                          pathname === item.path ? "text-violet-soft" : "text-white/70 group-hover:text-violet-soft"
                        )}>
                          {item.title}
                        </div>
                        <div className="text-xs text-white/30 truncate">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href="/ai-development-cost"
                  onClick={() => setIsOpen(false)}
                  className="group text-sm text-violet-soft hover:text-violet-400 font-medium flex items-center gap-1 transition-all duration-200 hover:gap-2"
                >
                  View AI Development Pricing Guide
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
                  USA-based senior engineers
                </span>
                <span className="text-white/20">|</span>
                <span>Fixed-price contracts</span>
                <span className="text-white/20">|</span>
                <span>Full IP transfer</span>
              </div>
              <span className="text-violet-soft font-medium">
                {serviceNavigationItems.length} services
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}