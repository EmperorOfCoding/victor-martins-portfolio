'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ExpandableSection = 'about' | 'experience' | 'education' | 'projects' | null;

interface ExpandableContextType {
  expandedSection: ExpandableSection;
  expandSection: (section: ExpandableSection) => void;
  collapseSection: () => void;
  isExpanded: (section: ExpandableSection) => boolean;
}

const ExpandableContext = createContext<ExpandableContextType | undefined>(undefined);

export function ExpandableProvider({ children }: { children: ReactNode }) {
  const [expandedSection, setExpandedSection] = useState<ExpandableSection>(null);

  const expandSection = useCallback((section: ExpandableSection) => {
    setExpandedSection(section);
    document.body.style.overflow = 'hidden';
  }, []);

  const collapseSection = useCallback(() => {
    setExpandedSection(null);
    document.body.style.overflow = '';
  }, []);

  const isExpanded = useCallback((section: ExpandableSection) => {
    return expandedSection === section;
  }, [expandedSection]);

  return (
    <ExpandableContext.Provider value={{ expandedSection, expandSection, collapseSection, isExpanded }}>
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
  const { expandSection, collapseSection, isExpanded } = useExpandable();
  return {
    isExpanded: isExpanded('projects'),
    expandProjects: () => expandSection('projects'),
    collapseProjects: collapseSection,
    toggleProjects: () => isExpanded('projects') ? collapseSection() : expandSection('projects'),
  };
}
