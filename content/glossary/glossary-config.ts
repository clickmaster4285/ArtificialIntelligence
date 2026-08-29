import type {
  GlossaryLandingConfig,
} from "@/types/glossary";

/* =========================================================
   GLOSSARY LANDING PAGE CONFIGURATION
========================================================= */

export const glossaryLandingConfig: GlossaryLandingConfig = {
  seo: {
    title:
      "AI Glossary | Artificial Intelligence Terms Explained",
    description:
      "Explore clear, practical definitions of artificial intelligence, machine learning, large language models, RAG, MLOps and generative AI terminology.",
    canonical: "/glossary/",
    keywords: [
      "AI glossary",
      "artificial intelligence glossary",
      "machine learning terms",
      "generative AI terms",
      "large language model glossary",
      "RAG glossary",
      "MLOps glossary",
      "AI terminology",
    ],
  },

  hero: {
    eyebrow: "The Intelligence Index",

    title: "Decode the language of",

    highlightedText: "artificial intelligence",

    description:
      "A living library of essential AI concepts, systems and technologies—explained clearly for technical teams, business leaders and curious minds.",

    searchPlaceholder:
      "Search terms, technologies or concepts...",

    popularSearches: [
      "RAG",
      "Large Language Model",
      "Vector Database",
      "AI Agent",
      "Embeddings",
    ],
  },

  featuredTitle: "Essential concepts",

  allTermsTitle: "Explore the complete glossary",

  /**
   * Number of glossary cards displayed on each page.
   *
   * Pagination examples:
   * /glossary
   * /glossary?page=2
   * /glossary?page=3
   */
  termsPerPage: 12,
};