// src/components/services/LocationDropdownNav.tsx

'use client';

import { useState, useRef, useEffect, forwardRef, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Globe2,
  MapPin,
  ArrowRight,
  CircleDot,
  HeartPulse,
  MessageSquare,
  Tv,
  Landmark,
  Building2,
  ShieldCheck,
  Scale,
  ShoppingBag,
  Home,
  GraduationCap,
  Truck,
  Gavel,
  ShoppingCart,
  Factory,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllLocationPageData } from '@/data/ai-development-company-pages-data';
import { getAllChatbotCityPageSlugs } from '@/data/ai-chatbot-city-pages-data';
import { getAllMediaAICityPageSlugs } from '@/data/media-ai-city-pages-data';
import { getAllFinTechAICityPageSlugs } from '@/data/fintech-ai-city-pages-data';
import { getAllPropTechAICityPageSlugs } from '@/data/proptech-ai-city-pages-data';
import { getAllInsuranceAICityPageSlugs } from '@/data/insurance-ai-city-pages-data';
import { getAllLegalTechAICityPageSlugs } from '@/data/legaltech-ai-city-pages-data';
import { getAllRetailAICityPageSlugs } from '@/data/retail-ai-city-pages-data';
import { getAllRealEstateAICityPageSlugs } from '@/data/real-estate-ai-city-pages-data';
import { getAllEdTechAICityPageSlugs } from '@/data/edtech-ai-city-pages-data';
import { getAllLogisticsAICityPageSlugs } from '@/data/logistics-ai-city-pages-data';
import { getAllLegalAICityPageSlugs } from '@/data/legal-ai-city-pages-data';
import { getAllEcommerceAICityPageSlugs } from '@/data/ecommerce-ai-city-pages-data';
import { getAllManufacturingAICityPageSlugs } from '@/data/manufacturing-ai-city-pages-data';
import { getAllHRAICityPageSlugs } from '@/data/hr-ai-city-pages-data';

// ============================================
// CITY SUBPAGE DATA
// ============================================

type CityPage = {
  slug: string;
  title: string;
  path: string;
};

function toTitle(citySlug: string) {
  return citySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const healthcareSubPages: CityPage[] = [
  { slug: 'healthcare-toronto', title: 'Toronto', path: '/ai-development/healthcare/toronto' },
  { slug: 'healthcare-atlanta', title: 'Atlanta', path: '/ai-development/healthcare/atlanta' },
  { slug: 'healthcare-phoenix', title: 'Phoenix', path: '/ai-development/healthcare/phoenix' },
  { slug: 'healthcare-vancouver', title: 'Vancouver', path: '/ai-development/healthcare/vancouver' },
  { slug: 'healthcare-new-york', title: 'New York', path: '/ai-development/healthcare/new-york' },
  { slug: 'healthcare-houston', title: 'Houston', path: '/ai-development/healthcare/houston' },
  { slug: 'healthcare-chicago', title: 'Chicago', path: '/ai-development/healthcare/chicago' },
  { slug: 'healthcare-dallas', title: 'Dallas', path: '/ai-development/healthcare/dallas' },
  { slug: 'healthcare-miami', title: 'Miami', path: '/ai-development/healthcare/miami' },
  { slug: 'healthcare-seattle', title: 'Seattle', path: '/ai-development/healthcare/seattle' },
  { slug: 'healthcare-austin', title: 'Austin', path: '/ai-development/healthcare/austin' },
  { slug: 'healthcare-denver', title: 'Denver', path: '/ai-development/healthcare/denver' },
  { slug: 'healthcare-calgary', title: 'Calgary', path: '/ai-development/healthcare/calgary' },
  { slug: 'healthcare-san-francisco', title: 'San Francisco', path: '/ai-development/healthcare/san-francisco' },
  { slug: 'healthcare-washington-dc', title: 'Washington DC', path: '/ai-development/healthcare/washington-dc' },
  { slug: 'healthcare-montreal', title: 'Montreal', path: '/ai-development/healthcare/montreal' },
];

function buildCityPages(
  slugs: string[],
  prefix: string,
  basePath: string,
  excludeSlug?: string
): CityPage[] {
  return slugs
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => {
      const citySlug = slug.replace(prefix, '');
      return {
        slug,
        title: toTitle(citySlug),
        path: `${basePath}/${citySlug}`,
      };
    });
}

const chatbotSubPages = buildCityPages(
  getAllChatbotCityPageSlugs(),
  'ai-chatbot-development-',
  '/ai-chatbot-development',
  'ai-chatbot-development-company'
);
const mediaSubPages = buildCityPages(getAllMediaAICityPageSlugs(), 'media-', '/ai-development/media', 'media-content');
const fintechSubPages = buildCityPages(getAllFinTechAICityPageSlugs(), 'fintech-', '/ai-development/fintech', 'fintech');
const proptechSubPages = buildCityPages(getAllPropTechAICityPageSlugs(), 'proptech-', '/ai-development/proptech', 'proptech');
const insuranceSubPages = buildCityPages(getAllInsuranceAICityPageSlugs(), 'insurance-', '/ai-development/insurance', 'insurance');
const legaltechSubPages = buildCityPages(getAllLegalTechAICityPageSlugs(), 'legaltech-', '/ai-development/legaltech');
const retailSubPages = buildCityPages(getAllRetailAICityPageSlugs(), 'retail-', '/ai-development/retail', 'retail');
const realEstateSubPages = buildCityPages(getAllRealEstateAICityPageSlugs(), 'real-estate-', '/ai-development/real-estate', 'real-estate');
const edtechSubPages = buildCityPages(getAllEdTechAICityPageSlugs(), 'edtech-', '/ai-development/edtech');
const logisticsSubPages = buildCityPages(getAllLogisticsAICityPageSlugs(), 'logistics-', '/ai-development/logistics', 'logistics');
const legalSubPages = buildCityPages(getAllLegalAICityPageSlugs(), 'legal-', '/ai-development/legal', 'legal');
const ecommerceSubPages = buildCityPages(getAllEcommerceAICityPageSlugs(), 'ecommerce-', '/ai-development/ecommerce', 'ecommerce');
const manufacturingSubPages = buildCityPages(getAllManufacturingAICityPageSlugs(), 'manufacturing-', '/ai-development/manufacturing', 'manufacturing');
const hrSubPages = buildCityPages(getAllHRAICityPageSlugs(), 'hr-', '/ai-development/hr', 'hr-technology');

// ============================================
// LEFT NAV ITEMS
// ============================================

type LeftNavItem = {
  slug: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  path: string;
  subPages?: CityPage[];
  isMain?: boolean;
};

const verticalNavItems: LeftNavItem[] = [
  { slug: 'healthcare', title: 'Healthcare AI', icon: HeartPulse, path: '/ai-development/healthcare', subPages: healthcareSubPages },
  { slug: 'chatbot', title: 'AI Chatbot Development', icon: MessageSquare, path: '/ai-chatbot-development-company', subPages: chatbotSubPages },
  { slug: 'media', title: 'Media & Content AI', icon: Tv, path: '/ai-development/media-content', subPages: mediaSubPages },
  { slug: 'fintech', title: 'FinTech AI', icon: Landmark, path: '/ai-development/fintech', subPages: fintechSubPages },
  { slug: 'proptech', title: 'PropTech AI', icon: Building2, path: '/ai-development/proptech', subPages: proptechSubPages },
  { slug: 'insurance', title: 'Insurance AI', icon: ShieldCheck, path: '/ai-development/insurance', subPages: insuranceSubPages },
  { slug: 'legaltech', title: 'LegalTech AI', icon: Scale, path: '/ai-development/legaltech', subPages: legaltechSubPages },
  { slug: 'retail', title: 'Retail AI', icon: ShoppingBag, path: '/ai-development/retail', subPages: retailSubPages },
  { slug: 'real-estate', title: 'Real Estate AI', icon: Home, path: '/ai-development/real-estate', subPages: realEstateSubPages },
  { slug: 'edtech', title: 'EdTech AI', icon: GraduationCap, path: '/ai-development/edtech', subPages: edtechSubPages },
  { slug: 'logistics', title: 'Logistics AI', icon: Truck, path: '/ai-development/logistics', subPages: logisticsSubPages },
  { slug: 'legal', title: 'Legal AI', icon: Gavel, path: '/ai-development/legal', subPages: legalSubPages },
  { slug: 'ecommerce', title: 'Ecommerce AI', icon: ShoppingCart, path: '/ai-development/ecommerce', subPages: ecommerceSubPages },
  { slug: 'manufacturing', title: 'Manufacturing AI', icon: Factory, path: '/ai-development/manufacturing', subPages: manufacturingSubPages },
  { slug: 'hr', title: 'HR AI', icon: Users, path: '/ai-development/hr', subPages: hrSubPages },
];

// ============================================
// ANIMATED MAP BANNER
// ============================================
// Wrapped in forwardRef so the parent can measure its actual rendered
// height (instead of hardcoding "110") when computing how much room is
// left for the scrollable columns below it.
const LocationMapBanner = forwardRef<HTMLDivElement, { title: string; subtitle: string }>(
  function LocationMapBanner({ title, subtitle }, ref) {
    return (
      <div
        ref={ref}
        className="location-banner relative h-[110px] overflow-hidden bg-[radial-gradient(120%_160%_at_30%_0%,#1c1a24_0%,#101012_60%)]"
      >
        <svg
          width="100%"
          height="110"
          viewBox="0 0 700 110"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0"
        >
          <defs>
            <pattern id="loc-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0 L0 0 0 28" fill="none" stroke="#3f3f46" strokeWidth="0.6" />
            </pattern>
            <radialGradient id="loc-radar" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="loc-route" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0" />
              <stop offset="50%" stopColor="#e9d5ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0" />
            </linearGradient>
            <filter id="loc-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="loc-grid-drift">
            <rect x="-40" y="0" width="780" height="110" fill="url(#loc-grid)" opacity="0.6" />
          </g>

          <path
            d="M70,20 L115,14 L155,22 L195,17 L235,26 L270,21 L310,30 L350,25
               L385,38 L420,33 L455,42 L485,37 L515,46 L535,60 L522,79 L488,82
               L455,72 L422,77 L388,68 L355,75 L322,66 L288,72 L255,63 L222,70
               L188,61 L155,66 L122,58 L92,62 L72,50 L58,36 Z"
            fill="none"
            stroke="#71717a"
            strokeWidth="1.2"
            opacity="0.85"
          />

          <circle cx="350" cy="50" r="44" fill="none" stroke="#52525b" strokeWidth="0.6" opacity="0.6" />
          <circle cx="350" cy="50" r="30" fill="none" stroke="#52525b" strokeWidth="0.6" opacity="0.6" />

          <path
            d="M350,50 L350,18 A32,32 0 0,1 373,29 Z"
            fill="url(#loc-radar)"
            className="loc-radar-sweep"
            style={{ transformOrigin: '350px 50px' }}
          />

          <g filter="url(#loc-glow)">
            <path className="loc-route" d="M155,30 Q235,10 320,36" fill="none" stroke="url(#loc-route)" strokeWidth="1.8" strokeDasharray="5 5" />
            <path className="loc-route" style={{ animationDelay: '0.3s' }} d="M320,36 Q400,55 480,40" fill="none" stroke="url(#loc-route)" strokeWidth="1.8" strokeDasharray="5 5" />
            <path className="loc-route" style={{ animationDelay: '0.6s' }} d="M480,40 Q450,66 400,71" fill="none" stroke="url(#loc-route)" strokeWidth="1.8" strokeDasharray="5 5" />
            <path className="loc-route" style={{ animationDelay: '0.9s' }} d="M155,30 Q220,56 260,73" fill="none" stroke="url(#loc-route)" strokeWidth="1.6" opacity="0.9" strokeDasharray="5 5" />
          </g>

          <g filter="url(#loc-glow)" style={{ transformOrigin: '155px 30px' }}>
            <circle className="loc-ring" cx="155" cy="30" r="9" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 3" />
            <circle className="loc-pulse" cx="155" cy="30" r="3" fill="#f3e8ff" />
            <circle className="loc-core" cx="155" cy="30" r="3.2" fill="#e9d5ff" />
          </g>

          <g filter="url(#loc-glow)" style={{ transformOrigin: '320px 36px' }}>
            <circle className="loc-ring-rev" cx="320" cy="36" r="11" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.65" strokeDasharray="2 4" />
            <circle className="loc-pulse" style={{ animationDelay: '0.4s' }} cx="320" cy="36" r="4" fill="#f3e8ff" />
            <circle className="loc-core" style={{ animationDelay: '0.2s' }} cx="320" cy="36" r="4.4" fill="#e9d5ff" />
          </g>

          <g filter="url(#loc-glow)" style={{ transformOrigin: '480px 40px' }}>
            <circle className="loc-ring" cx="480" cy="40" r="9" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 3" />
            <circle className="loc-pulse" style={{ animationDelay: '0.8s' }} cx="480" cy="40" r="3" fill="#f3e8ff" />
            <circle className="loc-core" style={{ animationDelay: '0.4s' }} cx="480" cy="40" r="3.2" fill="#e9d5ff" />
          </g>

          <g filter="url(#loc-glow)" style={{ transformOrigin: '400px 71px' }}>
            <circle className="loc-ring-rev" cx="400" cy="71" r="8" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 3" />
            <circle className="loc-pulse" style={{ animationDelay: '1.2s' }} cx="400" cy="71" r="3" fill="#f3e8ff" />
            <circle className="loc-core" style={{ animationDelay: '0.6s' }} cx="400" cy="71" r="3.2" fill="#e9d5ff" />
          </g>

          <g filter="url(#loc-glow)" style={{ transformOrigin: '260px 73px' }}>
            <circle className="loc-ring" cx="260" cy="73" r="7" fill="none" stroke="#e9d5ff" strokeWidth="0.8" opacity="0.55" strokeDasharray="2 3" />
            <circle className="loc-pulse" style={{ animationDelay: '1.6s' }} cx="260" cy="73" r="2.5" fill="#f3e8ff" />
            <circle className="loc-core" style={{ animationDelay: '0.8s' }} cx="260" cy="73" r="2.8" fill="#e9d5ff" />
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#101012]/0 via-transparent to-[#101012]" style={{ backgroundImage: 'linear-gradient(180deg, rgba(16,16,18,0) 30%, #101012 100%)' }} />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, #101012 0%, rgba(16,16,18,0) 16%, rgba(16,16,18,0) 84%, #101012 100%)' }} />

        <div className="relative h-full flex items-end justify-between px-4 py-3">
          <div>
            <div className="loc-label text-sm font-medium text-white">{title}</div>
            <div className="loc-label text-[11px] text-zinc-300" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </div>
          </div>
          <div
            className="loc-label flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              animationDelay: '0.2s',
              background: 'rgba(233,213,255,0.12)',
              border: '1px solid rgba(233,213,255,0.4)',
            }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-purple-100">Live network</span>
          </div>
        </div>
      </div>
    );
  }
);

export function LocationDropdownNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('main');
  // Real, measured space (in px) available for the two scrollable columns.
  // Replaces the old hardcoded vh-based heights that could clip the panel
  // off the bottom of the screen on laptops / shorter viewports.
  const [columnsMaxHeight, setColumnsMaxHeight] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
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

  // Recompute how much vertical space is actually available below the
  // trigger button so the dropdown never gets clipped off the bottom of
  // the viewport on laptops / short screens. The two columns scroll
  // internally (via .scroll-container) to fit whatever room is left.
  useEffect(() => {
    if (!isOpen) return;

    const BOTTOM_MARGIN = 16; // breathing room from the edge of the viewport
    const FOOTER_HEIGHT = 56; // approx height of the bottom summary bar
    const MIN_COLUMNS_HEIGHT = 220; // never shrink below something usable

    const updateHeight = () => {
      if (!dropdownRef.current) return;
      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const bannerHeight = bannerRef.current?.getBoundingClientRect().height ?? 110;
      const spaceBelowTrigger = window.innerHeight - triggerRect.bottom - BOTTOM_MARGIN;
      const availableForColumns = spaceBelowTrigger - bannerHeight - FOOTER_HEIGHT;
      setColumnsMaxHeight(Math.max(MIN_COLUMNS_HEIGHT, availableForColumns));
    };

    // Measure immediately, then again once the panel has actually mounted
    // (banner ref height isn't reliable on the very first paint).
    updateHeight();
    const raf = requestAnimationFrame(updateHeight);

    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', updateHeight, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (pathname?.startsWith('/ai-development/hr')) {
      setActiveItem('hr');
    } else if (pathname?.startsWith('/ai-development/manufacturing')) {
      setActiveItem('manufacturing');
    } else if (pathname?.startsWith('/ai-development/ecommerce')) {
      setActiveItem('ecommerce');
    } else if (pathname?.startsWith('/ai-development/legal')) {
      setActiveItem('legal');
    } else if (pathname?.startsWith('/ai-development/logistics')) {
      setActiveItem('logistics');
    } else if (pathname?.startsWith('/ai-development/edtech')) {
      setActiveItem('edtech');
    } else if (pathname?.startsWith('/ai-development/real-estate')) {
      setActiveItem('real-estate');
    } else if (pathname?.startsWith('/ai-development/retail')) {
      setActiveItem('retail');
    } else if (pathname?.startsWith('/ai-development/legaltech')) {
      setActiveItem('legaltech');
    } else if (pathname?.startsWith('/ai-development/insurance')) {
      setActiveItem('insurance');
    } else if (pathname?.startsWith('/ai-development/proptech')) {
      setActiveItem('proptech');
    } else if (pathname?.startsWith('/ai-development/fintech')) {
      setActiveItem('fintech');
    } else if (pathname?.startsWith('/ai-development/media')) {
      setActiveItem('media');
    } else if (pathname?.startsWith('/ai-chatbot-development')) {
      setActiveItem('chatbot');
    } else if (pathname?.startsWith('/ai-development/healthcare')) {
      setActiveItem('healthcare');
    } else if (pathname?.startsWith('/ai-development-company')) {
      setActiveItem('main');
    }
  }, [pathname]);

  const allLocations = getAllLocationPageData();

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
      'montreal': 'QC',
    };
    return stateMap[slug] || '';
  };

  const usLocations = allLocations.filter(
    ({ slug }) => !['toronto', 'vancouver', 'calgary', 'montreal'].includes(slug)
  );
  const caLocations = allLocations.filter(({ slug }) =>
    ['toronto', 'vancouver', 'calgary', 'montreal'].includes(slug)
  );

  const mainNavItem: LeftNavItem = {
    slug: 'main',
    title: 'AI Development Company',
    icon: Globe2,
    path: '/ai-development-company',
    isMain: true,
  };

  const leftNavItems: LeftNavItem[] = [mainNavItem, ...verticalNavItems];
  const activeVertical = verticalNavItems.find((item) => item.slug === activeItem);
  const totalCities = verticalNavItems.reduce((sum, v) => sum + (v.subPages?.length ?? 0), 0);

  const bannerTitle = activeItem === 'main' ? 'AI Development Company' : activeVertical?.title ?? 'Locations';
  const bannerSubtitle =
    activeItem === 'main'
      ? `${allLocations.length} locations across USA and Canada`
      : `${activeVertical?.subPages?.length ?? 0} city locations across USA and Canada`;

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
        <span>Locations</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-300 ease-out',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="location-dropdown-panel absolute top-full left-0 mt-2 w-[700px] max-w-[90vw] rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden">
          <LocationMapBanner ref={bannerRef} title={bannerTitle} subtitle={bannerSubtitle} />

          {/*
            TWO INDEPENDENTLY SCROLLABLE COLUMNS WITH VISIBLE SCROLLBARS ON THE RIGHT.
            Height is now computed from real available viewport space (columnsMaxHeight)
            instead of a fixed vh guess, so the panel never gets cut off at the bottom
            on laptops / shorter screens — it shrinks and becomes scrollable instead.
          */}
          <div
            className="flex flex-col sm:flex-row min-h-0"
            style={{
              maxHeight: columnsMaxHeight
                ? `${columnsMaxHeight}px`
                : 'min(60vh, 430px)', // fallback before the first measurement runs
            }}
          >
            {/* LEFT SIDE - Main pages with scrollbar on the right */}
            <div className="w-full sm:w-1/3 min-h-0 border-b sm:border-b-0 sm:border-r border-zinc-800 p-4 bg-zinc-900 scroll-container">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-1 sticky top-0 bg-zinc-900 pb-2 z-10">
                Main Pages
              </div>

              <div className="space-y-1.5 pb-2">
                {leftNavItems.map((item) => {
                  const isActive = activeItem === item.slug;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      href={item.path}
                      onMouseEnter={() => setActiveItem(item.slug)}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200',
                        'hover:bg-violet-600/15',
                        'border border-transparent hover:border-violet-500/40',
                        isActive && 'bg-violet-600/15 border-violet-500/40'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200',
                          isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/30' : 'bg-zinc-800'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-4 h-4',
                            isActive ? 'text-white' : 'text-white/70'
                          )}
                        />
                      </div>
                      <div
                        className={cn(
                          'text-sm font-medium transition-colors duration-200 truncate',
                          isActive ? 'text-white' : 'text-white/80'
                        )}
                      >
                        {item.title}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800 sticky bottom-0 bg-zinc-900 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">
                    {allLocations.length + totalCities} pages total
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

            {/* RIGHT SIDE - Subpages with scrollbar on the right */}
            <div className="w-full sm:flex-1 min-h-0 p-4 scroll-container">
              {activeItem === 'main' ? (
                <>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center justify-between sticky top-0 bg-zinc-950 pb-2 z-10">
                    <span>All Locations</span>
                    <span className="text-[10px] text-violet-400 font-semibold">
                      {allLocations.length} locations
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">
                      United States
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {usLocations.map(({ slug, data }, i) => (
                        <Link
                          key={slug}
                          href={`/ai-development-company/${slug}`}
                          onClick={() => setIsOpen(false)}
                          style={{ animationDelay: `${Math.min(i, 12) * 20}ms` }}
                          className={cn(
                            'location-dropdown-item group p-2.5 rounded-lg transition-all duration-200',
                            'hover:bg-violet-600/15 hover:translate-x-0.5',
                            'border border-transparent hover:border-violet-500/30',
                            pathname === `/ai-development-company/${slug}` &&
                              'bg-violet-600/15 border-violet-500/30'
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

                  {caLocations.length > 0 && (
                    <div>
                      <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">
                        Canada
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {caLocations.map(({ slug, data }, i) => (
                          <Link
                            key={slug}
                            href={`/ai-development-company/${slug}`}
                            onClick={() => setIsOpen(false)}
                            style={{
                              animationDelay: `${((usLocations.length + i) % 12) * 20}ms`,
                            }}
                            className={cn(
                              'location-dropdown-item group p-2.5 rounded-lg transition-all duration-200',
                              'hover:bg-violet-600/15 hover:translate-x-0.5',
                              'border border-transparent hover:border-violet-500/30',
                              pathname === `/ai-development-company/${slug}` &&
                                'bg-violet-600/15 border-violet-500/30'
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
                </>
              ) : activeVertical ? (
                <>
                  <div className="flex items-center justify-between mb-3 sticky top-0 bg-zinc-950 pb-2 z-10">
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                      {activeVertical.title} — Locations
                    </div>
                    <span className="text-[10px] text-violet-400 font-semibold">
                      {activeVertical.subPages?.length ?? 0} cities
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {(activeVertical.subPages ?? []).map((sub, i) => (
                      <Link
                        key={sub.slug}
                        href={sub.path}
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${Math.min(i, 12) * 20}ms` }}
                        className={cn(
                          'location-dropdown-item group p-2.5 rounded-lg transition-all duration-200',
                          'hover:bg-violet-600/15 hover:translate-x-0.5',
                          'border border-transparent hover:border-violet-500/30',
                          pathname === sub.path && 'bg-violet-600/15 border-violet-500/30'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 shrink-0 rounded-md bg-zinc-800 group-hover:bg-violet-600/30 flex items-center justify-center transition-colors duration-200">
                            <MapPin className="w-3.5 h-3.5 text-white/70 group-hover:text-violet-300" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className={cn(
                                'text-sm font-medium transition-colors duration-200',
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

                  <div className="mt-3 pt-3 border-t border-zinc-800">
                    <Link
                      href={activeVertical.path}
                      onClick={() => setIsOpen(false)}
                      className="group text-sm font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-all duration-200 hover:gap-2"
                    >
                      View All {activeVertical.title} Locations
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white/30 text-sm">
                  Select a location group to view cities
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-zinc-800 p-3 bg-zinc-900">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <CircleDot className="w-3 h-3 text-emerald-400" />
                  USA & Canada
                </span>
                <span className="text-white/15 hidden sm:inline">|</span>
                <span className="hidden sm:inline">Eastern to Pacific timezones</span>
                <span className="text-white/15 hidden sm:inline">|</span>
                <span className="hidden sm:inline">On-site available</span>
              </div>
              <span className="text-white font-semibold whitespace-nowrap">
                {allLocations.length + totalCities} locations
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes location-dropdown-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes location-item-in {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loc-pin-pulse {
          0% { r: 3; opacity: 1; }
          70% { r: 16; opacity: 0; }
          100% { r: 16; opacity: 0; }
        }
        @keyframes loc-ring-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loc-ring-spin-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes loc-dash-move {
          to { stroke-dashoffset: -30; }
        }
        @keyframes loc-radar-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loc-label-fade {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes loc-grid-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        @keyframes loc-core-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        
        .location-dropdown-panel {
          animation: location-dropdown-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: top left;
        }
        .location-dropdown-item {
          animation: location-item-in 220ms ease-out both;
        }
        .loc-pulse {
          animation: loc-pin-pulse 2.4s ease-out infinite;
        }
        .loc-ring {
          animation: loc-ring-spin 10s linear infinite;
        }
        .loc-ring-rev {
          animation: loc-ring-spin-rev 14s linear infinite;
        }
        .loc-route {
          animation: loc-dash-move 1.1s linear infinite;
        }
        .loc-radar-sweep {
          animation: loc-radar-rotate 4s linear infinite;
        }
        .loc-label {
          animation: loc-label-fade 0.5s ease-out both;
        }
        .loc-grid-drift {
          animation: loc-grid-drift 8s linear infinite;
        }
        .loc-core {
          animation: loc-core-blink 1.6s ease-in-out infinite;
        }

        /* ============================================
           VISIBLE SCROLLBAR STYLING - RIGHT SIDE
           ============================================ */
        .scroll-container {
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
          
          /* Firefox scrollbar styling */
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) rgba(255, 255, 255, 0.05);
        }

        /* WebKit browsers (Chrome, Safari, Edge) */
        .scroll-container::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        /* Track - the background behind the scrollbar */
        .scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin: 4px 0;
        }

        /* Thumb - the draggable scrolling handle */
        .scroll-container::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: background 0.2s ease;
        }

        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }

        .scroll-container::-webkit-scrollbar-thumb:active {
          background: rgba(139, 92, 246, 0.9);
        }

        /* Left column specific scrollbar styling */
        .bg-zinc-900.scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }

        .bg-zinc-900.scroll-container::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.4);
        }

        .bg-zinc-900.scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }

        /* Right column specific scrollbar styling */
        .bg-zinc-950 .scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }

        /* Ensure scrollbars are positioned on the right side (default behavior) */
        .scroll-container {
          direction: ltr;
        }

        @media (prefers-reduced-motion: reduce) {
          .location-dropdown-panel,
          .location-dropdown-item,
          .loc-pulse,
          .loc-ring,
          .loc-ring-rev,
          .loc-route,
          .loc-radar-sweep,
          .loc-label,
          .loc-grid-drift,
          .loc-core {
            animation: none;
          }
          .scroll-container {
            scroll-behavior: auto;
          }
        }

        /* Mobile optimizations - ensure scrollbars are visible on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .scroll-container::-webkit-scrollbar {
            width: 4px;
          }
          
          .scroll-container::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.6);
          }
        }

        /* Small screen adjustments */
        @media (max-width: 640px) {
          .location-dropdown-panel {
            max-width: 100vw;
            width: 100%;
            border-radius: 0.75rem;
          }
          
          /* Make scrollbars more prominent on small screens */
          .scroll-container::-webkit-scrollbar {
            width: 5px;
          }
          
          .scroll-container::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.6);
          }
        }
      `}</style>
    </div>
  );
}