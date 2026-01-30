'use client';

import { ReactNode } from 'react';
import { LayoutGroup } from 'framer-motion';
import { ExpandableProvider } from '@/contexts/expandable-context';
import { ExpandedModals } from './expanded-modals';
import { SoundProvider } from './sound-provider';

interface BentoGridWrapperProps {
  children: ReactNode;
}

export function BentoGridWrapper({ children }: BentoGridWrapperProps) {
  return (
    <SoundProvider>
      <ExpandableProvider>
        <LayoutGroup>
          {children}
          <ExpandedModals />
        </LayoutGroup>
      </ExpandableProvider>
    </SoundProvider>
  );
}
