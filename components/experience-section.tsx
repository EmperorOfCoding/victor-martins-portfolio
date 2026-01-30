"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { Maximize2 } from 'lucide-react';
import { useExpandable } from '@/contexts/expandable-context';

const experiences = [
  {
    company: "TechCorp",
    role: "Senior Software Engineer",
    period: "2023 — Presente",
    description: [
      "Lidero desenvolvimento de arquitetura de microserviços servindo 1M+ usuários ativos diários",
      "Mentoro desenvolvedores júnior e conduzo revisões de código",
    ],
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2021 — 2023",
    description: [
      "Construí e lancei recursos importantes para o produto SaaS principal",
      "Desenvolvi recursos de colaboração em tempo real usando WebSocket",
    ],
    technologies: ["TypeScript", "Next.js", "GraphQL", "MongoDB"],
  },
  {
    company: "AgencyPro",
    role: "Frontend Developer",
    period: "2019 — 2021",
    description: [
      "Desenvolvi aplicações web responsivas para portfólio diverso de clientes",
      "Criei bibliotecas de componentes reutilizáveis",
    ],
    technologies: ["JavaScript", "React", "CSS/Sass", "WordPress"],
  },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations('experience');
  const { expandSection } = useExpandable();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <span className="text-primary font-mono text-sm sm:text-base">02.</span>
          {t('title')}
        </h2>
        <button
          onClick={() => expandSection('experience')}
          className="p-1.5 sm:p-2 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
          aria-label={t('expand')}
        >
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-h-0">
        <div className="flex overflow-x-auto border-b border-border -mx-4 sm:mx-0 px-4 sm:px-0">
          {experiences.map((exp, index) => (
            <button
              key={exp.company}
              onClick={() => setActiveTab(index)}
              type="button"
              className={cn(
                "px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono whitespace-nowrap transition-all",
                "border-b-2 -mb-px",
                activeTab === index
                  ? "text-primary border-primary bg-primary/5"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {exp.company}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-base font-medium text-foreground">
              {t(`company${activeTab + 1}.role`)}{" "}
              <span className="text-primary">@ {experiences[activeTab].company}</span>
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-muted-foreground">
              {t(`company${activeTab + 1}.period`)}
            </p>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
                <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0">▹</span>
                <span>{t(`company${activeTab + 1}.desc1`)}</span>
              </li>
              <li className="flex gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
                <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0">▹</span>
                <span>{t(`company${activeTab + 1}.desc2`)}</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
              {experiences[activeTab].technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono bg-primary/10 text-primary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
