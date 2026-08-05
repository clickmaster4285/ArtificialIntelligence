// components/layout/PageLayout.tsx
import React, { ReactNode } from 'react';
import { Container } from './Container';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  withGrain?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '',
  withGrain = true,
  maxWidth = '7xl'
}) => {
  return (
    <div className={`relative min-h-screen bg-background ${className}`}>
      {withGrain && <div className="grain grain-after" />}
      <div className="relative z-10">
        <Container maxWidth={maxWidth}>
          {children}
        </Container>
      </div>
    </div>
  );
};