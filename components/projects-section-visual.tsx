'use client';

import { useProjects } from '@/contexts/expandable-context';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Info, Maximize2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { featuredProjects } from './expanded-projects-modal';
import { useUISounds } from './sound-provider';

export function ProjectsSectionVisual() {
  const t = useTranslations('projects');
  const { expandProjects, openProjectDetails } = useProjects();
  const { playClick, playHover } = useUISounds();

  return (
    <motion.div
      className="h-full flex flex-col cursor-pointer group"
      onClick={expandProjects}
      onMouseEnter={() => playHover()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('selectedWork')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('featuredProjectsHint')}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            expandProjects();
          }}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-primary z-20 pointer-events-auto cursor-pointer"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {featuredProjects.slice(0, 4).map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => playHover()}
            className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 p-6 cursor-pointer group/card z-10"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Opening project details:', index);
              playClick();
              openProjectDetails(index);
            }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

            {/* Click hint indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20 backdrop-blur-sm">
                <Info className="w-3 h-3" />
                {t('clickForDetails')}
              </span>
            </div>

            <div className="relative z-10 h-full flex flex-col pointer-events-none">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold text-foreground flex-1 group-hover/card:text-primary transition-colors">
                  {t(`project${index + 1}.title`)}
                </h3>
                <div className="flex gap-2 pointer-events-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-white/10 rounded-lg transition-all"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-white/10 rounded-lg transition-all"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {t(`project${index + 1}.description`)}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-3 py-1 text-xs font-mono text-muted-foreground">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          playClick();
          expandProjects();
        }}
        onMouseEnter={() => playHover()}
        className="mt-6 w-full py-4 rounded-xl border border-dashed border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 font-medium z-20 pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{t('viewAllProjects')}</span>
        <ExternalLink className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
