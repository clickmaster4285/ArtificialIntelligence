// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string): string {
  // Remove any non-numeric characters except for dash and plus
  const cleaned = price.replace(/[^0-9\-+]/g, '');
  return cleaned;
}

export function getServiceTypeFromSlug(slug: string): string {
  const serviceMap: Record<string, string> = {
    'fintech': 'FinTech AI',
    'healthcare': 'Healthcare AI',
    'ecommerce': 'eCommerce AI',
    'legal': 'Legal AI',
    'insurance': 'Insurance AI',
    'logistics': 'Logistics AI',
    'hr-technology': 'HR Technology AI',
    'real-estate': 'Real Estate AI',
    'retail': 'Retail AI',
    'education': 'Education AI',
    'media-content': 'Media & Content AI',
    'customer-service': 'Customer Service AI',
    'cybersecurity': 'Cybersecurity AI',
    'agriculture': 'Agriculture AI',
    'supply-chain': 'Supply Chain AI',
    'energy': 'Energy AI',
    'telecommunications': 'Telecommunications AI',
    'government': 'Government AI',
    'construction': 'Construction AI'
  };
  return serviceMap[slug] || 'AI Development';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}