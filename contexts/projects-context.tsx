'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ProjectsContextType {
  isExpanded: boolean;
  expandProjects: () => void;
  collapseProjects: () => void;
  toggleProjects: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandProjects = useCallback(() => {
    setIsExpanded(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const collapseProjects = useCallback(() => {
    setIsExpanded(false);
    document.body.style.overflow = '';
  }, []);

  const toggleProjects = useCallback(() => {
    if (isExpanded) {
      collapseProjects();
    } else {
      expandProjects();
    }
  }, [isExpanded, expandProjects, collapseProjects]);

  return (
    <ProjectsContext.Provider value={{ isExpanded, expandProjects, collapseProjects, toggleProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
