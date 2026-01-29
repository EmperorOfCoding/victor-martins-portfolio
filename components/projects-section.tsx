'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useProjects } from '@/contexts/projects-context';
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
          <span className="text-primary font-mono text-base">03.</span>
          {t('title')}
          <span className="flex-1 h-px bg-border" />
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            expandProjects();
          }}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        className="flex-1 overflow-x-auto overflow-y-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4 pb-4 min-w-max">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className="w-80 flex-shrink-0 bg-secondary/30 rounded-sm border border-primary/20 p-5 hover:border-primary/40 transition-all cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">{t(`project${index + 1}.title`)}</h3>
                <div className="flex gap-3">
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
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
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
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">
          {t('scrollHint')}
        </p>
        <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Maximize2 className="w-3 h-3" />
          {t('clickToExpand')}
        </p>
      </div>
    </motion.div>
  );
}
