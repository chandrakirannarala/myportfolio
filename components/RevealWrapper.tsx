'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export function RevealWrapper({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  return <>{children}</>;
}
