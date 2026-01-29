'use client';

import { ReactNode } from 'react';
import { LayoutGroup } from 'framer-motion';
import { ProjectsProvider } from '@/contexts/projects-context';
import { ExpandedProjectsModal } from './expanded-projects-modal';

interface BentoGridWrapperProps {
  children: ReactNode;
}

export function BentoGridWrapper({ children }: BentoGridWrapperProps) {
  return (
    <ProjectsProvider>
      <LayoutGroup>
        {children}
        <ExpandedProjectsModal />
      </LayoutGroup>
    </ProjectsProvider>
  );
}
