'use client';

import { ReactNode } from 'react';
import { LayoutGroup } from 'framer-motion';
import { ExpandableProvider } from '@/contexts/expandable-context';
import { ExpandedModals } from './expanded-modals';

interface BentoGridWrapperProps {
  children: ReactNode;
}

export function BentoGridWrapper({ children }: BentoGridWrapperProps) {
  return (
    <ExpandableProvider>
      <LayoutGroup>
        {children}
        <ExpandedModals />
      </LayoutGroup>
    </ExpandableProvider>
  );
}
