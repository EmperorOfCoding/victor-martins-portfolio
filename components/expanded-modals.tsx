'use client';

import { useExpandable } from '@/contexts/expandable-context';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, GraduationCap, User, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

// Skills data
const skills = [
  "React.js",
  "Node.js",
  "JavaScript (ES6+)",
  "AWS",
  "Express.js",
  "MySQL",
];

// Education data
const educationData = [
  {
    institution: "FIAP",
    logo: "🎓",
    highlights: ["Full-stack Development", "Cloud Computing", "Agile Methodologies"],
  },
  {
    institution: "UFBA",
    logo: "🏛️",
    highlights: ["Data Structures", "Algorithms", "Problem Solving"],
  },
];

// Experience data
const experiences = [
  {
    company: "AOOP (NTT Data)",
    technologies: ["React", "Node.js", "AWS", "MySQL"],
  },
];

export function ExpandedModals() {
  const { expandedSection, collapseSection } = useExpandable();
  const tAbout = useTranslations('about');
  const tExp = useTranslations('experience');
  const tEdu = useTranslations('education');

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedSection) {
        collapseSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedSection, collapseSection]);

  const renderAboutModal = () => (
    <motion.div
      layoutId="about-card"
      className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-50 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl shadow-primary/10"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/80 backdrop-blur-md">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3"
        >
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          {tAbout('title')}
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={collapseSection}
          className="p-1.5 sm:p-2 rounded-full hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-60px)] sm:h-[calc(100%-80px)] p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed"
          >
            <p>{tAbout('bio1')}</p>
            <p>{tAbout('bio2')}</p>
            <p>{tAbout('bio3')}</p>
            <p>{tAbout('bio4')}</p>
            <p>{tAbout('bio5')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">{tAbout('skillsTitle')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg border border-primary/10"
                >
                  <span className="text-primary">▹</span>
                  <span className="font-mono text-xs sm:text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const renderExperienceModal = () => (
    <motion.div
      layoutId="experience-card"
      className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-50 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl shadow-primary/10"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/80 backdrop-blur-md">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3"
        >
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          {tExp('title')}
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={collapseSection}
          className="p-1.5 sm:p-2 rounded-full hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-60px)] sm:h-[calc(100%-80px)] p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 sm:p-6 bg-secondary/20 rounded-lg border border-primary/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {tExp(`company${index}.role`)}
                  </h3>
                  <p className="text-primary text-sm sm:text-base">
                    @ {experiences[0]?.company || `Company ${index}`}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                  {tExp(`company${index}.period`)}
                </span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex gap-2 text-muted-foreground text-xs sm:text-sm">
                  <span className="text-primary mt-0.5 flex-shrink-0">▹</span>
                  <span>{tExp(`company${index}.desc1`)}</span>
                </li>
                <li className="flex gap-2 text-muted-foreground text-xs sm:text-sm">
                  <span className="text-primary mt-0.5 flex-shrink-0">▹</span>
                  <span>{tExp(`company${index}.desc2`)}</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {experiences[0]?.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-[10px] sm:text-xs font-mono bg-primary/10 text-primary rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderEducationModal = () => (
    <motion.div
      layoutId="education-card"
      className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-50 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl shadow-primary/10"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/80 backdrop-blur-md">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3"
        >
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          {tEdu('title')}
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={collapseSection}
          className="p-1.5 sm:p-2 rounded-full hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-60px)] sm:h-[calc(100%-80px)] p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 sm:p-6 bg-secondary/20 rounded-lg border border-primary/10"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-2xl">
                  {edu.logo}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {tEdu(`institution${index + 1}.name`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tEdu(`institution${index + 1}.degree`)}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    {tEdu(`institution${index + 1}.period`)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">{tEdu('highlights')}</p>
                <ul className="space-y-1">
                  {edu.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );



  return (
    <AnimatePresence>
      {expandedSection && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40"
            onClick={collapseSection}
          />
          {expandedSection === 'about' && renderAboutModal()}
          {expandedSection === 'experience' && renderExperienceModal()}
          {expandedSection === 'education' && renderEducationModal()}
        </>
      )}
    </AnimatePresence>
  );
}
