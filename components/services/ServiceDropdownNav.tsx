// src/components/services/ServiceDropdownNav.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, CircleDot, Sparkles, Cpu, Zap, 
  Brain, Code, Database, Cloud, Bot, LineChart, Shield, 
  Workflow, BarChart, Target, Layers, Cpu as CpuIcon, 
  Server, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { serviceNavigationItems } from '@/data/service-navigation';

// ============================================
// SERVICE SUBPAGES DATA
// ============================================

type ServiceSubPage = {
  slug: string;
  title: string;
  icon: React.ReactNode;
  path: string;
};

// Professional icon mapping for services
const getServiceIcon = (slug: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    'computer-vision': <Brain className="w-4 h-4" />,
    'llm-fine-tuning': <Bot className="w-4 h-4" />,
    'rag-implementation': <Database className="w-4 h-4" />,
    'mlops': <Workflow className="w-4 h-4" />,
    'data-labeling': <Target className="w-4 h-4" />,
    'model-deployment': <Cloud className="w-4 h-4" />,
    'ai-security': <Shield className="w-4 h-4" />,
    'forecasting': <BarChart className="w-4 h-4" />,
    'optimization': <LineChart className="w-4 h-4" />,
    'ai-agents': <CpuIcon className="w-4 h-4" />,
    'ai-api': <Server className="w-4 h-4" />,
    'ai-consulting': <Network className="w-4 h-4" />,
  };
  return iconMap[slug] || <Code className="w-4 h-4" />;
};

// AI Development subpages (everything that isn't one of the vertical/city
// service groups — those now live in the Locations dropdown)
const aiDevelopmentSubPages: ServiceSubPage[] = serviceNavigationItems
  .filter(
    (item) =>
      ![
        'healthcare',
        'chatbot',
        'media',
        'fintech',
        'proptech',
        'insurance',
        'legaltech',
        'retail',
        'real-estate',
        'edtech',
        'logistics',
        'legal',
        'ecommerce',
        'manufacturing',
        'hr',
      ].includes(item.slug)
  )
  .map((item) => ({
    slug: item.slug,
    title: item.title,
    icon: getServiceIcon(item.slug),
    path: item.path,
  }));

// Single main nav item — Services now only surfaces AI Development itself.
const mainNavItems = [
  {
    slug: 'ai-development',
    title: 'AI Development',
    description: 'All AI development services',
    icon: <Brain className="w-5 h-5" />,
    path: '/ai-development',
    subPages: aiDevelopmentSubPages,
    isMain: true,
  },
];

// ============================================
// ANIMATED AI BANNER
// ============================================

function ServicesAIBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="services-banner relative h-[110px] overflow-hidden bg-[radial-gradient(120%_160%_at_30%_0%,#1a1a2e_0%,#0a0a0f_60%)]">
      <svg
        width="100%"
        height="110"
        viewBox="0 0 700 110"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        <defs>
          {/* Neural network pattern */}
          <pattern id="ai-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1.5" fill="#3f3f46" opacity="0.4" />
            <path d="M15 0 L15 30 M0 15 L30 15" stroke="#2a2a35" strokeWidth="0.4" opacity="0.3" />
          </pattern>
          
          {/* Gradient definitions */}
          <linearGradient id="ai-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
          </linearGradient>
          
          <linearGradient id="ai-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="ai-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="ai-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </radialGradient>

          <filter id="ai-glow-filter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="ai-glow-heavy" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <rect x="0" y="0" width="700" height="110" fill="url(#ai-grid)" opacity="0.6" />
        <rect x="0" y="0" width="700" height="110" fill="url(#ai-glow)" />

        {/* Neural network connections */}
        <g filter="url(#ai-glow-filter)" opacity="0.7">
          {/* Connection lines */}
          <path
            className="ai-neural-line"
            d="M80,25 Q150,15 200,30 Q260,45 320,28 Q380,12 440,35 Q500,50 560,30 Q620,18 680,40"
            fill="none"
            stroke="url(#ai-line)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            className="ai-neural-line"
            style={{ animationDelay: '0.3s' }}
            d="M60,45 Q130,35 190,55 Q250,70 310,50 Q370,32 430,55 Q490,70 550,50 Q610,35 670,55"
            fill="none"
            stroke="url(#ai-line-2)"
            strokeWidth="1.2"
            strokeDasharray="3 8"
          />
          <path
            className="ai-neural-line"
            style={{ animationDelay: '0.6s' }}
            d="M70,70 Q150,55 220,80 Q290,95 360,75 Q430,55 500,78 Q570,95 640,75"
            fill="none"
            stroke="url(#ai-line)"
            strokeWidth="1"
            strokeDasharray="4 7"
          />
          
          {/* Vertical connections */}
          <path
            className="ai-neural-line"
            style={{ animationDelay: '0.2s' }}
            d="M150,20 Q160,45 145,70"
            fill="none"
            stroke="url(#ai-line-2)"
            strokeWidth="0.8"
          />
          <path
            className="ai-neural-line"
            style={{ animationDelay: '0.4s' }}
            d="M310,15 Q325,40 315,65"
            fill="none"
            stroke="url(#ai-line)"
            strokeWidth="0.8"
          />
          <path
            className="ai-neural-line"
            style={{ animationDelay: '0.5s' }}
            d="M470,25 Q485,50 475,75"
            fill="none"
            stroke="url(#ai-line-2)"
            strokeWidth="0.8"
          />
          <path
            className="ai-neural-line"
            style={{ animationDelay: '0.7s' }}
            d="M580,35 Q595,60 585,80"
            fill="none"
            stroke="url(#ai-line)"
            strokeWidth="0.8"
          />
        </g>

        {/* Neural nodes */}
        <g filter="url(#ai-glow-filter)">
          {/* Node 1 */}
          <circle className="ai-node" cx="80" cy="25" r="4" fill="#c4b5fd" opacity="0.9" />
          <circle className="ai-node-pulse" cx="80" cy="25" r="12" fill="none" stroke="#c4b5fd" strokeWidth="0.6" opacity="0.3" />
          
          {/* Node 2 */}
          <circle className="ai-node" style={{ animationDelay: '0.15s' }} cx="200" cy="30" r="3.5" fill="#a78bfa" opacity="0.9" />
          <circle className="ai-node-pulse" style={{ animationDelay: '0.15s' }} cx="200" cy="30" r="10" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.3" />
          
          {/* Node 3 */}
          <circle className="ai-node" style={{ animationDelay: '0.3s' }} cx="320" cy="28" r="5" fill="#8b5cf6" opacity="0.9" />
          <circle className="ai-node-pulse" style={{ animationDelay: '0.3s' }} cx="320" cy="28" r="14" fill="none" stroke="#8b5cf6" strokeWidth="0.7" opacity="0.3" />
          
          {/* Node 4 */}
          <circle className="ai-node" style={{ animationDelay: '0.45s' }} cx="440" cy="35" r="4" fill="#c4b5fd" opacity="0.9" />
          <circle className="ai-node-pulse" style={{ animationDelay: '0.45s' }} cx="440" cy="35" r="11" fill="none" stroke="#c4b5fd" strokeWidth="0.5" opacity="0.3" />
          
          {/* Node 5 */}
          <circle className="ai-node" style={{ animationDelay: '0.6s' }} cx="560" cy="30" r="3.5" fill="#a78bfa" opacity="0.9" />
          <circle className="ai-node-pulse" style={{ animationDelay: '0.6s' }} cx="560" cy="30" r="10" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.3" />
          
          {/* Node 6 */}
          <circle className="ai-node" style={{ animationDelay: '0.75s' }} cx="680" cy="40" r="4.5" fill="#8b5cf6" opacity="0.9" />
          <circle className="ai-node-pulse" style={{ animationDelay: '0.75s' }} cx="680" cy="40" r="13" fill="none" stroke="#8b5cf6" strokeWidth="0.6" opacity="0.3" />
          
          {/* Secondary nodes */}
          <circle className="ai-node" style={{ animationDelay: '0.1s' }} cx="130" cy="55" r="3" fill="#818cf8" opacity="0.8" />
          <circle className="ai-node" style={{ animationDelay: '0.25s' }} cx="250" cy="60" r="3.5" fill="#a78bfa" opacity="0.8" />
          <circle className="ai-node" style={{ animationDelay: '0.4s' }} cx="370" cy="52" r="4" fill="#c4b5fd" opacity="0.8" />
          <circle className="ai-node" style={{ animationDelay: '0.55s' }} cx="490" cy="62" r="3" fill="#818cf8" opacity="0.8" />
          <circle className="ai-node" style={{ animationDelay: '0.7s' }} cx="620" cy="55" r="3.5" fill="#a78bfa" opacity="0.8" />
        </g>

        {/* Animated data flow particles */}
        <g filter="url(#ai-glow-heavy)">
          <circle className="ai-particle" cx="100" cy="35" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '0.4s' }} cx="250" cy="45" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '0.8s' }} cx="400" cy="30" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '1.2s' }} cx="550" cy="50" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '1.6s' }} cx="180" cy="60" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '2.0s' }} cx="330" cy="65" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '2.4s' }} cx="460" cy="55" r="1.5" fill="#e9d5ff" />
          <circle className="ai-particle" style={{ animationDelay: '2.8s' }} cx="600" cy="40" r="1.5" fill="#e9d5ff" />
        </g>

        {/* Floating code-like elements */}
        <g opacity="0.15" className="ai-code">
          <text x="90" y="20" fill="#c4b5fd" fontSize="6" fontFamily="monospace">AI</text>
          <text x="280" y="15" fill="#a78bfa" fontSize="6" fontFamily="monospace">ML</text>
          <text x="420" y="20" fill="#8b5cf6" fontSize="6" fontFamily="monospace">DL</text>
          <text x="580" y="18" fill="#c4b5fd" fontSize="6" fontFamily="monospace">NN</text>
        </g>

        {/* Animated pulse rings */}
        <circle className="ai-pulse-ring" cx="350" cy="50" r="30" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.15" />
        <circle className="ai-pulse-ring" style={{ animationDelay: '1s' }} cx="350" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="0.3" opacity="0.1" />
        <circle className="ai-pulse-ring" style={{ animationDelay: '2s' }} cx="350" cy="50" r="60" fill="none" stroke="#8b5cf6" strokeWidth="0.2" opacity="0.05" />
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/0 via-transparent to-[#0a0a0f]" style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0) 30%, #0a0a0f 100%)' }} />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, #0a0a0f 0%, rgba(10,10,15,0) 16%, rgba(10,10,15,0) 84%, #0a0a0f 100%)' }} />

      <div className="relative h-full flex items-end justify-between px-4 py-3">
        <div>
          <div className="services-label text-sm font-medium text-white flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            {title}
          </div>
          <div className="services-label text-[11px] text-zinc-300" style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </div>
        </div>
        <div
          className="services-label flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            animationDelay: '0.2s',
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.4)',
          }}
        >
          <Cpu className="w-3 h-3 text-violet-400" />
          <span className="text-[10px] font-medium text-purple-100">AI Development</span>
          <Zap className="w-2.5 h-2.5 text-violet-400" />
        </div>
      </div>
    </div>
  );
}

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

  // Only one item exists now, so it's always active.
  useEffect(() => {
    setActiveItem('ai-development');
  }, [pathname]);

  const activeData = mainNavItems.find((item) => item.slug === activeItem);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200',
          isOpen && 'text-white'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Services</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-300 ease-out',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="service-dropdown-panel absolute top-full left-0 mt-2 w-[700px] max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden">
          <ServicesAIBanner 
            title="AI Development Services" 
            subtitle={`${aiDevelopmentSubPages.length} specialized AI solutions`} 
          />

          <div className="flex h-[450px]">
            {/* LEFT SIDE - Navigation */}
            <div className="w-[200px] shrink-0 border-r border-zinc-800 overflow-y-auto p-4 bg-zinc-900">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-1">
                Main Page
              </div>

              <div className="space-y-2">
                {mainNavItems.map((item) => {
                  const isActive = activeItem === item.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={item.path}
                      onMouseEnter={() => setActiveItem(item.slug)}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200',
                        'hover:bg-violet-600/15',
                        'border border-transparent hover:border-violet-500/40',
                        isActive && 'bg-violet-600/15 border-violet-500/40'
                      )}
                    >
                      <div
                        className={cn(
                          'w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200',
                          isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/30' : 'bg-zinc-800'
                        )}
                      >
                        <div className="text-violet-400">{item.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            'text-base font-medium transition-colors duration-200',
                            isActive ? 'text-white' : 'text-white/80'
                          )}
                        >
                          {item.title}
                        </div>
                        <div className="text-xs text-white/40 truncate">{item.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom info */}
              <div className="mt-5 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">{aiDevelopmentSubPages.length} sub-services</span>
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

            {/* RIGHT SIDE - Subpages with expanded width and 3-column layout */}
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

                  <div className="grid grid-cols-2 gap-2">
                    {activeData.subPages.map((sub, i) => (
                      <Link
                        key={sub.slug}
                        href={sub.path}
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${Math.min(i, 12) * 20}ms` }}
                        className={cn(
                          'service-dropdown-item group p-3 rounded-lg transition-all duration-200',
                          'hover:bg-violet-600/10 hover:translate-x-0.5',
                          'border border-transparent hover:border-violet-500/20',
                          pathname === sub.path && 'bg-violet-600/10 border-violet-500/20'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 shrink-0 rounded-lg bg-zinc-800 group-hover:bg-violet-600/20 flex items-center justify-center text-violet-400 transition-colors duration-200">
                            {sub.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className={cn(
                                'text-sm font-medium transition-colors duration-200 whitespace-nowrap',
                                pathname === sub.path ? 'text-violet-400' : 'text-white'
                              )}
                            >
                              {sub.title}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View all link */}
                  <div className="mt-4 pt-4 border-t border-zinc-800">
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
            <div className="flex items-center justify-between text-xs text-white/50">
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
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes service-item-in {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ai-neural-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes ai-node-pulse {
          0% { r: 3; opacity: 0.6; }
          50% { r: 8; opacity: 0; }
          100% { r: 8; opacity: 0; }
        }
        @keyframes ai-particle-flow {
          0% { opacity: 0; transform: translateY(0px) scale(0.5); }
          50% { opacity: 1; transform: translateY(-5px) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.5); }
        }
        @keyframes ai-code-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes ai-pulse-ring-expand {
          0% { transform: scale(0.8); opacity: 0.15; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes ai-label-fade {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .service-dropdown-panel {
          animation: service-dropdown-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: top left;
        }
        .service-dropdown-item {
          animation: service-item-in 220ms ease-out both;
        }
        
        /* AI Banner Animations */
        .ai-neural-line {
          animation: ai-neural-pulse 2s ease-in-out infinite;
        }
        .ai-node-pulse {
          animation: ai-node-pulse 2s ease-out infinite;
        }
        .ai-particle {
          animation: ai-particle-flow 3s ease-in-out infinite;
        }
        .ai-code {
          animation: ai-code-float 3s ease-in-out infinite;
        }
        .ai-pulse-ring {
          animation: ai-pulse-ring-expand 3s ease-out infinite;
        }
        .services-label {
          animation: ai-label-fade 0.5s ease-out both;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .service-dropdown-panel,
          .service-dropdown-item,
          .ai-neural-line,
          .ai-node-pulse,
          .ai-particle,
          .ai-code,
          .ai-pulse-ring,
          .services-label {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}