'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useUISounds } from '@/components/sound-provider';

type ExpandableSection = 'about' | 'experience' | 'education' | 'projects' | null;

interface ExpandableContextType {
  expandedSection: ExpandableSection;
  expandSection: (section: ExpandableSection) => void;
  collapseSection: () => void;
  isExpanded: (section: ExpandableSection) => boolean;
  selectedProjectIndex: number | null;
  setSelectedProjectIndex: (index: number | null) => void;
}

const ExpandableContext = createContext<ExpandableContextType | undefined>(undefined);

export function ExpandableProvider({ children }: { children: ReactNode }) {
  const [expandedSection, setExpandedSection] = useState<ExpandableSection>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const { playModalOpen, playModalClose } = useUISounds();

  const expandSection = useCallback((section: ExpandableSection) => {
    setExpandedSection(section);
    document.body.style.overflow = 'hidden';
    playModalOpen();
  }, [playModalOpen]);

  const collapseSection = useCallback(() => {
    setExpandedSection(null);
    setSelectedProjectIndex(null);
    document.body.style.overflow = '';
    playModalClose();
  }, [playModalClose]);

  const isExpanded = useCallback((section: ExpandableSection) => {
    return expandedSection === section;
  }, [expandedSection]);

  return (
    <ExpandableContext.Provider value={{
      expandedSection,
      expandSection,
      collapseSection,
      isExpanded,
      selectedProjectIndex,
      setSelectedProjectIndex
    }}>
      {children}
    </ExpandableContext.Provider>
  );
}

export function useExpandable() {
  const context = useContext(ExpandableContext);
  if (context === undefined) {
    throw new Error('useExpandable must be used within an ExpandableProvider');
  }
  return context;
}

// Compatibility hook for projects (to avoid breaking existing code)
export function useProjects() {
  const { expandSection, collapseSection, isExpanded, selectedProjectIndex, setSelectedProjectIndex } = useExpandable();
  return {
    isExpanded: isExpanded('projects'),
    expandProjects: () => expandSection('projects'),
    collapseProjects: collapseSection,
    toggleProjects: () => isExpanded('projects') ? collapseSection() : expandSection('projects'),
    selectedProjectIndex,
    openProjectDetails: (index: number) => {
      setSelectedProjectIndex(index);
      expandSection('projects');
    },
    closeProjectDetails: () => setSelectedProjectIndex(null),
  };
}
