// src/components/services/ServiceLayout.tsx

import { ReactNode } from 'react';

interface ServiceLayoutProps {
  children: ReactNode;
}

export function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-violet-500/40">
      {children}
    </main>
  );
}