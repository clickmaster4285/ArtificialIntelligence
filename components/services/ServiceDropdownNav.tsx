// src/components/services/ServiceDropdownNav.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ArrowRight,
  CircleDot,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { serviceNavigationItems } from '@/data/service-navigation';
import { getAllChatbotCityPageSlugs, getChatbotCityPageDataBySlug } from '@/data/ai-chatbot-city-pages-data';

// ============================================
// SERVICE SUBPAGES DATA
// ============================================

type ServiceSubPage = {
  slug: string;
  title: string;
  icon: string;
  path: string;
  description?: string;
};

// AI Development subpages (all services except healthcare and chatbot)
const aiDevelopmentSubPages: ServiceSubPage[] = serviceNavigationItems
  .filter(item => item.slug !== 'healthcare' && item.slug !== 'chatbot')
  .map(item => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    icon: item.icon,
    path: item.path,
  }));

// Healthcare city subpages
const healthcareSubPages: ServiceSubPage[] = [
  { slug: 'healthcare-toronto', title: 'Toronto', icon: '🍁', path: '/ai-development/healthcare/toronto' },
  { slug: 'healthcare-atlanta', title: 'Atlanta', icon: '🍑', path: '/ai-development/healthcare/atlanta' },
  { slug: 'healthcare-phoenix', title: 'Phoenix', icon: '🌵', path: '/ai-development/healthcare/phoenix' },
  { slug: 'healthcare-vancouver', title: 'Vancouver', icon: '🌊', path: '/ai-development/healthcare/vancouver' },
  { slug: 'healthcare-new-york', title: 'New York', icon: '🗽', path: '/ai-development/healthcare/new-york' },
  { slug: 'healthcare-houston', title: 'Houston', icon: '🚀', path: '/ai-development/healthcare/houston' },
  { slug: 'healthcare-chicago', title: 'Chicago', icon: '🌆', path: '/ai-development/healthcare/chicago' },
  { slug: 'healthcare-dallas', title: 'Dallas', icon: '⭐', path: '/ai-development/healthcare/dallas' },
  { slug: 'healthcare-miami', title: 'Miami', icon: '🌴', path: '/ai-development/healthcare/miami' },
  { slug: 'healthcare-seattle', title: 'Seattle', icon: '☕', path: '/ai-development/healthcare/seattle' },
  { slug: 'healthcare-austin', title: 'Austin', icon: '🤠', path: '/ai-development/healthcare/austin' },
  { slug: 'healthcare-denver', title: 'Denver', icon: '🏔️', path: '/ai-development/healthcare/denver' },
  { slug: 'healthcare-calgary', title: 'Calgary', icon: '⛰️', path: '/ai-development/healthcare/calgary' },
  { slug: 'healthcare-san-francisco', title: 'San Francisco', icon: '🌉', path: '/ai-development/healthcare/san-francisco' },
  { slug: 'healthcare-washington-dc', title: 'Washington DC', icon: '🏛️', path: '/ai-development/healthcare/washington-dc' },
  { slug: 'healthcare-montreal', title: 'Montreal', icon: '⚜️', path: '/ai-development/healthcare/montreal' },
];

// Chatbot city subpages
const chatbotSlugs = getAllChatbotCityPageSlugs().filter(slug => slug !== 'ai-chatbot-development-company');
const chatbotSubPages: ServiceSubPage[] = chatbotSlugs.map((slug) => {
  // Extract city name from slug
  const citySlug = slug.replace('ai-chatbot-development-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getCityIcon(slug),
    path: `/ai-chatbot-development/${citySlug}`,
  };
});

function getCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'ai-chatbot-development-new-york': '🗽',
    'ai-chatbot-development-toronto': '🍁',
    'ai-chatbot-development-san-francisco': '🌉',
    'ai-chatbot-development-dallas': '⭐',
    'ai-chatbot-development-boston': '🏛️',
    'ai-chatbot-development-miami': '🌴',
    'ai-chatbot-development-austin': '🤠',
    'ai-chatbot-development-vancouver': '🌊',
    'ai-chatbot-development-montreal': '⚜️',
    'ai-chatbot-development-chicago': '🌆',
    'ai-chatbot-development-houston': '🚀',
    'ai-chatbot-development-washington-dc': '🏛️',
    'ai-chatbot-development-philadelphia': '🔔',
    'ai-chatbot-development-atlanta': '🍑',
    'ai-chatbot-development-denver': '🏔️',
    'ai-chatbot-development-los-angeles': '🎬',
    'ai-chatbot-development-charlotte': '🏦',
    'ai-chatbot-development-orlando': '🎢',
    'ai-chatbot-development-columbus': '🏙️',
    'ai-chatbot-development-seattle': '☕',
    'ai-chatbot-development-san-jose': '💻',
    'ai-chatbot-development-calgary': '⛰️',
    'ai-chatbot-development-phoenix': '🌵',
  };
  return icons[slug] || '📍';
}

// Main navigation items (left side)
const mainNavItems = [
  {
    slug: 'ai-development',
    title: 'AI Development',
    description: 'All AI development services',
    icon: '🤖',
    path: '/ai-development',
    subPages: aiDevelopmentSubPages,
    isMain: true,
  },
  {
    slug: 'healthcare',
    title: 'Healthcare AI',
    description: 'Clinical decision support, EHR AI, medical imaging',
    icon: '🏥',
    path: '/ai-development/healthcare',
    subPages: healthcareSubPages,
    isMain: false,
    badge: `${healthcareSubPages.length} cities`,
  },
  {
    slug: 'chatbot',
    title: 'AI Chatbot Development',
    description: 'RAG-grounded chatbots for support, sales & internal use',
    icon: '💬',
    path: '/ai-chatbot-development-company',
    subPages: chatbotSubPages,
    isMain: false,
    badge: `${chatbotSubPages.length} cities`,
  },
];

export function ServiceDropdownNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('ai-development');
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

  // Set active item based on pathname
  useEffect(() => {
    if (pathname?.startsWith('/ai-chatbot-development')) {
      setActiveItem('chatbot');
    } else if (pathname?.startsWith('/ai-development/healthcare')) {
      setActiveItem('healthcare');
    } else if (pathname?.startsWith('/ai-development')) {
      setActiveItem('ai-development');
    }
  }, [pathname]);

  const activeData = mainNavItems.find(item => item.slug === activeItem);

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
        <span>Services</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300 ease-out",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="service-dropdown-panel absolute top-full left-0 mt-2 w-[720px] max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="flex h-[480px]">
            {/* LEFT SIDE - Navigation */}
            <div className="w-1/3 border-r border-zinc-800 overflow-y-auto p-3 bg-zinc-900">
              <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-3 mb-2">
                Services
              </div>

              {mainNavItems.map((item) => {
                const isActive = activeItem === item.slug;
                return (
                  <Link
                    key={item.slug}
                    href={item.path}
                    onMouseEnter={() => setActiveItem(item.slug)}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group relative px-3 py-3 rounded-lg cursor-pointer transition-all duration-200",
                      "hover:bg-violet-600/10",
                      isActive && "bg-violet-600/15"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-lg transition-colors duration-200",
                        isActive ? "bg-violet-600/20" : "bg-zinc-800"
                      )}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            isActive ? "text-violet-400" : "text-white"
                          )}>
                            {item.title}
                          </div>
                          {item.badge && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-white/40 truncate">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-1 h-6 rounded-full bg-violet-500 flex-shrink-0" />
                      )}
                    </div>
                  </Link>
                );
              })}

              {/* Bottom info */}
              <div className="mt-3 pt-3 border-t border-zinc-800 px-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">
                    {mainNavItems.length} main services
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                    </span>
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Subpages */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeData ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                      {activeData.title} — Subpages
                    </div>
                    <span className="text-[10px] text-violet-400 font-semibold">
                      {activeData.subPages.length} items
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {activeData.subPages.map((sub, i) => (
                      <Link
                        key={sub.slug}
                        href={sub.path}
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${Math.min(i, 12) * 20}ms` }}
                        className={cn(
                          "service-dropdown-item group p-3 rounded-lg transition-all duration-200",
                          "hover:bg-violet-600/10 hover:translate-x-0.5",
                          "border border-transparent hover:border-violet-500/20",
                          pathname === sub.path && "bg-violet-600/10 border-violet-500/20"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{sub.icon}</span>
                          <div className="min-w-0">
                            <div className={cn(
                              "text-sm font-medium transition-colors duration-200",
                              pathname === sub.path ? "text-violet-400" : "text-white"
                            )}>
                              {sub.title}
                            </div>
                            {sub.description && (
                              <div className="text-xs text-white/40 truncate">
                                {sub.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View all link */}
                  <div className="mt-3 pt-3 border-t border-zinc-800">
                    <Link
                      href={activeData.path}
                      onClick={() => setIsOpen(false)}
                      className="group text-sm font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-all duration-200 hover:gap-2"
                    >
                      View All {activeData.title} Services
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white/30 text-sm">
                  Select a service to view subpages
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800 p-3 bg-zinc-900">
            <div className="flex items-center justify-between text-xs text-white/40">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <CircleDot className="w-3 h-3 text-emerald-400" />
                  USA-based senior engineers
                </span>
                <span className="text-white/15">|</span>
                <span>Fixed-price contracts</span>
                <span className="text-white/15">|</span>
                <span>Full IP transfer</span>
              </div>
              <Link
                href="/ai-development-cost"
                onClick={() => setIsOpen(false)}
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Pricing Guide →
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes service-dropdown-in {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes service-item-in {
          from {
            opacity: 0;
            transform: translateY(-3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .service-dropdown-panel {
          animation: service-dropdown-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: top left;
        }
        .service-dropdown-item {
          animation: service-item-in 220ms ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-dropdown-panel,
          .service-dropdown-item {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}