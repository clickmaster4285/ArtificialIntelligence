// components/layout/Container.tsx
import React, { ReactNode } from 'react';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: MaxWidth;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  maxWidth = '7xl' 
}) => {
  const maxWidthClasses: Record<MaxWidth, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};