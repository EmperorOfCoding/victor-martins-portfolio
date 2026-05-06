'use client';

import { useProjects } from '@/contexts/expandable-context';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronLeft, Code2, ExternalLink, FileText, Folder, Github, Info, Lightbulb, Play, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useUISounds } from './sound-provider';

type DetailTab = 'info' | 'video';

export const featuredProjects = [
  {
    title: "Victor Martins Portfolio",
    description:
      "Portfólio pessoal desenvolvido com Next.js 15, React 19, TypeScript e Tailwind CSS v4. Design moderno com i18n e animações.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "next-intl"],
    github: "https://github.com/EmperorOfCoding/victor-martins-portfolio",
    live: "https://victormartins.dev/",
    image: "/images/projects/victor-martins-portfolio.png",
    video: "",
    highlights: ["Design Híbrido", "Internacionalização (i18n)", "Animações Suaves"],
    detailedDescription: "Portfólio pessoal desenvolvido para demonstrar habilidades como Engenheiro de Software Full Stack, com foco em experiência do usuário (UX), design moderno e performance. O projeto combina Bento Grid para projetos e Timeline vertical para jornada/educação, com suporte completo para 3 idiomas.",
    features: [
      "Design Híbrido & Moderno - Layout Bento Grid + Timeline vertical",
      "Internacionalização (i18n) - Suporte para PT, EN e ES",
      "Modais Expandidos - Visualização detalhada de projetos com vídeos e abas",
      "Feedback Sonoro (UI Sounds) - Efeitos sonoros em interações",
      "Animações Suaves - Transições fluidas com framer-motion",
      "Download Inteligente de Currículo - Automático por idioma",
      "Totalmente Responsivo - Mobile, Tablet e Desktop",
      "Dark Mode Nativo - Glassmorphism e cores vibrantes"
    ],
    challenges: "O principal desafio foi criar uma experiência de usuário única e memorável, equilibrando design moderno com performance. A implementação de i18n com next-intl exigiu estruturação cuidadosa das traduções e roteamento dinâmico.",
    year: "2025",
    role: "Desenvolvedor Full Stack"
  },
  {
    title: "Quintas de Sauípe D10",
    description:
      "Plataforma de aluguel para uma casa de luxo em Quintas de Sauípe, desenvolvida com Next.js, Tailwind CSS e Framer Motion.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/EmperorOfCoding/quintasdesauiped10",
    live: "https://www.quintasdesauiped10.com.br/",
    image: "/images/projects/quintas-sauipe.png",
    video: "",
    highlights: ["Experiência Imersiva", "Design Responsivo", "Otimização de Performance"],
    detailedDescription: "Landing page premium desenvolvida para promover o aluguel de uma casa de alto padrão no condomínio Quintas de Sauípe. O projeto foca em uma experiência visual rica, utilizando animações suaves e design moderno para atrair clientes em potencial.",
    features: [
      "Galeria de Fotos 4K - Visualização detalhada de todas as áreas da casa",
      "Design Responsivo - Navegação perfeita em qualquer dispositivo",
      "Integração de Contato - Botões diretos para reserva via WhatsApp e Airbnb",
      "Animações Fluídas - Uso de Framer Motion para uma navegação envolvente",
      "Performance Otimizada - Carregamento inteligente de assets e imagens",
      "SEO & Analytics - Implementação completa para visibilidade e métricas"
    ],
    challenges: "O desafio foi criar uma interface que transmitisse o luxo e a tranquilidade da casa, mantendo a performance e SEO otimizados para motores de busca.",
    year: "2024",
    role: "Desenvolvedor Full Stack"
  },
];

// Helper to detect YouTube URLs and extract video ID
function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export function ExpandedProjectsModal() {
  const { isExpanded, collapseProjects, selectedProjectIndex, closeProjectDetails } = useProjects();
  const [selectedProject, setSelectedProject] = useState<typeof featuredProjects[0] | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>('info');
  const t = useTranslations('projects');
  const { playClick, playHover } = useUISounds();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate the current project index for translations
  const currentProjectIndex = selectedProject 
    ? featuredProjects.findIndex(p => p.title === selectedProject.title)
    : selectedProjectIndex ?? 0;

  // Handle pre-selected project from context
  useEffect(() => {
    if (isExpanded && selectedProjectIndex !== null && selectedProjectIndex >= 0) {
      setSelectedProject(featuredProjects[selectedProjectIndex]);
      setActiveTab('info'); // Reset to info tab when opening a new project
    }
  }, [isExpanded, selectedProjectIndex]);

  // Reset tab when closing project details
  useEffect(() => {
    if (!selectedProject) {
      setActiveTab('info');
    }
  }, [selectedProject]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
          closeProjectDetails();
        } else if (isExpanded) {
          collapseProjects();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, collapseProjects, selectedProject, closeProjectDetails]);

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
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-50 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl shadow-primary/10"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/80 backdrop-blur-md">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3"
              >
                {t('title')}
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={collapseProjects}
                className="p-1.5 sm:p-2 rounded-full hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label={t('close')}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100%-60px)] sm:h-[calc(100%-80px)] p-4 sm:p-6 md:p-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-center text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-10"
              >
                {t('expandedDescription')}
              </motion.p>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => {
                      console.log('Card clicked:', project.title);
                      playClick();
                      setSelectedProject(project);
                    }}
                    onMouseEnter={() => playHover()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative bg-secondary/20 rounded-lg border border-primary/10 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer z-10"
                    style={{ position: 'relative' }}
                  >
                    {/* Project Image */}
                    <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-primary/20 to-accent/10 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Folder className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary/30" />
                        </div>
                      )}
                      
                      {/* Click hint indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                        <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20 backdrop-blur-sm">
                          <Info className="w-3 h-3" />
                          {t('clickForDetails')}
                        </span>
                      </div>

                      {/* Hover overlay with links - stops propagation */}
                      <div 
                        className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 sm:gap-6 pointer-events-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            playClick();
                            window.open(project.github, '_blank');
                          }}
                          className="p-2 sm:p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors pointer-events-auto z-20"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            playClick();
                            window.open(project.live, '_blank');
                          }}
                          className="p-2 sm:p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors pointer-events-auto z-20"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4 sm:p-5 md:p-6 pointer-events-none">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {t(`project${index + 1}.title`)}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {t(`project${index + 1}.description`)}
                      </p>

                      {/* Highlights */}
                      <ul className="mb-3 sm:mb-4 space-y-0.5 sm:space-y-1">
                        {project.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                            <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-border">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono bg-primary/10 text-primary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-muted-foreground">
                            +{project.technologies.length - 4}
                          </span>
                        )}
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
                className="text-center mt-8 sm:mt-12"
              >
                <a
                  href="https://github.com/EmperorOfCoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm sm:text-base font-medium transition-colors"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t('viewAllOnGithub')}
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Project Detail View */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-[60] bg-background/98 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl"
              >
                {/* Detail Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/80 backdrop-blur-md">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => {
                      setSelectedProject(null);
                      closeProjectDetails();
                    }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">{t('back')}</span>
                  </motion.button>
                  <div className="flex gap-3">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground text-sm transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('viewOnline')}</span>
                    </a>
                  </div>
                </div>

                {/* Detail Content */}
                <div className="overflow-y-auto h-[calc(100%-70px)] sm:h-[calc(100%-80px)]">
                  {/* Project Hero */}
                  <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center overflow-hidden">
                    {selectedProject.image ? (
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                      />
                    ) : (
                      <Folder className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-primary/40" />
                    )}
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
                    {/* Title & Role */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {t(`project${currentProjectIndex + 1}.year`)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{t(`project${currentProjectIndex + 1}.role`)}</span>
                      </div>
                    </motion.div>

                    {/* Tabs Navigation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex gap-2 mb-6 border-b border-border"
                    >
                      <button
                        onClick={() => {
                          playClick();
                          setActiveTab('info');
                        }}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px cursor-pointer ${
                          activeTab === 'info'
                            ? 'text-primary border-primary'
                            : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/30'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        {t('tabInfo')}
                      </button>
                      {selectedProject.video && (
                        <button
                          onClick={() => {
                            playClick();
                            setActiveTab('video');
                          }}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px cursor-pointer ${
                            activeTab === 'video'
                              ? 'text-primary border-primary'
                              : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/30'
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          {t('tabVideo')}
                        </button>
                      )}
                    </motion.div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {activeTab === 'info' ? (
                        <motion.div
                          key="info-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Detailed Description */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Code2 className="w-5 h-5 text-primary" />
                              {t('aboutProject')}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {t(`project${currentProjectIndex + 1}.detailedDescription`)}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                              {t('features')}
                            </h3>
                            <ul className="space-y-2">
                              {(t.raw(`project${currentProjectIndex + 1}.features`) as string[]).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                  <span className="text-primary mt-1">▹</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Challenges */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-primary" />
                              {t('challenges')}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {t(`project${currentProjectIndex + 1}.challenges`)}
                            </p>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">{t('technologies')}</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 text-sm font-mono bg-primary/10 text-primary rounded-lg border border-primary/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="video-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="min-h-[300px]"
                        >
                          {selectedProject.video && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Play className="w-5 h-5 text-primary" />
                                {t('videoPresentation')}
                              </h3>

                              {/* Video Player */}
                              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/20 border border-primary/10">
                                {isYouTubeUrl(selectedProject.video) ? (
                                  // YouTube Embed
                                  <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedProject.video)}?rel=0`}
                                    title={`${selectedProject.title} - Video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                  />
                                ) : (
                                  // Local Video Player
                                  <video
                                    src={selectedProject.video}
                                    controls
                                    className="absolute inset-0 w-full h-full object-contain"
                                    poster={selectedProject.image}
                                  >
                                    <track kind="captions" />
                                    {t('videoNotSupported')}
                                  </video>
                                )}
                              </div>

                              <p className="text-sm text-muted-foreground text-center">
                                {t('videoDescription')}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
