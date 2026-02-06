'use client';

import { useProjects } from '@/contexts/expandable-context';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { featuredProjects } from './expanded-projects-modal';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const { expandProjects } = useProjects();

  return (
    <motion.div
      layoutId="projects-card"
      className="h-full flex flex-col cursor-pointer group"
      onClick={expandProjects}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
          {t('title')}
          <span className="flex-1 h-px bg-border" />
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            expandProjects();
          }}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredProjects.slice(0, 2).map((project, index) => (
          <div
            key={project.title}
            className="bg-secondary/30 rounded-lg border border-primary/20 p-4 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">{t(`project${index + 1}.title`)}</h3>
              <div className="flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`View ${project.title} live demo`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {t(`project${index + 1}.description`)}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs font-mono text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
        {featuredProjects.length > 2 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              expandProjects();
            }}
            className="col-span-full w-full p-4 text-primary hover:bg-primary/10 transition-colors rounded-lg border border-dashed border-primary/30 cursor-pointer"
          >
            Ver todos os projetos
          </button>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          {t('scrollHint')}
        </p>
        <p className="text-[10px] sm:text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {t('clickToExpand')}
        </p>
      </div>
    </motion.div>
  );
}
