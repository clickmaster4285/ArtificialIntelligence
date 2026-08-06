// components/layout/PageLayout.tsx
import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  withGrain?: boolean;
}

// Note: PageLayout no longer wraps children in <Container>. Each section
// (Hero, Overview, Pricing, etc.) is a full-width <section> that manages its
// own centered, padded content internally (max-w-7xl mx-auto px-[14px]).
// Wrapping them again here would clip their full-bleed backgrounds into a
// centered column, producing hard vertical edges on either side.
//
// If you need to render plain (non-section) content on a page — e.g. a
// simple text page with no full-bleed background — wrap that content in
// <Container> yourself where you use it, rather than relying on PageLayout.
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  withGrain = true,
}) => {
  return (
    <div className={`relative min-h-screen bg-background ${className}`}>
      {withGrain && <div className="grain grain-after" />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};