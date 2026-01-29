'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Folder } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useProjects } from '@/contexts/projects-context';

export const featuredProjects = [
  {
    title: "Cloud Dashboard",
    description:
      "Dashboard abrangente para monitoramento de infraestrutura em nuvem com métricas em tempo real.",
    technologies: ["React", "TypeScript", "D3.js", "AWS"],
    github: "https://github.com/EmperorOfCoding",
    live: "https://example.com",
    image: "/images/projects/cloud-dashboard.png",
    highlights: ["Real-time metrics", "Custom D3.js visualizations", "AWS Integration"],
  },
  {
    title: "AI Code Assistant",
    description:
      "Ferramenta inteligente de conclusão de código e documentação alimentada por machine learning.",
    technologies: ["Python", "FastAPI", "OpenAI", "React"],
    github: "https://github.com",
    live: "https://example.com",
    image: "/images/projects/ai-assistant.png",
    highlights: ["GPT-4 Integration", "VS Code Extension", "Multi-language support"],
  },
  {
    title: "E-Commerce Platform",
    description:
      "Solução completa de e-commerce com gerenciamento de inventário e processamento de pagamentos.",
    technologies: ["Next.js", "Stripe", "Prisma", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
    image: "/images/projects/ecommerce.png",
    highlights: ["Stripe payments", "Inventory management", "Real-time updates"],
  },
];

export function ExpandedProjectsModal() {
  const { isExpanded, collapseProjects } = useProjects();
  const t = useTranslations('projects');

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        collapseProjects();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, collapseProjects]);

  return (
    <AnimatePresence>
      {isExpanded && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40"
            onClick={collapseProjects}
          />

          {/* Expanded Modal */}
          <motion.div
            layoutId="projects-card"
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl shadow-primary/10"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-background/80 backdrop-blur-md">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3"
              >
                <span className="text-primary font-mono text-lg">03.</span>
                {t('title')}
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={collapseProjects}
                className="p-2 rounded-full hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label={t('close')}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100%-80px)] p-6 md:p-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-center max-w-2xl mx-auto mb-10"
              >
                {t('expandedDescription')}
              </motion.p>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group relative bg-secondary/20 rounded-lg border border-primary/10 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  >
                    {/* Project Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Folder className="w-16 h-16 text-primary/30" />
                      </div>
                      {/* Hover overlay with links */}
                      <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="w-6 h-6" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {t(`project${index + 1}.title`)}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {t(`project${index + 1}.description`)}
                      </p>

                      {/* Highlights */}
                      <ul className="mb-4 space-y-1">
                        {project.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-12"
              >
                <a
                  href="https://github.com/EmperorOfCoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors"
                >
                  <Github className="w-5 h-5" />
                  {t('viewAllOnGithub')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
