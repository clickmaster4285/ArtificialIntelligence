// data/service-navigation.ts

export interface ServiceNavItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  category: string;
  hasSubPages?: boolean;
  subPages?: { slug: string; title: string; icon: string; path: string }[];
  featured?: boolean;
}

export interface ServiceCategory {
  title: string;
  items: ServiceNavItem[];
}

// Healthcare city sub-pages
const healthcareSubPages = [
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

// Chatbot city sub-pages
const chatbotSubPages = [
  { slug: 'ai-chatbot-development-new-york', title: 'New York', icon: '🗽', path: '/ai-chatbot-development/new-york' },
  { slug: 'ai-chatbot-development-toronto', title: 'Toronto', icon: '🍁', path: '/ai-chatbot-development/toronto' },
  { slug: 'ai-chatbot-development-san-francisco', title: 'San Francisco', icon: '🌉', path: '/ai-chatbot-development/san-francisco' },
  { slug: 'ai-chatbot-development-dallas', title: 'Dallas', icon: '⭐', path: '/ai-chatbot-development/dallas' },
  { slug: 'ai-chatbot-development-boston', title: 'Boston', icon: '🏛️', path: '/ai-chatbot-development/boston' },
  { slug: 'ai-chatbot-development-miami', title: 'Miami', icon: '🌴', path: '/ai-chatbot-development/miami' },
  { slug: 'ai-chatbot-development-austin', title: 'Austin', icon: '🤠', path: '/ai-chatbot-development/austin' },
  { slug: 'ai-chatbot-development-vancouver', title: 'Vancouver', icon: '🌊', path: '/ai-chatbot-development/vancouver' },
  { slug: 'ai-chatbot-development-montreal', title: 'Montreal', icon: '⚜️', path: '/ai-chatbot-development/montreal' },
  { slug: 'ai-chatbot-development-chicago', title: 'Chicago', icon: '🌆', path: '/ai-chatbot-development/chicago' },
  { slug: 'ai-chatbot-development-houston', title: 'Houston', icon: '🚀', path: '/ai-chatbot-development/houston' },
  { slug: 'ai-chatbot-development-washington-dc', title: 'Washington DC', icon: '🏛️', path: '/ai-chatbot-development/washington-dc' },
  { slug: 'ai-chatbot-development-philadelphia', title: 'Philadelphia', icon: '🔔', path: '/ai-chatbot-development/philadelphia' },
  { slug: 'ai-chatbot-development-atlanta', title: 'Atlanta', icon: '🍑', path: '/ai-chatbot-development/atlanta' },
  { slug: 'ai-chatbot-development-denver', title: 'Denver', icon: '🏔️', path: '/ai-chatbot-development/denver' },
  { slug: 'ai-chatbot-development-los-angeles', title: 'Los Angeles', icon: '🎬', path: '/ai-chatbot-development/los-angeles' },
  { slug: 'ai-chatbot-development-charlotte', title: 'Charlotte', icon: '🏦', path: '/ai-chatbot-development/charlotte' },
  { slug: 'ai-chatbot-development-orlando', title: 'Orlando', icon: '🎢', path: '/ai-chatbot-development/orlando' },
  { slug: 'ai-chatbot-development-columbus', title: 'Columbus', icon: '🏙️', path: '/ai-chatbot-development/columbus' },
  { slug: 'ai-chatbot-development-seattle', title: 'Seattle', icon: '☕', path: '/ai-chatbot-development/seattle' },
  { slug: 'ai-chatbot-development-san-jose', title: 'San Jose', icon: '💻', path: '/ai-chatbot-development/san-jose' },
  { slug: 'ai-chatbot-development-calgary', title: 'Calgary', icon: '⛰️', path: '/ai-chatbot-development/calgary' },
  { slug: 'ai-chatbot-development-phoenix', title: 'Phoenix', icon: '🌵', path: '/ai-chatbot-development/phoenix' },
];

export const serviceNavigationItems: ServiceNavItem[] = [
  // ============================================
  // FEATURED - Healthcare at the TOP
  // ============================================
  {
    slug: 'healthcare',
    title: 'Healthcare AI',
    description: 'Clinical decision support, EHR AI, medical imaging',
    icon: '🏥',
    path: '/ai-development/healthcare',
    category: 'Featured',
    featured: true,
    hasSubPages: true,
    subPages: healthcareSubPages
  },

  // ============================================
  // AI Chatbot Development
  // ============================================
  {
    slug: 'chatbot',
    title: 'AI Chatbot Development',
    description: 'RAG-grounded chatbots for support, sales & internal use',
    icon: '💬',
    path: '/ai-chatbot-development-company',
    category: 'Featured',
    featured: true,
    hasSubPages: true,
    subPages: chatbotSubPages
  },

  // Financial Services
  {
    slug: 'fintech',
    title: 'FinTech AI',
    description: 'Fraud detection, credit scoring, AML compliance',
    icon: '💰',
    path: '/ai-development/fintech',
    category: 'Financial Services'
  },
  {
    slug: 'insurance',
    title: 'Insurance AI',
    description: 'Claims automation, fraud detection, underwriting AI',
    icon: '🛡️',
    path: '/ai-development/insurance',
    category: 'Financial Services'
  },

  // Business Operations
  {
    slug: 'legal',
    title: 'Legal AI',
    description: 'Contract review, legal research, due diligence',
    icon: '⚖️',
    path: '/ai-development/legal',
    category: 'Business Operations'
  },
  {
    slug: 'hr-technology',
    title: 'HR Technology AI',
    description: 'Candidate screening, attrition prediction, HR chatbots',
    icon: '👥',
    path: '/ai-development/hr-technology',
    category: 'Business Operations'
  },
  {
    slug: 'customer-service',
    title: 'Customer Service AI',
    description: 'AI chatbots, agent assist, ticket routing',
    icon: '💬',
    path: '/ai-development/customer-service',
    category: 'Business Operations'
  },

  // Commerce & Retail
  {
    slug: 'ecommerce',
    title: 'eCommerce AI',
    description: 'Recommendation engines, visual search, demand forecasting',
    icon: '🛒',
    path: '/ai-development/ecommerce',
    category: 'Commerce & Retail'
  },
  {
    slug: 'retail',
    title: 'Retail AI',
    description: 'Demand forecasting, personalization, inventory optimization',
    icon: '🏪',
    path: '/ai-development/retail',
    category: 'Commerce & Retail'
  },

  // Supply Chain & Logistics
  {
    slug: 'logistics',
    title: 'Logistics AI',
    description: 'Route optimization, demand forecasting, warehouse AI',
    icon: '🚚',
    path: '/ai-development/logistics',
    category: 'Supply Chain & Logistics'
  },
  {
    slug: 'supply-chain',
    title: 'Supply Chain AI',
    description: 'Demand sensing, supplier risk, inventory optimization',
    icon: '📦',
    path: '/ai-development/supply-chain',
    category: 'Supply Chain & Logistics'
  },

  // Industry Specific
  {
    slug: 'real-estate',
    title: 'Real Estate AI',
    description: 'Property valuation, lead scoring, document AI',
    icon: '🏠',
    path: '/ai-development/real-estate',
    category: 'Industry Specific'
  },
  {
    slug: 'construction',
    title: 'Construction AI',
    description: 'Safety monitoring, progress tracking, cost estimation',
    icon: '🏗️',
    path: '/ai-development/construction',
    category: 'Industry Specific'
  },
  {
    slug: 'energy',
    title: 'Energy AI',
    description: 'Grid optimization, renewable forecasting, energy trading',
    icon: '⚡',
    path: '/ai-development/energy',
    category: 'Industry Specific'
  },
  {
    slug: 'agriculture',
    title: 'Agriculture AI',
    description: 'Crop yield prediction, precision agriculture, livestock AI',
    icon: '🌾',
    path: '/ai-development/agriculture',
    category: 'Industry Specific'
  },
  {
    slug: 'telecommunications',
    title: 'Telecommunications AI',
    description: 'Network optimization, 5G AI, churn prediction',
    icon: '📡',
    path: '/ai-development/telecommunications',
    category: 'Industry Specific'
  },

  // Media & Technology
  {
    slug: 'media-content',
    title: 'Media & Content AI',
    description: 'Content recommendation, personalization, ad targeting',
    icon: '🎬',
    path: '/ai-development/media-content',
    category: 'Media & Technology'
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity AI',
    description: 'Threat detection, SIEM AI, security copilots',
    icon: '🔒',
    path: '/ai-development/cybersecurity',
    category: 'Media & Technology'
  },

  // Public Sector
  {
    slug: 'government',
    title: 'Government AI',
    description: 'Federal AI, state government AI, fraud detection',
    icon: '🏛️',
    path: '/ai-development/government',
    category: 'Public Sector'
  },

  // Education
  {
    slug: 'education',
    title: 'Education AI',
    description: 'Personalized learning, adaptive assessments, AI tutors',
    icon: '📚',
    path: '/ai-development/education',
    category: 'Education'
  },
];

// ============================================
// CATEGORIES
// ============================================

export const serviceCategories: ServiceCategory[] = [
  {
    title: 'Featured',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Featured')
  },
  {
    title: 'Financial Services',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Financial Services')
  },
  {
    title: 'Business Operations',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Business Operations')
  },
  {
    title: 'Commerce & Retail',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Commerce & Retail')
  },
  {
    title: 'Supply Chain & Logistics',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Supply Chain & Logistics')
  },
  {
    title: 'Industry Specific',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Industry Specific')
  },
  {
    title: 'Media & Technology',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Media & Technology')
  },
  {
    title: 'Public Sector',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Public Sector')
  },
  {
    title: 'Education',
    items: serviceNavigationItems.filter((item: ServiceNavItem) => item.category === 'Education')
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getAllServiceSlugs(): string[] {
  return serviceNavigationItems.map((item: ServiceNavItem) => item.slug);
}

export function getServiceBySlug(slug: string): ServiceNavItem | undefined {
  return serviceNavigationItems.find((item: ServiceNavItem) => item.slug === slug);
}

export function getServicesByCategory(category: string): ServiceNavItem[] {
  return serviceNavigationItems.filter((item: ServiceNavItem) => item.category === category);
}

export function getHealthcareSubPages() {
  return healthcareSubPages;
}

export function getChatbotSubPages() {
  return chatbotSubPages;
}