"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { useState } from "react";

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

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="text-primary font-mono text-base">02.</span>
        {t('title')}
        <span className="flex-1 h-px bg-border" />
      </h2>
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex overflow-x-auto border-b border-border">
          {experiences.map((exp, index) => (
            <button
              key={exp.company}
              onClick={() => setActiveTab(index)}
              type="button"
              className={cn(
                "px-4 py-2 text-xs font-mono whitespace-nowrap transition-all",
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
          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">
              {t(`company${activeTab + 1}.role`)}{" "}
              <span className="text-primary">@ {experiences[activeTab].company}</span>
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              {t(`company${activeTab + 1}.period`)}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-muted-foreground text-sm">
                <span className="text-primary mt-1">▹</span>
                <span>{t(`company${activeTab + 1}.desc1`)}</span>
              </li>
              <li className="flex gap-2 text-muted-foreground text-sm">
                <span className="text-primary mt-1">▹</span>
                <span>{t(`company${activeTab + 1}.desc2`)}</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              {experiences[activeTab].technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full"
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
