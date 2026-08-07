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
// SERVICE SUBPAGES DATA
// ============================================

type ServiceSubPage = {
  slug: string;
  title: string;
  icon: string;
  path: string;
  description?: string;
};

// AI Development subpages (all services except healthcare, chatbot, media, fintech, proptech, insurance, legaltech, retail, real-estate, edtech, logistics, legal, ecommerce, manufacturing, hr)
const aiDevelopmentSubPages: ServiceSubPage[] = serviceNavigationItems
  .filter(item => item.slug !== 'healthcare' && item.slug !== 'chatbot' && item.slug !== 'media' && item.slug !== 'fintech' && item.slug !== 'proptech' && item.slug !== 'insurance' && item.slug !== 'legaltech' && item.slug !== 'retail' && item.slug !== 'real-estate' && item.slug !== 'edtech' && item.slug !== 'logistics' && item.slug !== 'legal' && item.slug !== 'ecommerce' && item.slug !== 'manufacturing' && item.slug !== 'hr')
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
  const citySlug = slug.replace('ai-chatbot-development-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getCityIcon(slug),
    path: `/ai-chatbot-development/${citySlug}`,
  };
});

// Media AI city subpages
const mediaSlugs = getAllMediaAICityPageSlugs().filter(slug => slug !== 'media-content');
const mediaSubPages: ServiceSubPage[] = mediaSlugs.map((slug) => {
  const citySlug = slug.replace('media-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getMediaCityIcon(slug),
    path: `/ai-development/media/${citySlug}`,
  };
});

// FinTech AI city subpages
const fintechSlugs = getAllFinTechAICityPageSlugs().filter(slug => slug !== 'fintech');
const fintechSubPages: ServiceSubPage[] = fintechSlugs.map((slug) => {
  const citySlug = slug.replace('fintech-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getFinTechCityIcon(slug),
    path: `/ai-development/fintech/${citySlug}`,
  };
});

// PropTech AI city subpages
const proptechSlugs = getAllPropTechAICityPageSlugs().filter(slug => slug !== 'proptech');
const proptechSubPages: ServiceSubPage[] = proptechSlugs.map((slug) => {
  const citySlug = slug.replace('proptech-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getPropTechCityIcon(slug),
    path: `/ai-development/proptech/${citySlug}`,
  };
});

// Insurance AI city subpages
const insuranceSlugs = getAllInsuranceAICityPageSlugs().filter(slug => slug !== 'insurance');
const insuranceSubPages: ServiceSubPage[] = insuranceSlugs.map((slug) => {
  const citySlug = slug.replace('insurance-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getInsuranceCityIcon(slug),
    path: `/ai-development/insurance/${citySlug}`,
  };
});

// LegalTech AI city subpages
const legaltechSlugs = getAllLegalTechAICityPageSlugs();
const legaltechSubPages: ServiceSubPage[] = legaltechSlugs.map((slug) => {
  const citySlug = slug.replace('legaltech-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getLegalTechCityIcon(slug),
    path: `/ai-development/legaltech/${citySlug}`,
  };
});

// Retail AI city subpages
const retailSlugs = getAllRetailAICityPageSlugs().filter(slug => slug !== 'retail');
const retailSubPages: ServiceSubPage[] = retailSlugs.map((slug) => {
  const citySlug = slug.replace('retail-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getRetailCityIcon(slug),
    path: `/ai-development/retail/${citySlug}`,
  };
});

// Real Estate AI city subpages
const realEstateSlugs = getAllRealEstateAICityPageSlugs().filter(slug => slug !== 'real-estate');
const realEstateSubPages: ServiceSubPage[] = realEstateSlugs.map((slug) => {
  const citySlug = slug.replace('real-estate-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getRealEstateCityIcon(slug),
    path: `/ai-development/real-estate/${citySlug}`,
  };
});

// EdTech AI city subpages
const edtechSlugs = getAllEdTechAICityPageSlugs();
const edtechSubPages: ServiceSubPage[] = edtechSlugs.map((slug) => {
  const citySlug = slug.replace('edtech-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getEdTechCityIcon(slug),
    path: `/ai-development/edtech/${citySlug}`,
  };
});

// Logistics AI city subpages
const logisticsSlugs = getAllLogisticsAICityPageSlugs().filter(slug => slug !== 'logistics');
const logisticsSubPages: ServiceSubPage[] = logisticsSlugs.map((slug) => {
  const citySlug = slug.replace('logistics-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getLogisticsCityIcon(slug),
    path: `/ai-development/logistics/${citySlug}`,
  };
});

// Legal AI city subpages
const legalSlugs = getAllLegalAICityPageSlugs().filter(slug => slug !== 'legal');
const legalSubPages: ServiceSubPage[] = legalSlugs.map((slug) => {
  const citySlug = slug.replace('legal-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getLegalCityIcon(slug),
    path: `/ai-development/legal/${citySlug}`,
  };
});

// Ecommerce AI city subpages
const ecommerceSlugs = getAllEcommerceAICityPageSlugs().filter(slug => slug !== 'ecommerce');
const ecommerceSubPages: ServiceSubPage[] = ecommerceSlugs.map((slug) => {
  const citySlug = slug.replace('ecommerce-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getEcommerceCityIcon(slug),
    path: `/ai-development/ecommerce/${citySlug}`,
  };
});

// Manufacturing AI city subpages
const manufacturingSlugs = getAllManufacturingAICityPageSlugs().filter(slug => slug !== 'manufacturing');
const manufacturingSubPages: ServiceSubPage[] = manufacturingSlugs.map((slug) => {
  const citySlug = slug.replace('manufacturing-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getManufacturingCityIcon(slug),
    path: `/ai-development/manufacturing/${citySlug}`,
  };
});

// HR AI city subpages
const hrSlugs = getAllHRAICityPageSlugs().filter(slug => slug !== 'hr-technology');
const hrSubPages: ServiceSubPage[] = hrSlugs.map((slug) => {
  const citySlug = slug.replace('hr-', '');
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    slug: slug,
    title: cityName,
    icon: getHRCityIcon(slug),
    path: `/ai-development/hr/${citySlug}`,
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

function getMediaCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'media-los-angeles': '🎬',
    'media-new-york': '🗽',
    'media-dallas': '⭐',
    'media-calgary': '⛰️',
    'media-atlanta': '🍑',
    'media-chicago': '🌆',
    'media-seattle': '☕',
    'media-houston': '🚀',
    'media-denver': '🏔️',
    'media-charlotte': '🏦',
    'media-austin': '🤠',
    'media-phoenix': '🌵',
    'media-miami': '🌴',
    'media-washington-dc': '🏛️',
    'media-columbus': '🏙️',
    'media-orlando': '🎢',
    'media-vancouver': '🌊',
    'media-montreal': '⚜️',
    'media-san-francisco': '🌉',
    'media-toronto': '🍁',
    'media-boston': '🏛️',
  };
  return icons[slug] || '📺';
}

function getFinTechCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'fintech-toronto': '🍁',
    'fintech-miami': '🌴',
    'fintech-los-angeles': '🎬',
    'fintech-seattle': '☕',
    'fintech-denver': '🏔️',
    'fintech-phoenix': '🌵',
    'fintech-houston': '🚀',
    'fintech-montreal': '⚜️',
    'fintech-washington-dc': '🏛️',
    'fintech-atlanta': '🍑',
    'fintech-calgary': '⛰️',
    'fintech-austin': '🤠',
    'fintech-new-york': '🗽',
    'fintech-chicago': '🌆',
    'fintech-boston': '🏛️',
    'fintech-vancouver': '🌊',
    'fintech-san-francisco': '🌉',
    'fintech-dallas': '⭐',
    'fintech-charlotte': '🏦',
  };
  return icons[slug] || '💰';
}

function getPropTechCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'proptech-houston': '🚀',
    'proptech-chicago': '🌆',
    'proptech-seattle': '☕',
    'proptech-boston': '🏛️',
    'proptech-atlanta': '🍑',
    'proptech-dallas': '⭐',
    'proptech-washington-dc': '🏛️',
    'proptech-phoenix': '🌵',
    'proptech-charlotte': '🏦',
    'proptech-columbus': '🏙️',
    'proptech-orlando': '🎢',
    'proptech-san-francisco': '🌉',
    'proptech-miami': '🌴',
    'proptech-austin': '🤠',
    'proptech-new-york': '🗽',
    'proptech-los-angeles': '🎬',
    'proptech-toronto': '🍁',
    'proptech-vancouver': '🌊',
    'proptech-montreal': '⚜️',
    'proptech-calgary': '⛰️',
  };
  return icons[slug] || '🏠';
}

function getInsuranceCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'insurance-atlanta': '🍑',
    'insurance-austin': '🤠',
    'insurance-boston': '🏛️',
    'insurance-calgary': '⛰️',
    'insurance-charlotte': '🏦',
    'insurance-chicago': '🌆',
    'insurance-dallas': '⭐',
    'insurance-denver': '🏔️',
    'insurance-houston': '🚀',
    'insurance-los-angeles': '🎬',
    'insurance-miami': '🌴',
    'insurance-montreal': '⚜️',
    'insurance-new-york': '🗽',
    'insurance-phoenix': '🌵',
    'insurance-san-francisco': '🌉',
    'insurance-seattle': '☕',
    'insurance-toronto': '🍁',
    'insurance-vancouver': '🌊',
    'insurance-washington-dc': '🏛️',
  };
  return icons[slug] || '🛡️';
}

function getLegalTechCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'legaltech-new-york': '🗽',
    'legaltech-austin': '🤠',
  };
  return icons[slug] || '⚖️';
}

function getRetailCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'retail-dallas': '⭐',
  };
  return icons[slug] || '🛍️';
}

function getRealEstateCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'real-estate-austin': '🤠',
  };
  return icons[slug] || '🏡';
}

function getEdTechCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'edtech-boston': '🏛️',
    'edtech-new-york': '🗽',
    'edtech-austin': '🤠',
    'edtech-chicago': '🌆',
    'edtech-los-angeles': '🎬',
    'edtech-dallas': '⭐',
    'edtech-houston': '🚀',
    'edtech-atlanta': '🍑',
    'edtech-phoenix': '🌵',
    'edtech-charlotte': '🏦',
    'edtech-columbus': '🏙️',
    'edtech-orlando': '🎢',
    'edtech-toronto': '🍁',
    'edtech-vancouver': '🌊',
    'edtech-montreal': '⚜️',
    'edtech-calgary': '⛰️',
    'edtech-seattle': '☕',
    'edtech-denver': '🏔️',
    'edtech-miami': '🌴',
    'edtech-washington-dc': '🏛️',
  };
  return icons[slug] || '🎓';
}

function getLogisticsCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'logistics-atlanta': '🍑',
    'logistics-austin': '🤠',
    'logistics-boston': '🏛️',
    'logistics-calgary': '⛰️',
    'logistics-chicago': '🌆',
    'logistics-dallas': '⭐',
    'logistics-denver': '🏔️',
    'logistics-houston': '🚀',
    'logistics-los-angeles': '🎬',
    'logistics-miami': '🌴',
    'logistics-montreal': '⚜️',
    'logistics-new-york': '🗽',
    'logistics-phoenix': '🌵',
    'logistics-san-francisco': '🌉',
    'logistics-seattle': '☕',
    'logistics-toronto': '🍁',
    'logistics-vancouver': '🌊',
    'logistics-washington-dc': '🏛️',
  };
  return icons[slug] || '🚚';
}

function getLegalCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'legal-atlanta': '🍑',
    'legal-austin': '🤠',
    'legal-boston': '🏛️',
    'legal-calgary': '⛰️',
    'legal-charlotte': '🏦',
    'legal-columbus': '🏙️',
    'legal-dallas': '⭐',
    'legal-denver': '🏔️',
    'legal-houston': '🚀',
    'legal-los-angeles': '🎬',
    'legal-miami': '🌴',
    'legal-montreal': '⚜️',
    'legal-new-york': '🗽',
    'legal-phoenix': '🌵',
    'legal-san-francisco': '🌉',
    'legal-seattle': '☕',
    'legal-toronto': '🍁',
    'legal-vancouver': '🌊',
    'legal-washington-dc': '🏛️',
  };
  return icons[slug] || '⚖️';
}

function getEcommerceCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'ecommerce-atlanta': '🍑',
    'ecommerce-austin': '🤠',
    'ecommerce-boston': '🏛️',
    'ecommerce-calgary': '⛰️',
    'ecommerce-chicago': '🌆',
    'ecommerce-dallas': '⭐',
    'ecommerce-denver': '🏔️',
    'ecommerce-houston': '🚀',
    'ecommerce-los-angeles': '🎬',
    'ecommerce-miami': '🌴',
    'ecommerce-montreal': '⚜️',
    'ecommerce-new-york': '🗽',
    'ecommerce-phoenix': '🌵',
    'ecommerce-san-francisco': '🌉',
    'ecommerce-seattle': '☕',
    'ecommerce-toronto': '🍁',
    'ecommerce-vancouver': '🌊',
    'ecommerce-washington-dc': '🏛️',
  };
  return icons[slug] || '🛒';
}

function getManufacturingCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'manufacturing-atlanta': '🍑',
    'manufacturing-austin': '🤠',
    'manufacturing-boston': '🏛️',
    'manufacturing-calgary': '⛰️',
    'manufacturing-charlotte': '🏦',
    'manufacturing-chicago': '🌆',
    'manufacturing-cincinnati': '🏙️',
    'manufacturing-dallas': '⭐',
    'manufacturing-denver': '🏔️',
    'manufacturing-detroit': '🚗',
    'manufacturing-houston': '🚀',
    'manufacturing-los-angeles': '🎬',
    'manufacturing-miami': '🌴',
    'manufacturing-montreal': '⚜️',
    'manufacturing-new-york': '🗽',
    'manufacturing-phoenix': '🌵',
    'manufacturing-san-francisco': '🌉',
    'manufacturing-seattle': '☕',
    'manufacturing-toronto': '🍁',
    'manufacturing-vancouver': '🌊',
    'manufacturing-washington-dc': '🏛️',
  };
  return icons[slug] || '🏭';
}

function getHRCityIcon(slug: string): string {
  const icons: Record<string, string> = {
    'hr-atlanta': '🍑',
    'hr-boston': '🏛️',
    'hr-calgary': '⛰️',
    'hr-charlotte': '🏦',
    'hr-chicago': '🌆',
    'hr-columbus': '🏙️',
    'hr-dallas': '⭐',
    'hr-denver': '🏔️',
    'hr-houston': '🚀',
    'hr-los-angeles': '🎬',
    'hr-miami': '🌴',
    'hr-montreal': '⚜️',
    'hr-new-york': '🗽',
    'hr-phoenix': '🌵',
    'hr-san-francisco': '🌉',
    'hr-seattle': '☕',
    'hr-toronto': '🍁',
    'hr-vancouver': '🌊',
    'hr-washington-dc': '🏛️',
  };
  return icons[slug] || '👔';
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
  {
    slug: 'media',
    title: 'Media & Content AI',
    description: 'Content recommendation, personalization, ad targeting',
    icon: '📺',
    path: '/ai-development/media-content',
    subPages: mediaSubPages,
    isMain: false,
    badge: `${mediaSubPages.length} cities`,
  },
  {
    slug: 'fintech',
    title: 'FinTech AI',
    description: 'Fraud detection, credit scoring, AML compliance',
    icon: '💰',
    path: '/ai-development/fintech',
    subPages: fintechSubPages,
    isMain: false,
    badge: `${fintechSubPages.length} cities`,
  },
  {
    slug: 'proptech',
    title: 'PropTech AI',
    description: 'Property valuation, market analytics, buyer matching',
    icon: '🏠',
    path: '/ai-development/proptech',
    subPages: proptechSubPages,
    isMain: false,
    badge: `${proptechSubPages.length} cities`,
  },
  {
    slug: 'insurance',
    title: 'Insurance AI',
    description: 'Claims automation, fraud detection, underwriting AI',
    icon: '🛡️',
    path: '/ai-development/insurance',
    subPages: insuranceSubPages,
    isMain: false,
    badge: `${insuranceSubPages.length} cities`,
  },
  {
    slug: 'legaltech',
    title: 'LegalTech AI',
    description: 'Contract analysis, e-discovery, legal research',
    icon: '⚖️',
    path: '/ai-development/legaltech',
    subPages: legaltechSubPages,
    isMain: false,
    badge: `${legaltechSubPages.length} cities`,
  },
  {
    slug: 'retail',
    title: 'Retail AI',
    description: 'Demand forecasting, personalization, inventory optimization',
    icon: '🛍️',
    path: '/ai-development/retail',
    subPages: retailSubPages,
    isMain: false,
    badge: `${retailSubPages.length} cities`,
  },
  {
    slug: 'real-estate',
    title: 'Real Estate AI',
    description: 'Property valuation, lead scoring, PropTech solutions',
    icon: '🏡',
    path: '/ai-development/real-estate',
    subPages: realEstateSubPages,
    isMain: false,
    badge: `${realEstateSubPages.length} cities`,
  },
  {
    slug: 'edtech',
    title: 'EdTech AI',
    description: 'Adaptive learning, student support, assessment AI',
    icon: '🎓',
    path: '/ai-development/edtech',
    subPages: edtechSubPages,
    isMain: false,
    badge: `${edtechSubPages.length} cities`,
  },
  {
    slug: 'logistics',
    title: 'Logistics AI',
    description: 'Route optimization, demand forecasting, warehouse AI',
    icon: '🚚',
    path: '/ai-development/logistics',
    subPages: logisticsSubPages,
    isMain: false,
    badge: `${logisticsSubPages.length} cities`,
  },
  {
    slug: 'legal',
    title: 'Legal AI',
    description: 'Contract analysis, legal research, e-discovery',
    icon: '⚖️',
    path: '/ai-development/legal',
    subPages: legalSubPages,
    isMain: false,
    badge: `${legalSubPages.length} cities`,
  },
  {
    slug: 'ecommerce',
    title: 'Ecommerce AI',
    description: 'Recommendation engines, personalization, demand forecasting',
    icon: '🛒',
    path: '/ai-development/ecommerce',
    subPages: ecommerceSubPages,
    isMain: false,
    badge: `${ecommerceSubPages.length} cities`,
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing AI',
    description: 'Defect detection, predictive maintenance, process optimization',
    icon: '🏭',
    path: '/ai-development/manufacturing',
    subPages: manufacturingSubPages,
    isMain: false,
    badge: `${manufacturingSubPages.length} cities`,
  },
  {
    slug: 'hr',
    title: 'HR AI',
    description: 'Candidate screening, attrition prediction, workforce analytics',
    icon: '👔',
    path: '/ai-development/hr',
    subPages: hrSubPages,
    isMain: false,
    badge: `${hrSubPages.length} cities`,
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
        <div className="service-dropdown-panel absolute top-full left-0 mt-2 w-[760px] max-w-[95vw] rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="flex h-[500px]">
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
                      "group relative px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
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